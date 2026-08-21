import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import dbConnect from "@/libs/mongodb";
import Project from "@/models/Project";
import { hasAdminSession } from "@/libs/auth";

type RouteContext = { params: Promise<{ id: string }> };

function serializeProject(project: {
  _id: { toString(): string };
  [key: string]: unknown;
}) {
  const { _id, ...data } = project;
  return { ...data, id: _id.toString() };
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  try {
    const updates = await request.json();
    await dbConnect();
    const project = await Project.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).lean();

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(serializeProject(project));
  } catch {
    return NextResponse.json(
      { error: "Unable to update project" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  try {
    await dbConnect();
    const project = await Project.findByIdAndDelete(id).lean();

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ deleted: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to delete project" },
      { status: 500 },
    );
  }
}
