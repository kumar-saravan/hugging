import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // In a real application, you would create a new user in the database
  if (email && password) {
    return NextResponse.json({ message: "Signup successful" }, { status: 201 });
  }

  return NextResponse.json({ error: "Invalid data" }, { status: 400 });
}
