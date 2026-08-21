import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Link
            href="#home"
            className="text-lg font-bold hover:text-primary transition-colors">
            Your Name
          </Link>
          <p className="text-sm text-muted-foreground">
            Building thoughtful digital experiences.
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Hsquarehello"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border p-2.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            aria-label="GitHub Profile">
            <FaGithub className="h-5 w-5" />
          </a>
          <a
            href="https://www.facebook.com/ReadOnlyUser"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border p-2.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            aria-label="LinkedIn Profile">
            <FaLinkedin className="h-5 w-5" />
          </a>
          <a
            href="mailto:real203play@gmail.com"
            className="rounded-lg border border-border p-2.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            aria-label="Send Email">
            <Mail className="h-5 w-5" />
          </a>
          <Link
            href="#home"
            className="ml-2 rounded-lg bg-primary p-2.5 text-primary-foreground hover:bg-primary/90 transition-colors"
            aria-label="Back to top"
            title="Back to top">
            <ArrowUp className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-border pt-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Your Name. All rights reserved.
      </div>
    </footer>
  );
}
