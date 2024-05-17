"use client"

import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";

interface Event {
  title: string;
  description: string;
  _id: string;
}

const CardsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/events?page=${page}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEvents((prevEvents) => [...prevEvents, ...data.events]);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(1);
  }, []);

  if (loading && events.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-4" id="cards">
      <BentoGrid className="py-20">
        {events && events.length > 0 ? (
          events.map((event, index) => (
            <BentoGridItem
              title={event._id}
              description={event.description}
              id={event._id}
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




