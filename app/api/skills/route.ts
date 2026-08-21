import { NextResponse } from "next/server";
import dbConnect from "@/libs/mongodb";
import Skill from "@/models/Skill";
import { hasAdminSession } from "@/libs/auth";

const categories = [
  "Frontend",
  "Backend",
  "Database & Cloud",
  "Tools & Others",
] as const;

function serializeSkill(skill: {
  _id: { toString(): string };
  [key: string]: unknown;
}) {
  const { _id, ...data } = skill;
  return { ...data, id: _id.toString() };
}

function isSkillInput(value: unknown): value is {
  name: string;
  category: (typeof categories)[number];
  proficiency: number;
  iconName?: string;
} {
  if (!value || typeof value !== "object") return false;
  const skill = value as Record<string, unknown>;

  return (
    typeof skill.name === "string" &&
    typeof skill.category === "string" &&
    categories.includes(skill.category as (typeof categories)[number]) &&
    typeof skill.proficiency === "number" &&
    skill.proficiency >= 0 &&
    skill.proficiency <= 100 &&
    (skill.iconName === undefined || typeof skill.iconName === "string")
  );
}

export async function GET() {
  try {
    await dbConnect();
    const skills = await Skill.find().sort({ category: 1, name: 1 }).lean();
    return NextResponse.json(skills.map((skill) => serializeSkill(skill)));
  } catch {
    return NextResponse.json(
      { error: "Unable to load skills" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: unknown = await request.json();
    if (!isSkillInput(body)) {
      return NextResponse.json(
        { error: "Invalid skill data" },
        { status: 400 },
      );
    }

    await dbConnect();
    const skill = await Skill.create(body);
    return NextResponse.json(serializeSkill(skill.toObject()), { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to create skill" },
      { status: 500 },
    );
  }
}
