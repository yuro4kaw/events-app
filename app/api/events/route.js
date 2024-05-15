import connectMongoDB from "@/lib/mongodb";
import Event from "@/models/event";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description, event_date, organizer } = await request.json();
  await connectMongoDB();
  await Event.create({ title, description, event_date, organizer });
  return NextResponse.json({ message: "Event Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const events = await Event.find();
  return NextResponse.json({ events });
}
