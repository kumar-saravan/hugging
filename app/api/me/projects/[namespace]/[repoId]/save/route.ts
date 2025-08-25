import { NextRequest, NextResponse } from "next/server";

import { isAuthenticated } from "@/lib/auth";
import Project from "@/models/Project";
import dbConnect from "@/lib/mongodb";

export async function PUT(
  req: NextRequest,
  { params }: { params: { namespace: string; repoId: string } }
) {
  const user = await isAuthenticated();

  if (user instanceof NextResponse || !user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { namespace, repoId } = params;
  const { html, history } = await req.json();

  const project = await Project.findOne({
    user_id: user.id,
    space_id: `${namespace}/${repoId}`,
  }).lean();
  if (!project) {
    return NextResponse.json(
      {
        ok: false,
        error: "Project not found",
      },
      { status: 404 }
    );
  }

  const newHistoryItem = {
    html,
    prompt: "Autosaved",
    createdAt: new Date(),
  };

  await Project.updateOne(
    { user_id: user.id, space_id: `${namespace}/${repoId}` },
    {
      $set: {
        html: html,
        history: [...history, newHistoryItem],
      },
    }
  );

  return NextResponse.json({ ok: true }, { status: 200 });
}
