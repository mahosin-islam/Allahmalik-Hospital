import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { signToken, JWT_COOKIE_NAME, authCookieOptions } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const identifier = String(body.username ?? body.email ?? "")
    .trim()
    .toLowerCase();
  const password = String(body.password ?? "");

  if (!identifier || !password) {
    return NextResponse.json(
      { success: false, message: "Username/email and password are required." },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials." },
        { status: 401 }
      );
    }

    const token = await signToken({
      sub: user._id.toString(),
      username: user.username,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Logged in successfully.",
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          role: user.role,
        },
      },
      { status: 200 }
    );

    response.cookies.set(JWT_COOKIE_NAME, token, authCookieOptions);

    return response;
  } catch (error) {
    console.error("[LOGIN_ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Login failed." },
      { status: 500 }
    );
  }
}
