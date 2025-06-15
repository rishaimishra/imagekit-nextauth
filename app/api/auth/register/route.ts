import { DbConnection } from "@/lib/db";
import User from "@/models/User";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Name is requied" }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ error: "email is requied" }, { status: 400 });
    }
    if (!password) {
      return NextResponse.json(
        { error: "password is requied" },
        { status: 400 }
      );
    }

    await DbConnection();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "user already exists" },
        { status: 400 }
      );
    }
  } catch (error) {}
}
