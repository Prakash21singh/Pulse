import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // ADD Toast in prisma
    return NextResponse.json({
      message: "Goal received successfully",
      receivedGoal: body.goal,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Error processing request" },
      { status: 500 }
    );
  }
}
