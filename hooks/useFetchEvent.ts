"use client";
import { useEffect, useState } from "react";

export interface UserInterface {
  fullName: string;
  email: string;
  dateOfBirth: Date;
  heardAbout: string;
  _id: string;
}

export interface EventInterface {
  _id: string;
  title: string;
  description: string;
  event_date: Date;
  organizer: string;
  registeredUsers: UserInterface[];
}

export interface EventEventInterface{
  event: EventInterface;
}

const useFetchEvent = (eventId: string) => {
  const [eventData, setEventData] = useState<EventEventInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEventData(data);
        setLoading(false);
      } catch (error: any) {
        // Type assertion here
        console.error("Error fetching event data:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchEventData();
  }, [eventId]);

  return { eventData, loading, error };
};

export default useFetchEvent;
