import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import {
  getDoctorByIdOrSlug,
  updateDoctor,
  deleteDoctor,
  validateDoctorInput,
} from "@/lib/services/doctorService";
import type { DoctorInput } from "@/types/doctor";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { id } = await params;

  try {
    const doctor = await getDoctorByIdOrSlug(id);
    if (!doctor) {
      return NextResponse.json(
        { success: false, message: "Doctor not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, doctor }, { status: 200 });
  } catch (error) {
    console.error("[DOCTOR_GET_ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch doctor." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Unauthorized — admin access required." },
      { status: 401 }
    );
  }

  const { id } = await params;

  let body: DoctorInput;
  try {
    body = (await request.json()) as DoctorInput;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const validationError = validateDoctorInput(body, true);
  if (validationError) {
    return NextResponse.json(
      { success: false, message: validationError },
      { status: 400 }
    );
  }

  try {
    const doctor = await updateDoctor(id, body);
    if (!doctor) {
      return NextResponse.json(
        { success: false, message: "Doctor not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Doctor updated successfully.", doctor },
      { status: 200 }
    );
  } catch (error) {
    console.error("[DOCTOR_UPDATE_ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Failed to update doctor." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Unauthorized — admin access required." },
      { status: 401 }
    );
  }

  const { id } = await params;

  try {
    const doctor = await deleteDoctor(id);
    if (!doctor) {
      return NextResponse.json(
        { success: false, message: "Doctor not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Doctor deleted successfully.", doctor },
      { status: 200 }
    );
  } catch (error) {
    console.error("[DOCTOR_DELETE_ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete doctor." },
      { status: 500 }
    );
  }
}
