export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database & Cloud"
  | "Tools & Others";

export interface Skill {
  id?: string;
  name: string;
  category: SkillCategory;
  proficiency: number; // Percentage (0 - 100)
  iconName?: string;
}
