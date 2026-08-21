"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Skill, SkillCategory } from "@/types/skill";
import { Code2, Server, Database, Wrench } from "lucide-react";

// Categories mapping with corresponding icons
const categories: { title: SkillCategory; icon: React.ReactNode }[] = [
  { title: "Frontend", icon: <Code2 className="w-5 h-5 text-primary" /> },
  { title: "Backend", icon: <Server className="w-5 h-5 text-primary" /> },
  {
    title: "Database & Cloud",
    icon: <Database className="w-5 h-5 text-primary" />,
  },
  {
    title: "Tools & Others",
    icon: <Wrench className="w-5 h-5 text-primary" />,
  },
];

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    fetch("/api/skills")
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load skills");
        return response.json();
      })
      .then((data) => {
        if (active && Array.isArray(data)) {
          setSkills(data);
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

  // Animation Variants for Container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  // Animation Variants for Individual Skill Cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section
      id="skills"
      className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-14 flex flex-col justify-between gap-5 border-b border-border pb-8 sm:flex-row sm:items-end">
        <div className="space-y-3">
          <p className="section-kicker">Capabilities / 02</p>
          <h2 className="display-font text-4xl font-bold sm:text-5xl">
            The tools I think with
          </h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-right">
          A breakdown of my technical proficiencies and technologies I work with
          daily.
        </p>
      </div>

      {loading && (
        <p className="mb-16 text-muted-foreground">Loading skills...</p>
      )}
      {error && (
        <p className="mb-16 text-center text-muted-foreground">
          Skills are currently unavailable.
        </p>
      )}

      {/* Skills Grid by Category */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {categories.map(({ title, icon }) => {
          const categorySkills = skills.filter((s) => s.category === title);

          return (
            <motion.div
              key={title}
              variants={cardVariants}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/70">
              {/* Category Title with Icon */}
              <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-border">
                <div className="rounded-full bg-accent p-2">{icon}</div>
                <h3 className="text-xl font-bold">{title}</h3>
              </div>

              {/* Skill Bars */}
              <div className="space-y-5">
                {categorySkills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>{skill.name}</span>
                      <span className="text-muted-foreground">
                        {skill.proficiency}%
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      {/* Animated Inner Progress Fill */}
                      <motion.div
                        className="h-full rounded-full bg-primary"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
