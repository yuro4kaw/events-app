"use client"

import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";

interface RegisteredUser {
  fullName: string;
  email: string;
  dateOfBirth: string; // або можна використовувати тип Date
  heardAbout: string;
  _id: string;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  event_date: string; // або можна використовувати тип Date
  organizer: string;
  registeredUsers: RegisteredUser[];
}

const CardsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchEvents = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/events?page=${page}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEvents((prevEvents) => [...prevEvents, ...data.events]);
      if (data.events.length === 0) {
        setHasMore(false); // No more events to fetch
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 50 >= document.documentElement.offsetHeight && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  if (loading && events.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-4" id="cards">
      <BentoGrid className="py-20">
        {events && events.length > 0 ? (
          events.map((event, index) => (
            <BentoGridItem
              title={event.title}
              description={event.description}
              id={event._id}
              registeredUsers={event.registeredUsers}
              key={index}
            />
          ))
        ) : (
          <p>No events found</p>
        )}
      </BentoGrid>
      {loading && <p>Loading more events...</p>}
    </div>
  );
};

export default CardsSection;
