import Link from "next/link";
import { Github, Linkedin, Instagram, Youtube } from "lucide-react";

const socials = [
  { name: "GitHub", href: "https://github.com/akshay-kakade", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/akshay-kakade-860224356", icon: Linkedin },
  { name: "Instagram", href: "https://www.instagram.com/maverick_7821", icon: Instagram },
  { name: "YouTube", href: "https://www.youtube.com/@itsgametimebudy", icon: Youtube },
];

export default function Footer() {
  return (
    <footer role="contentinfo" className="mt-20 border-t border-border-dark/60 bg-[#0b0f10]/60 backdrop-blur-xl">
      <div className="mx-auto container sm:px-10 px-5 py-8 flex flex-col items-center gap-5">
        <nav aria-label="Legal" className="flex items-center gap-6 text-sm text-light-200">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <span className="text-light-200/40">•</span>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Use</Link>
        </nav>

        <ul className="flex items-center gap-5 list-none">
          {socials.map(({ name, href, icon: Icon }) => (
            <li key={name}>
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="text-light-200 hover:text-primary transition-colors inline-flex items-center justify-center h-9 w-9 rounded-md border border-border-dark/60 bg-dark-100 hover:bg-dark-200"
              >
                <Icon className="h-5 w-5" />
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-sm text-light-200 text-center">
          © 2025 AreDev. Created by
          {" "}
          <span className="text-gradient bg-linear-to-r from-white via-[#59deca] to-white font-semibold">
            Akshay Kakade &amp; Maverick Jones
          </span>
        </p>
      </div>
    </footer>
  );
}
