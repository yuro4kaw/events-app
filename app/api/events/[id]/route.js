import connectMongoDB from "@/lib/mongodb";
import Event from "@/models/event";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await connectMongoDB();
  const eventId = params.id;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}