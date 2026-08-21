"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import Link from "next/link";
import { ThemeToggle } from "../ui/ThemeToggle";

export default function Hero() {
  // Staggered animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="home"
      className="hero-grid relative flex min-h-screen items-center overflow-hidden bg-background px-4 pb-20 pt-6 text-foreground sm:px-6 lg:px-8 lg:pb-24">
      <div className="pointer-events-none absolute -right-48 top-36 h-128 w-lg rounded-full border border-primary/30 bg-primary/10 blur-3xl" />
      <header className="absolute inset-x-4 top-6 z-10 mx-auto flex max-w-7xl items-center justify-between sm:inset-x-6 lg:inset-x-8">
        <Link
          href="#home"
          className="display-font text-xl font-bold tracking-tight">
          HH<span className="text-primary">.</span>
        </Link>
        <nav
          className="hidden items-center gap-7 text-sm text-muted-foreground sm:flex"
          aria-label="Main navigation">
          <Link
            href="#projects"
            className="transition-colors hover:text-foreground">
            Work
          </Link>
          <Link
            href="#skills"
            className="transition-colors hover:text-foreground">
            Stack
          </Link>
          <Link
            href="#contact"
            className="transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>
        <ThemeToggle />
      </header>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="max-w-2xl pt-16 lg:pt-8">
          <motion.div
            variants={itemVariants}
            className="mb-7 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_0_5px_var(--accent)]" />
            <p className="section-kicker text-foreground">
              Full-stack developer / Sagaing
            </p>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="display-font max-w-2xl text-5xl font-bold leading-[0.93] sm:text-7xl lg:text-[5.8rem]">
            Digital products with <span className="text-primary">purpose.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            Hello, I&apos;m Hein Htet. I build polished, scalable web
            applications with Next.js, React, Node.js, and MongoDB.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Link
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-[0_12px_30px_-12px_var(--ring)] transition-all hover:-translate-y-0.5 hover:brightness-95">
              View my work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/Hsquarehello"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border p-3 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="GitHub Profile">
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/ReadOnlyUser"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border p-3 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="LinkedIn Profile">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:real203play@gmail.com"
                className="rounded-full border border-border p-3 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Send Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-center gap-8 border-t border-border pt-6 text-sm text-muted-foreground">
            <span>
              <strong className="text-foreground">14+</strong> technologies
            </span>
            <span>
              <strong className="text-foreground">MERN</strong> focused
            </span>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="relative mx-auto w-full max-w-md lg:mr-0">
          <div className="absolute -inset-3 rounded-4xl border border-primary/40" />
          <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-muted shadow-2xl shadow-primary/10">
            <Image
              src="/images/hero-photo.jpg"
              alt="Hein Htet, full-stack developer"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-xl border border-border bg-card px-4 py-3 shadow-xl">
            <p className="section-kicker">Available for</p>
            <p className="mt-1 text-sm font-semibold">New opportunities</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <Link href="#projects" aria-label="Scroll to Projects">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </Link>
      </motion.div>
    </section>
  );
}
