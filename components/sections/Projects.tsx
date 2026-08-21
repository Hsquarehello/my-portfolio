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

  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Heading */}
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore my recent work across full-stack applications, interactive
          user interfaces, and robust backend services.
        </p>
      </div>

      {loading && (
        <p className="mb-12 text-center text-muted-foreground">
          Loading projects...
        </p>
      )}
      {error && (
        <p className="mb-12 text-center text-muted-foreground">
          Projects are currently unavailable.
        </p>
      )}

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === category
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}>
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid with Animations */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-between border rounded-xl p-6 bg-card hover:shadow-lg transition-shadow border-border">
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
                    className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-mono">
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
