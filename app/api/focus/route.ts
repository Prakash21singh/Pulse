import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { topic, description, initialTime, userId } = await req.json();

    console.log();
    const session = await prisma.session.create({
      data: {
        topic,
        description,
        creatorId: userId,
        initialTime: initialTime * 60 * 1000,
        remainingTime: initialTime * 60 * 1000,
      },
    });

    if (!session) throw new Error("Error while creating a session");

    return NextResponse.json({
      message: "Session created Successfully",
      session,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Error processing request" },
      { status: 500 }
    );
  }
}
