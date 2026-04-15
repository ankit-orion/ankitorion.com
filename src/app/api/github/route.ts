import { NextResponse } from "next/server";

type RawEvent = {
  type: string;
  repo: { name: string };
  payload: {
    commits?: { message: string }[];
    size?: number; // actual commit count — payload.commits is capped at 20
    action?: string;
    pull_request?: {
      title: string;
      merged: boolean;
      additions?: number;
      deletions?: number;
      comments?: number;
      review_comments?: number;
    };
    ref_type?: string;
  };
  created_at: string;
};

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
};

export async function GET() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    "https://api.github.com/users/ankit-orion/events/public?per_page=100",
    { headers, next: { revalidate: 300 } }
  );

  if (!res.ok) {
    return NextResponse.json({ events: [] });
  }

  const data: RawEvent[] = await res.json();

  // Accumulate commits per repo across all push events (don't deduplicate — sum them)
  const pushMap = new Map<string, { count: number; timestamp: string }>();
  const prEvents: ActivityItem[] = [];
  const createEvents: ActivityItem[] = [];

  for (const event of data) {
    const repoFull = event.repo.name;
    const repoShort = repoFull.split("/")[1];

    if (event.type === "PushEvent") {
      // payload.size is the real commit count; commits array is capped at 20
      const count = event.payload.size ?? event.payload.commits?.length ?? 0;
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
      const merged = pr?.merged ?? false;
      const label =
        action === "closed" && merged
          ? "merged PR"
          : action === "opened"
          ? "opened PR"
          : "closed PR";

      prEvents.push({
        type: "pr",
        repo: repoFull,
        repoShort,
        description: `${label}: ${pr?.title ?? ""}`,
        prTitle: pr?.title,
        prAdditions: pr?.additions,
        prDeletions: pr?.deletions,
        prComments: (pr?.comments ?? 0) + (pr?.review_comments ?? 0),
        timestamp: event.created_at,
      });
    } else if (event.type === "CreateEvent") {
      if (event.payload.ref_type !== "repository") continue;

      createEvents.push({
        type: "create",
        repo: repoFull,
        repoShort,
        description: "created repository",
        timestamp: event.created_at,
      });
    }
  }

  // Optionally fetch language for created repos (only if we have CreateEvents)
  if (createEvents.length > 0 && process.env.GITHUB_TOKEN) {
    await Promise.all(
      createEvents.map(async (item) => {
        const r = await fetch(`https://api.github.com/repos/${item.repo}`, {
          headers,
          next: { revalidate: 3600 },
        });
        if (r.ok) {
          const repo = await r.json();
          item.language = repo.language ?? undefined;
        }
      })
    );
  }

  // Convert push map to ActivityItem array, sorted by most commits
  const pushEvents: ActivityItem[] = Array.from(pushMap.entries())
    .map(([repoFull, { count, timestamp }]) => ({
      type: "push" as const,
      repo: repoFull,
      repoShort: repoFull.split("/")[1],
      description: `${count} commits`,
      commitCount: count,
      timestamp,
    }))
    .sort((a, b) => (b.commitCount ?? 0) - (a.commitCount ?? 0));

  const events: ActivityItem[] = [
    ...pushEvents,
    ...createEvents,
    ...prEvents.slice(0, 1),
  ];

  return NextResponse.json({ events });
}
