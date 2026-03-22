import Link from "next/link";
import { Linkedin, Github } from "lucide-react";

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
  </svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    { href: "https://x.com/OrionAnkit", icon: XIcon },
    { href: "https://www.linkedin.com/in/ankit-orion/", icon: Linkedin },
    { href: "https://github.com/ankit-orion", icon: Github },
  ];

  return (
    <footer className="w-full border-t border-black/8 dark:border-white/10 bg-white dark:bg-[#050505] py-8">
      <div className="max-w-4xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
          © {currentYear} Ankit Mishra
        </span>
        <div className="flex items-center gap-1">
          {socials.map(({ href, icon: Icon }, i) => (
            <Link
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              <Icon className="w-4 h-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
