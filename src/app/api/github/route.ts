import { NextResponse } from "next/server";

export type ActivityItem = {
  type: "push" | "pr" | "create";
  repo: string;      // full: "ankit-orion/socialsync"
  repoShort: string; // just: "socialsync"
  description: string;
  commitCount?: number;
  timestamp: string;
  prTitle?: string;
  prAdditions?: number;
  prDeletions?: number;
  prComments?: number;
  language?: string;
  languageColor?: string;
};

// GraphQL query — uses the same contributionsCollection GitHub's own UI uses
const GRAPHQL_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        commitContributionsByRepository(maxRepositories: 10) {
          repository {
            name
            nameWithOwner
            primaryLanguage { name color }
          }
          contributions {
            totalCount
          }
        }
        pullRequestContributions(last: 1) {
          nodes {
            pullRequest {
              title
              createdAt
              additions
              deletions
              totalCommentsCount
              repository { nameWithOwner name }
            }
          }
        }
        repositoryContributions(last: 5) {
          nodes {
            occurredAt
            repository {
              name
              nameWithOwner
              createdAt
              primaryLanguage { name color }
            }
          }
        }
      }
    }
  }
`;

async function fetchGraphQL(token: string) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GRAPHQL_QUERY,
      variables: { login: "ankit-orion" },
    }),
    next: { revalidate: 300 },
  });

  if (!res.ok) return null;
  const json = await res.json();
  if (json.errors) return null;
  return json.data?.user?.contributionsCollection ?? null;
}

// Fallback: REST events API (less accurate — payload.size is often 0 for older events)
async function fetchRESTEvents(headers: Record<string, string>) {
  const res = await fetch(
    "https://api.github.com/users/ankit-orion/events/public?per_page=100",
    { headers, next: { revalidate: 300 } }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const events: ActivityItem[] = [];

  if (token) {
    // ── GraphQL path: accurate data ──────────────────────────────────────────
    const contributions = await fetchGraphQL(token);

    if (contributions) {
      // Commits per repo
      for (const item of contributions.commitContributionsByRepository ?? []) {
        const repoFull: string = item.repository.nameWithOwner;
        const repoShort: string = item.repository.name;
        const count: number = item.contributions.totalCount;
        events.push({
          type: "push",
          repo: repoFull,
          repoShort,
          description: `${count} commits`,
          commitCount: count,
          timestamp: new Date().toISOString(), // contributions are for current period
          language: item.repository.primaryLanguage?.name,
          languageColor: item.repository.primaryLanguage?.color,
        });
      }

      // Created repos
      for (const node of contributions.repositoryContributions?.nodes ?? []) {
        events.push({
          type: "create",
          repo: node.repository.nameWithOwner,
          repoShort: node.repository.name,
          description: "created repository",
          timestamp: node.occurredAt ?? node.repository.createdAt,
          language: node.repository.primaryLanguage?.name,
          languageColor: node.repository.primaryLanguage?.color,
        });
      }

      // Most recent PR
      for (const node of contributions.pullRequestContributions?.nodes ?? []) {
        const pr = node.pullRequest;
        events.push({
          type: "pr",
          repo: pr.repository.nameWithOwner,
          repoShort: pr.repository.name,
          description: `opened PR: ${pr.title}`,
          prTitle: pr.title,
          prAdditions: pr.additions,
          prDeletions: pr.deletions,
          prComments: pr.totalCommentsCount,
          timestamp: pr.createdAt,
        });
      }

      return NextResponse.json({ events, source: "graphql" });
    }
  }

  // ── REST fallback (no token or GraphQL failed) ───────────────────────────
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const rawEvents = await fetchRESTEvents(headers);

  const pushMap = new Map<string, { count: number; timestamp: string }>();
  const prItems: ActivityItem[] = [];
  const createItems: ActivityItem[] = [];

  for (const event of rawEvents) {
    const repoFull: string = event.repo.name;
    const repoShort = repoFull.split("/")[1];

    if (event.type === "PushEvent") {
      // Use distinct_size (unique commits) — more reliable than size
      const count: number =
        event.payload.distinct_size ??
        event.payload.size ??
        event.payload.commits?.length ??
        0;
      const existing = pushMap.get(repoFull);
      if (existing) {
        existing.count += count;
      } else {
        pushMap.set(repoFull, { count, timestamp: event.created_at });
      }
    } else if (event.type === "PullRequestEvent") {
      const action = event.payload.action;
      if (action !== "opened" && action !== "closed") continue;
      const pr = event.payload.pull_request;
      prItems.push({
        type: "pr",
        repo: repoFull,
        repoShort,
        description: `${action === "closed" && pr?.merged ? "merged" : action} PR: ${pr?.title ?? ""}`,
        prTitle: pr?.title,
        prAdditions: pr?.additions,
        prDeletions: pr?.deletions,
        prComments: (pr?.comments ?? 0) + (pr?.review_comments ?? 0),
        timestamp: event.created_at,
      });
    } else if (event.type === "CreateEvent") {
      if (event.payload.ref_type !== "repository") continue;
      createItems.push({
        type: "create",
        repo: repoFull,
        repoShort,
        description: "created repository",
        timestamp: event.created_at,
      });
    }
  }

  const pushItems: ActivityItem[] = Array.from(pushMap.entries())
    .map(([repoFull, { count, timestamp }]) => ({
      type: "push" as const,
      repo: repoFull,
      repoShort: repoFull.split("/")[1],
      description: `${count} commits`,
      commitCount: count,
      timestamp,
    }))
    .sort((a, b) => (b.commitCount ?? 0) - (a.commitCount ?? 0));

  return NextResponse.json({
    events: [...pushItems, ...createItems, ...prItems.slice(0, 1)],
    source: "rest",
  });
}
