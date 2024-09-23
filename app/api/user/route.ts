import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "hey there",
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { id, email_addresses, username, image_url } = body?.data;
  let email = email_addresses[0].email_address;

  try {
    let createdUser = await prisma.user.upsert({
      where: {
        username,
        userId: id,
        email,
      },
      create: {
        username,
        userId: id,
        image: image_url,
        email,
      },
      update: {
        username,
        userId: id,
        image: image_url,
        email,
      },
    });

    if (!createdUser) {
      return NextResponse.json(
        { error: "Failed to create user in the database" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "User created SuccessFully",
    });
  } catch (error: any) {
    console.error("Error during user creation:", error);
    return NextResponse.json(
      { error: "User creation failed. Please try again." },
      { status: 500 }
    );
  }
}
