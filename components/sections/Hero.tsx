"use client";

import { motion, type Variants } from "framer-motion";
import { Mail, ArrowDown } from "lucide-react";
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
    <section className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl text-center space-y-6">
        {/* Sub-headline / Greeting */}
        <motion.p
          variants={itemVariants}
          className="text-primary text-sm sm:text-base font-semibold tracking-wide uppercase">
          Hello, I&apos;m
        </motion.p>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          <span className="block">Hein Htet</span>
          <span className="block text-primary mt-2">MERN Stack Developer</span>
        </motion.h1>

        {/* Short Bio */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
          I build scalable web applications with Next.js, React, Node.js, and
          MongoDB. Passionate about clean code, high performance, and great user
          experiences.
        </motion.p>

        {/* Action Buttons & Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="#projects"
            className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg shadow-md hover:bg-primary/90 transition-all text-center">
            View My Work
          </Link>

          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <ThemeToggle />
            <a
              href="https://github.com/Hsquarehello"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border rounded-lg hover:bg-accent transition-colors"
              aria-label="GitHub Profile">
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/ReadOnlyUser"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border rounded-lg hover:bg-accent transition-colors"
              aria-label="LinkedIn Profile">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="p-3 border rounded-lg hover:bg-accent transition-colors"
              aria-label="Send Email">
              <Mail className="w-5 h-5" />
            </a>
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
        className="absolute bottom-8">
        <Link href="#projects" aria-label="Scroll to Projects">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </Link>
      </motion.div>
    </section>
  );
}
