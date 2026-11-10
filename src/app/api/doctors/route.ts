import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import {
  getAllDoctors,
  createDoctor,
  validateDoctorInput,
} from "@/lib/services/doctorService";
import type { DoctorInput } from "@/types/doctor";

export async function GET() {
  try {
    const doctors = await getAllDoctors();
    return NextResponse.json(
      { success: true, count: doctors.length, doctors },
      { status: 200 }
    );
  } catch (error) {
    console.error("[DOCTORS_GET_ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch doctors." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Unauthorized — admin access required." },
      { status: 401 }
    );
  }

  let body: DoctorInput;
  try {
    body = (await request.json()) as DoctorInput;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const validationError = validateDoctorInput(body);
  if (validationError) {
    return NextResponse.json(
      { success: false, message: validationError },
      { status: 400 }
    );
  }

  try {
    const doctor = await createDoctor(body);
    return NextResponse.json(
      { success: true, message: "Doctor created successfully.", doctor },
      { status: 201 }
    );
  } catch (error) {
    const mongooseError = error as { code?: number };
    if (mongooseError.code === 11000) {
      return NextResponse.json(
        { success: false, message: "A doctor with this slug already exists." },
        { status: 409 }
      );
    }
    console.error("[DOCTORS_CREATE_ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Failed to create doctor." },
      { status: 500 }
    );
  }
}
