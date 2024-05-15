import getEvents from "@/utils/getEvent";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";

const CardsSection = async () => {
  const { events } = await getEvents();
  return (
    <div id="cards">
      <BentoGrid className="py-20">
        {events && events.length > 0 ? (
          events.map((event: any, index: number) => (
            <BentoGridItem 
              title={event.title}
              description={event.description}
              key={index}
              className={index === 3 || index === 6 ? "md:col-span-2" : ""}
            />
          ))
        ) : (
          <p>No events found</p>
        )}
      </BentoGrid>
    </div>
  );
};

export default CardsSection;
