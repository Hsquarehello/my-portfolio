"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { House } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const links = [
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/skills", label: "Skills" },
];

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/admin/projects" className="font-bold text-foreground">
          Portfolio Admin
        </Link>
        <nav aria-label="Admin navigation" className="flex items-center gap-2">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}>
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/"
            aria-label="Go to home page"
            title="Go to home page"
            className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-accent hover:text-foreground">
            <House className="h-5 w-5" />
          </Link>
          <ThemeToggle />
          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-accent">
            Sign out
          </button>
        </nav>
      </div>
    </header>
  );
}
