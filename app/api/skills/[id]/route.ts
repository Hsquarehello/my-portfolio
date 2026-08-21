import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import dbConnect from "@/libs/mongodb";
import Skill from "@/models/Skill";
import { hasAdminSession } from "@/libs/auth";

type RouteContext = { params: Promise<{ id: string }> };

function serializeSkill(skill: {
  _id: { toString(): string };
  [key: string]: unknown;
}) {
  const { _id, ...data } = skill;
  return { ...data, id: _id.toString() };
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid skill ID" }, { status: 400 });
  }

  try {
    const updates = await request.json();
    await dbConnect();
    const skill = await Skill.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).lean();

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json(serializeSkill(skill));
  } catch {
    return NextResponse.json(
      { error: "Unable to update skill" },
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
    return NextResponse.json({ error: "Invalid skill ID" }, { status: 400 });
  }

  try {
    await dbConnect();
    const skill = await Skill.findByIdAndDelete(id).lean();

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({ deleted: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to delete skill" },
      { status: 500 },
    );
  }
}
