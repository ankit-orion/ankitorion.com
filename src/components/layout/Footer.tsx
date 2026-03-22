import Link from "next/link";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-black/8 dark:border-white/10 bg-white dark:bg-[#050505] py-8">
      <div className="max-w-4xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Left: Brand */}
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
          © {currentYear} Ankit Mishra
        </span>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-1">
          {[
            { href: "#", icon: Twitter },
            { href: "#", icon: Instagram },
            { href: "#", icon: Linkedin },
            { href: "#", icon: Github },
          ].map(({ href, icon: Icon }) => (
            <Link
              key={href + Icon.name}
              href={href}
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              <Icon className="w-4 h-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
