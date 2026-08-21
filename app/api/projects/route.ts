import { NextResponse } from "next/server";
import dbConnect from "@/libs/mongodb";
import Project from "@/models/Project";
import { hasAdminSession } from "@/libs/auth";

const categories = ["Full-stack", "Frontend", "Backend"] as const;

function serializeProject(project: {
  _id: { toString(): string };
  [key: string]: unknown;
}) {
  const { _id, ...data } = project;
  return { ...data, id: _id.toString() };
}

function isProjectInput(value: unknown): value is {
  title: string;
  description: string;
  category: (typeof categories)[number];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
} {
  if (!value || typeof value !== "object") return false;
  const project = value as Record<string, unknown>;

  return (
    typeof project.title === "string" &&
    typeof project.description === "string" &&
    typeof project.category === "string" &&
    categories.includes(project.category as (typeof categories)[number]) &&
    Array.isArray(project.technologies) &&
    project.technologies.every(
      (technology) => typeof technology === "string",
    ) &&
    (project.githubUrl === undefined ||
      typeof project.githubUrl === "string") &&
    (project.liveUrl === undefined || typeof project.liveUrl === "string") &&
    (project.featured === undefined || typeof project.featured === "boolean")
  );
}

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(
      projects.map((project) => serializeProject(project)),
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to load projects" },
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
    if (!isProjectInput(body)) {
      return NextResponse.json(
        { error: "Invalid project data" },
        { status: 400 },
      );
    }

    await dbConnect();
    const project = await Project.create(body);
    return NextResponse.json(serializeProject(project.toObject()), {
      status: 201,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to create project" },
      { status: 500 },
    );
  }
}
