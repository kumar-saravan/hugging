import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

import { isAuthenticated } from "@/lib/auth";
import Project from "@/models/Project";
import dbConnect from "@/lib/mongodb";
import { defaultHTML } from "@/lib/consts";

export async function POST(req: NextRequest) {
  const user = await isAuthenticated();

  if (user instanceof NextResponse || !user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const newProject = new Project({
    user_id: user.id,
    space_id: `${user.name}/${nanoid(10)}`,
    html: defaultHTML,
    prompts: [],
    history: [],
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
