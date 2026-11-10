import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { hasAnyUsers } from "@/lib/services/userService";

const SETUP_SECRET = process.env.ADMIN_SETUP_SECRET;

function generateUsernameFromEmail(email: string): string {
  const prefix = email
    .split("@")[0]
    .replace(/[^a-zA-Z0-9._-]/g, "")
    .toLowerCase()
    .slice(0, 20);
  return prefix || "admin";
}

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

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  const providedUsername = String(body.username ?? "").trim().toLowerCase();
  const adminKey =
    request.headers.get("x-admin-key") ??
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (!name || !email || !password) {
    return NextResponse.json(
      { success: false, message: "name, email and password are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, message: "Invalid email address." },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { success: false, message: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  const hasValidKey = Boolean(SETUP_SECRET && adminKey && adminKey === SETUP_SECRET);
  const wrongKeyProvided = Boolean(adminKey && !hasValidKey);

  if (wrongKeyProvided) {
    return NextResponse.json(
      { success: false, message: "Invalid admin setup key." },
      { status: 401 }
    );
  }

  try {
    await dbConnect();

    const usersExist = await hasAnyUsers();

    // Bootstrap lock: once the first admin exists, registration requires the setup key
    if (usersExist && !hasValidKey) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Registration is closed — the first admin already exists. Ask an existing admin to create new accounts.",
        },
        { status: 403 }
      );
    }

    // Auto-generate a unique username (email prefix, with counter on collision)
    let username =
      providedUsername || generateUsernameFromEmail(email);
    if (await User.findOne({ username }).lean()) {
      let counter = 2;
      while (await User.findOne({ username: `${username}${counter}` }).lean()) {
        counter += 1;
      }
      username = `${username}${counter}`;
    }

    const user = await User.create({
      name,
      email,
      username,
      password,
      role: "admin",
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    const mongooseError = error as { code?: number; keyValue?: Record<string, string> };

    if (mongooseError.code === 11000) {
      const field = Object.keys(mongooseError.keyValue ?? {})[0] ?? "field";
      return NextResponse.json(
        { success: false, message: `A user with this ${field} already exists.` },
        { status: 409 }
      );
    }

    console.error("[REGISTER_ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Registration failed." },
      { status: 500 }
    );
  }
}
