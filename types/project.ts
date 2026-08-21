export type Category = "All" | "Full-stack" | "Frontend" | "Backend";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "Full-stack" | "Frontend" | "Backend";
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
}