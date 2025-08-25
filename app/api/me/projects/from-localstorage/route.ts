import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

import { isAuthenticated } from "@/lib/auth";
import Project from "@/models/Project";
import dbConnect from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const user = await isAuthenticated();

  if (user instanceof NextResponse || !user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { html } = await req.json();

  if (!html) {
    return NextResponse.json(
      { message: "HTML content is required.", ok: false },
      { status: 400 }
    );
  }

  await dbConnect();

  const newProject = new Project({
    user_id: user.id,
    space_id: `${user.name}/${nanoid(10)}`,
    html: html,
    prompts: ["Saved from local storage"],
    history: [
      {
        html: html,
        prompt: "Initial save from local storage",
        createdAt: new Date(),
      },
    ],
  });

  await newProject.save();

  return NextResponse.json(
    {
      ok: true,
      project: newProject,
    },
    { status: 201 }
  );
}
