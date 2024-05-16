"use client"
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import { useSearchParams } from "next/navigation";
import getEvents from "@/utils/getEvent";
import PaginationControls from "./Pagination";


interface Event {
  title: string;
  description: string;
  // Add other properties if needed
}

const CardsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { events } = await getEvents();
        setEvents(events);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const start = (Number(page) - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const entries = events.slice(start, end);

  return (
    <div className="px-4" id="cards">
      <BentoGrid className="py-20">
        {entries && entries.length > 0 ? (
          entries.map((event, index) => (
            <BentoGridItem
              title={event.title}
              description={event.description}
              key={index}
              className={index === 0 || index === 3 || index === 4 ? "md:col-span-2" : ""}
            />
          ))
        ) : (
          <p>No events found</p>
        )}
      </BentoGrid>
      <PaginationControls
        hasNextPage={end < events.length}
        hasPrevPage={start > 0}
        itemsPerPage={itemsPerPage}
        totalItems={events.length}
      />
    </div>
  );
};

export default CardsSection;
