import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="hero-grid flex min-h-screen flex-col px-6 py-6 sm:px-10">
      <header className="flex items-center justify-between">
        <Link
          href="/"
          aria-label="Hein Htet homepage"
          className="display-font text-2xl font-bold text-foreground">
          HH<span className="text-primary">.</span>
        </Link>
        <p className="section-kicker">Page not found</p>
      </header>

      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center py-16">
        <p className="section-kicker">404 / Lost route</p>
        <div className="mt-5 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p
              aria-hidden="true"
              className="display-font text-9xl font-bold leading-[0.8] text-primary sm:text-[12rem]">
              404
            </p>
            <h1 className="display-font mt-8 text-5xl font-bold sm:text-7xl">
              Wrong turn.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
              The page you&apos;re looking for isn&apos;t here. Let&apos;s get
              you back to the good stuff.
            </p>
          </div>

          <nav aria-label="404 navigation" className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-12 items-center gap-3 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-85">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Back home
            </Link>
            <Link
              href="/#projects"
              className="inline-flex h-12 items-center gap-3 rounded-full border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/70 hover:bg-accent">
              Explore projects
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </nav>
        </div>

        <footer className="mt-16 flex flex-wrap justify-between gap-3 border-t border-border pt-5 text-xs font-medium uppercase text-muted-foreground">
          <p>Hein Htet / Portfolio</p>
          <p>Looks like this route doesn&apos;t exist.</p>
        </footer>
      </section>
    </main>
  );
}
