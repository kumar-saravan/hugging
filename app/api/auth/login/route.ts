import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // In a real application, you would validate the credentials against a database
  if (email && password) {
    // For now, we'll just return a mock token
    const token = "mock-jwt-token";
    return NextResponse.json({ token });
  }

  return NextResponse.json(
    { error: "Invalid credentials" },
    { status: 401 }
  );
}
