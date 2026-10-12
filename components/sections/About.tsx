"use client";

import { Fragment, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { Bookmark, BookOpen, Briefcase, Code2, TrendingUp } from "lucide-react";

const traits: { title: string; icon: React.ReactNode; description: string }[] = [
  {
    title: "Build",
    icon: <Code2 className="h-5 w-5 text-primary" />,
    description: "Learn through real projects.",
  },
  {
    title: "Learn",
    icon: <BookOpen className="h-5 w-5 text-primary" />,
    description: "Explore and improve.",
  },
  {
    title: "Grow",
    icon: <TrendingUp className="h-5 w-5 text-primary" />,
    description: "Become a better engineer.",
  },
];

const focusAreas = ["Frontend", "Backend", "Continuous learning"];

const headingWords: { text: string; accent: boolean }[] = [
  { text: "Curious", accent: false },
  { text: "by", accent: false },
  { text: "nature.", accent: false },
  { text: "Built", accent: true },
  { text: "by", accent: true },
  { text: "practice.", accent: true },
];

/* ---------------- Animation variants ---------------- */

/** Bare container that only forwards "hidden"/"visible" to its children. */
const groupVariants: Variants = { hidden: {}, visible: {} };

/** Generic fade-and-rise entrance with a custom delay. */
const fadeUp = (delay: number, y = 24): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
});

const metaRowVariants: Variants = {
  hidden: { opacity: 0, y: -14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Masked word-by-word reveal for the headline (cascading delay per word). */
const wordVariants: Variants = {
  hidden: { y: "120%" },
  visible: (i: number) => ({
    y: 0,
    transition: {
      delay: 0.3 + i * 0.07,
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/** Paragraphs rise and un-blur into place. */
const paragraphIn = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
});

/** Chips pop in with a spring, then lift on hover. */
const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.75, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 1.15 + i * 0.09,
      type: "spring",
      stiffness: 320,
      damping: 18,
    },
  }),
  hover: {
    y: -4,
    scale: 1.05,
    transition: { type: "spring", stiffness: 420, damping: 16 },
  },
  tap: { scale: 0.94 },
};

/** Decorative frame behind the photo fades in a little later. */
const frameReveal: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Curtain reveal: the photo drops in from the top edge. */
const curtainReveal: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0% round 1.5rem)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
    transition: { delay: 0.15, duration: 0.95, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Image settles from a slight zoom while scroll parallax glides it. */
const imageTrackVariants: Variants = {
  hidden: { scale: 1.24 },
  visible: {
    scale: 1.1,
    transition: { delay: 0.15, duration: 1.3, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Small bookmark badge springs onto the photo. */
const badgeReveal: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.95,
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

/** Trait cards rise with a slight tilt, then lift on hover. */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 44, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.15 + i * 0.13,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  hover: {
    y: -10,
    transition: { type: "spring", stiffness: 350, damping: 22 },
  },
};

/** Hiring banner slides in from the left with a springy settle. */
const bannerVariants: Variants = {
  hidden: { opacity: 0, x: -56 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.62, duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  return (
    <section
      id="about"
      className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        variants={groupVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        {/* Meta Row */}
        <motion.div
          variants={metaRowVariants}
          className="flex flex-col justify-between gap-2 border-b border-border pb-6 sm:flex-row sm:items-center">
          <p className="section-kicker">About / 01</p>
          <p className="section-kicker">Hein Htet / Developer</p>
        </motion.div>

        {/* Intro + Photo — photo sits on the left on large screens */}
        <div className="grid gap-10 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <motion.div variants={fadeUp(0.2)} className="max-w-2xl lg:order-2">
            <h2
              aria-label="Curious by nature. Built by practice."
              className="display-font text-4xl font-bold sm:text-5xl">
              {headingWords.map((word, i) => (
                <Fragment key={`${word.text}-${i}`}>
                  <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                    <motion.span
                      custom={i}
                      variants={wordVariants}
                      className={`inline-block ${
                        word.accent ? "text-primary" : ""
                      }`}>
                      {word.text}
                    </motion.span>
                  </span>
                  {i < headingWords.length - 1 && " "}
                </Fragment>
              ))}
            </h2>

            <motion.p
              variants={paragraphIn(0.55)}
              className="mt-6 leading-7 text-muted-foreground">
              I&apos;m Hein Htet, an aspiring full-stack developer who enjoys
              turning ideas into functional, thoughtful web experiences.
            </motion.p>
            <motion.p
              variants={paragraphIn(0.7)}
              className="mt-4 leading-7 text-muted-foreground">
              From crafting interfaces to developing APIs, I&apos;m continuously
              learning, building projects, and improving my skills.
            </motion.p>

            <div className="mt-7 flex flex-wrap gap-3">
              {focusAreas.map((area, i) => (
                <motion.span
                  key={area}
                  custom={i}
                  variants={chipVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="cursor-default rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium transition-colors hover:border-primary/70 hover:text-primary">
                  {area}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Photo — left column on large screens */}
          <div ref={photoRef} className="relative lg:order-1">
            <motion.div
              variants={frameReveal}
              className="pointer-events-none absolute -inset-3 rounded-4xl border border-primary/40"
            />
            <motion.div
              variants={curtainReveal}
              className="relative aspect-4/3 overflow-hidden rounded-3xl border border-border bg-muted shadow-2xl shadow-primary/10">
              <motion.div
                variants={imageTrackVariants}
                style={{ y: parallaxY }}
                className="absolute inset-0">
                <Image
                  src="/images/about-me.jpg"
                  alt="Hein Htet working at his desk"
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover object-center"
                />
              </motion.div>
              <motion.div
                variants={badgeReveal}
                className="absolute right-4 top-4 rounded-xl border border-border bg-card/90 p-3 text-primary shadow-lg backdrop-blur-sm">
                <Bookmark className="h-4 w-4" aria-hidden="true" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* What Defines Me */}
        <div className="mt-16">
          <motion.p variants={fadeUp(0.15, -12)} className="section-kicker">
            What defines me
          </motion.p>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {traits.map(({ title, icon, description }, i) => (
              <motion.div
                key={title}
                custom={i}
                variants={cardVariants}
                whileHover="hover"
                className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/70">
                <div className="text-primary transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  {icon}
                </div>
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hiring Banner */}
        <motion.div
          variants={bannerVariants}
          className="mt-8 flex items-start gap-4 rounded-2xl border border-primary/30 bg-accent p-6">
          <div className="rounded-full bg-card p-3 text-primary">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">
              Looking for my first developer role
            </h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Ready to contribute, learn from a team, and grow through
              meaningful work.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
