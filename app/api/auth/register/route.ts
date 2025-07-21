import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/auth";
import { z } from "zod";

// Validation schema for the registration data
const registrationSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional().transform((value => value ? new Date(value) : undefined)),
})

// This function handles user registration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input data
    const validatedData = registrationSchema.parse(body);

    // Create user 
    const newUserData = await createUser(validatedData);

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: newUserData.id,
          email: newUserData.email,
          firstName: newUserData.firstName,
          lastName: newUserData.lastName,
          phone: newUserData.phone,
          dateOfBirth: newUserData.dateOfBirth,
          isActive: true,
          createdAt: new Date(),
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error("Registration error:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: 'Validation error',
          errors: error.message
        },
        { status: 400 }
      )
    }

    // Handle duplicate email error
    if (error instanceof Error && error.message.includes('already exists')) {
      return NextResponse.json(
        { message: 'User already exists with this email' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: "Interanl server error" },
      { status: 500 }
    );
  }
}