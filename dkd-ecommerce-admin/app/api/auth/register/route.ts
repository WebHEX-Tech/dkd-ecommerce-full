
import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectToDB();
    const { role, firstname, lastname, username, password } = await request.json();

    const bcrypt = require("bcrypt");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      role:"admin", firstname, lastname, username, password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ success: "Account created" }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}