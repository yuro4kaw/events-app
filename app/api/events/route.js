import connectMongoDB from "@/lib/mongodb";
import Event from "@/models/event";
import { NextResponse } from "next/server";


await connectMongoDB();

export async function POST(request) {
  const { title, description, event_date, organizer } = await request.json();
  await Event.create({ title, description, event_date, organizer });
  return NextResponse.json({ message: "Event Created" }, { status: 201 });
}

export async function PUT(request) {
  const { eventId, fullName, email, dateOfBirth, heardAbout } = await request.json();

  try {
    const existingEvent = await Event.findById(eventId);
    if (!existingEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    // Додавання нового користувача до списку зареєстрованих користувачів
    const newUser = { fullName, email, dateOfBirth, heardAbout };
    existingEvent.registeredUsers.push(newUser);

    // Збереження оновленої події
    await existingEvent.save();

    return NextResponse.json({ message: "User registered for the event" });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = 6; // Кількість елементів на сторінку

  const skip = (page - 1) * limit;

  try {
    const events = await Event.find().skip(skip).limit(limit);
    const totalEvents = await Event.countDocuments();
    const totalPages = Math.ceil(totalEvents / limit);

    return NextResponse.json({
      events,
      totalEvents,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

