"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FolderGit2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { Category, Project } from "@/types/project";

const categories: Category[] = ["All", "Full-stack", "Frontend", "Backend"];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    fetch("/api/projects")
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load projects");
        return response.json();
      })
      .then((data) => {
        if (active && Array.isArray(data)) {
          setProjects(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  // Filter projects based on selected category
  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All") return true;
    return project.category === activeCategory;
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.06,
        duration: 0.42,
        ease: "easeOut" as const,
      },
    }),
    exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.18, ease: "easeIn" as const },
    },
  };

  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Section Heading */}
      <div className="mb-12 flex flex-col justify-between gap-5 border-b border-border pb-8 sm:flex-row sm:items-end">
        <div className="space-y-3">
          <p className="section-kicker">Selected work / 01</p>
          <h2 className="display-font text-4xl font-bold sm:text-5xl">
            Things I&apos;ve built
          </h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-right">
          Explore my recent work across full-stack applications, interactive
          user interfaces, and robust backend services.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="mb-12 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === category
                ? "text-primary-foreground"
                : "border border-border bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}>
            {activeCategory === category && (
              <motion.span
                layoutId="active-project-filter"
                className="absolute inset-0 z-0 rounded-full bg-primary shadow-md"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>

      {loading && (
        <div
          role="status"
          aria-label="Loading projects"
          className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <span className="sr-only">Loading projects...</span>
          {Array.from({ length: 3 }, (_, skeletonIndex) => (
            <div
              key={skeletonIndex}
              aria-hidden="true"
              className="flex min-h-70 flex-col justify-between rounded-2xl border border-border bg-card p-6">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="h-10 w-10 animate-pulse rounded-lg bg-muted" />
                  <div className="flex gap-3">
                    <div className="h-5 w-5 animate-pulse rounded-full bg-muted" />
                    <div className="h-5 w-5 animate-pulse rounded-full bg-muted" />
                  </div>
                </div>
                <div className="mb-3 h-6 w-2/3 animate-pulse rounded bg-muted" />
                <div className="mb-2 h-3 w-full animate-pulse rounded bg-muted" />
                <div className="mb-2 h-3 w-11/12 animate-pulse rounded bg-muted" />
                <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
              </div>
              <div className="flex gap-2 border-t border-border pt-4">
                <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
                <div className="h-6 w-14 animate-pulse rounded-full bg-muted" />
              </div>
            </div>
          ))}
        </div>
      )}
      {error && (
        <p className="mb-12 text-center text-muted-foreground">
          Projects are currently unavailable.
        </p>
      )}

      {/* Projects Grid with Animations */}
      <motion.div
        layout="position"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              layout="position"
              key={project.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              exit="exit"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.99 }}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-[border-color,box-shadow] duration-300 hover:border-primary/70 hover:shadow-xl hover:shadow-primary/10">
              <div>
                {/* Header: Icon & Links */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <FolderGit2 className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="GitHub Repository">
                      <FaGithub className="w-5 h-5" />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Live Demo">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Technologies Badges */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {!loading && !error && filteredProjects.length === 0 && (
        <p className="mt-8 text-center text-muted-foreground">
          No projects found.
        </p>
      )}
    </section>
  );
}
