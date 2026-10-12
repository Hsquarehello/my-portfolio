"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, FolderGit2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { Category, Project } from "@/types/project";

const categories: Category[] = ["All", "Full-stack", "Frontend", "Backend"];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [activePage, setActivePage] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    function updateCardsPerPage() {
      const nextCardsPerPage =
        window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
      setCardsPerPage((current) =>
        current === nextCardsPerPage ? current : nextCardsPerPage,
      );
    }

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  // Filter projects based on selected category
  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All") return true;
    return project.category === activeCategory;
  });
  const projectPages = Array.from(
    { length: Math.ceil(filteredProjects.length / cardsPerPage) },
    (_, pageIndex) =>
      filteredProjects.slice(
        pageIndex * cardsPerPage,
        (pageIndex + 1) * cardsPerPage,
      ),
  );

  function goToPage(pageIndex: number) {
    const carousel = carouselRef.current;
    if (!carousel) return;

    setActivePage(pageIndex);
    carousel.scrollTo({
      left: pageIndex * carousel.clientWidth,
      behavior: "smooth",
    });
  }

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
    <section id="projects" className="w-full bg-muted/20 py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="section-kicker">Featured projects</p>
          <h2 className="display-font mt-3 text-4xl font-bold sm:text-5xl">
            Some of my recent work
          </h2>
          <span className="mx-auto mt-5 block h-0.5 w-12 bg-primary" />
        </div>

        <div
          role="group"
          aria-label="Filter projects by category"
          className="mb-10 flex flex-wrap justify-center gap-5">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => {
                setActiveCategory(category);
                setActivePage(0);
                carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
              }}
              className={`border-b-2 px-1 py-2 text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}>
              {category}
            </button>
          ))}
        </div>

        {loading && (
          <div
            role="status"
            aria-label="Loading projects"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <span className="sr-only">Loading projects...</span>
            {Array.from({ length: 3 }, (_, skeletonIndex) => (
              <div
                key={skeletonIndex}
                aria-hidden="true"
                className="overflow-hidden border border-border bg-card">
                <div className="aspect-video animate-pulse bg-muted" />
                <div className="space-y-4 p-5">
                  <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                  <div className="h-6 w-2/3 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-full animate-pulse rounded bg-muted" />
                  <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        )}
        {error && (
          <p className="text-center text-muted-foreground">
            Projects are currently unavailable.
          </p>
        )}

        <div
          ref={carouselRef}
          role="region"
          aria-label="Featured projects carousel"
          aria-roledescription="carousel"
          tabIndex={0}
          onScroll={() => {
            const carousel = carouselRef.current;
            if (!carousel) return;
            const pageIndex = Math.round(
              carousel.scrollLeft / carousel.clientWidth,
            );
            setActivePage((current) =>
              current === pageIndex ? current : pageIndex,
            );
          }}
          className="flex snap-x snap-mandatory gap-0 overflow-x-auto scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden">
          <AnimatePresence mode="popLayout">
            {projectPages.map((page, pageIndex) => (
              <div
                key={`${activeCategory}-${cardsPerPage}-${pageIndex}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`Page ${pageIndex + 1} of ${projectPages.length}`}
                className="w-full shrink-0 snap-start">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {page.map((project, index) => {
                    const projectIndex = pageIndex * cardsPerPage + index;

                    return (
                      <motion.article
                        layout="position"
                        key={project.id}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        exit="exit"
                        whileHover={{ y: -4 }}
                        className="group overflow-hidden border border-border bg-card transition-[border-color,box-shadow] duration-300 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10">
                        <div className="relative aspect-video overflow-hidden bg-muted">
                          {project.imageUrl ? (
                            <Image
                              src={project.imageUrl}
                              alt={`${project.title} project preview`}
                              fill
                              unoptimized
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          ) : (
                            <div
                              aria-hidden="true"
                              className="grid h-full place-items-center bg-accent text-primary">
                              <FolderGit2 className="h-10 w-10 opacity-70" />
                            </div>
                          )}
                          <span className="absolute left-3 top-3 bg-background/90 px-2 py-1 text-xs font-semibold tabular-nums">
                            {String(projectIndex + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <div className="flex min-h-52 flex-col p-5">
                          <p className="section-kicker">{project.category}</p>
                          <h3 className="mt-2 text-xl font-semibold">
                            {project.title}
                          </h3>
                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                            {project.description}
                          </p>

                          <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
                            <div className="flex min-w-0 flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                              {project.technologies.slice(0, 3).map((tech) => (
                                <span key={tech}>{tech}</span>
                              ))}
                            </div>
                            <div className="flex shrink-0 items-center gap-3">
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted-foreground transition-colors hover:text-foreground"
                                  aria-label={`${project.title} GitHub repository`}>
                                  <FaGithub className="h-5 w-5" />
                                </a>
                              )}
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                                  aria-label={`View ${project.title}`}>
                                  View project
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </div>
            ))}
          </AnimatePresence>
        </div>

        {projectPages.length > 1 && (
          <div
            role="group"
            aria-label="Project carousel pages"
            className="mt-7 flex justify-center gap-2.5">
            {projectPages.map((_, pageIndex) => (
              <button
                key={pageIndex}
                type="button"
                aria-label={`Go to project page ${pageIndex + 1}`}
                aria-current={activePage === pageIndex ? "true" : undefined}
                onClick={() => goToPage(pageIndex)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  activePage === pageIndex
                    ? "bg-primary"
                    : "bg-muted-foreground/40 hover:bg-primary/60"
                }`}
              />
            ))}
          </div>
        )}
        {!loading && !error && filteredProjects.length === 0 && (
          <p className="mt-8 text-center text-muted-foreground">
            No projects found.
          </p>
        )}
      </div>
    </section>
  );
}
