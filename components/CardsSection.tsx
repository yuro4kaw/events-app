"use client";
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import { Autocomplete, Select, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { EventInterface } from "@/hooks/useFetchEvent";

const CardsSection = () => {
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortMethod, setSortMethod] = useState<string>("Default");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [organizerFilter, setOrganizerFilter] = useState<string>("");

  const fetchEvents = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/events?page=${page}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
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
    if (
      window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.offsetHeight &&
      !loading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  //----------------------------------------------------------------

  const getUniqueTitles = (events: EventInterface[]) => {
    const titles = events.map((event) => event.title);
    return Array.from(new Set(titles)); // Removes duplicate titles
  };

  const getUniqueOrganizers = (events: EventInterface[]) => {
    const organizers = events.map((event) => event.organizer);
    return Array.from(new Set(organizers)); // Removes duplicate organizers
  };

  const uniqueEventTitles = getUniqueTitles(events);
  const uniqueOrganizers = getUniqueOrganizers(events);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchValue.toLowerCase()) &&
    event.organizer.toLowerCase().includes(organizerFilter.toLowerCase())
  );

  const sortEvents = (
    events: EventInterface[],
    sortMethod: string
  ) => {
    switch (sortMethod) {
      case "Name Ascending":
        return sortEventsByTitle(events, "Ascending");
      case "Name Descending":
        return sortEventsByTitle(events, "Descending");
      case "Date Ascending":
        return sortEventsByDate(events, "Ascending");
      case "Date Descending":
        return sortEventsByDate(events, "Descending");
      case "Organizer Ascending":
        return sortEventsByOrganizer(events, "Ascending");
      case "Organizer Descending":
        return sortEventsByOrganizer(events, "Descending");
      default:
        return events;
    }
  };

  const sortEventsByTitle = (events: EventInterface[], method: string) => {
    if (method === "Ascending") {
      return [...events].sort((a, b) => a.title.localeCompare(b.title));
    } else if (method === "Descending") {
      return [...events].sort((a, b) => b.title.localeCompare(a.title));
    }
    return events;
  };

  const sortEventsByDate = (events: EventInterface[], method: string) => {
    if (method === "Ascending") {
      return [...events].sort(
        (a, b) =>
          new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
      );
    } else if (method === "Descending") {
      return [...events].sort(
        (a, b) =>
          new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
      );
    }
    return events;
  };

  const sortEventsByOrganizer = (events: EventInterface[], method: string) => {
    if (method === "Ascending") {
      return [...events].sort((a, b) => a.organizer.localeCompare(b.organizer));
    } else if (method === "Descending") {
      return [...events].sort((a, b) => b.organizer.localeCompare(a.organizer));
    }
    return events;
  };

  const filterEventsByDate = (events: EventInterface[], startDate: Date | null, endDate: Date | null) => {
    if (!startDate || !endDate) return events;
    return events.filter((event) => {
      const eventDate = new Date(event.event_date);
      return eventDate >= startDate && eventDate <= endDate;
    });
  };

  const sortedEvents = sortEvents(filteredEvents, sortMethod);

  const filteredEventsByDate = filterEventsByDate(sortedEvents, startDate, endDate);

  if (loading && events.length === 0) {
    return <p>Loading...</p>;
  }

  const handleAutocompleteChange = (value: string | null) => {
    if (value !== null) {
      setSearchValue(value);
    } else {
      setSearchValue("");
    }
  };

  const handleSortChange = (value: string | null) => {
    if (value !== null) {
      setSortMethod(value);
    }
  };

  const handleStartDateChange = (value: Date | null) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value: Date | null) => {
    setEndDate(value);
  };

  const handleOrganizerChange = (value: string | null) => {
    if (value !== null) {
      setOrganizerFilter(value);
    } else {
      setOrganizerFilter("");
    }
  };

  const clearFilters = () => {
    setSearchValue("");
    setSortMethod("Default");
    setStartDate(null);
    setEndDate(null);
    setOrganizerFilter("");
  };

  return (
    <div className="px-4 dark:text-white" id="cards">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        <h2 className="font-black">Sort and Filter Events</h2>
        <div className="flex">
          <Autocomplete
            label="Search event by name"
            placeholder="Pick event or search by name"
            data={uniqueEventTitles}
            value={searchValue}
            onChange={(value) => handleAutocompleteChange(value)}
            className="w-full"
          />
          <Select
            label="Sort events"
            placeholder="Choose sort method"
            data={[
              "Default",
              "Name Ascending",
              "Name Descending",
              "Date Ascending",
              "Date Descending",
              "Organizer Ascending",
              "Organizer Descending"
            ]}
            value={sortMethod}
            onChange={(value) => handleSortChange(value)}
            className="w-full"
          />
        </div>
        <div className="flex">
          <DatePickerInput
            label="Pick start date"
            placeholder="Start date"
            value={startDate}
            onChange={handleStartDateChange}
            className="w-full"
          />
          <DatePickerInput
            label="Pick end date"
            placeholder="End date"
            value={endDate}
            onChange={handleEndDateChange}
            className="w-full"
          />
          <Autocomplete
            label="Filter events by organizer"
            placeholder="Pick organizer or search by name"
            data={uniqueOrganizers}
            value={organizerFilter}
            onChange={(value) => handleOrganizerChange(value)}
            className="w-full"
          />
        </div>
        <Button onClick={clearFilters} className="self-end mt-3">
          Clear Filters
        </Button>
      </div>
      <BentoGrid className="py-20">
        {filteredEventsByDate && filteredEventsByDate.length > 0 ? (
          filteredEventsByDate.map((event, index) => (
            <BentoGridItem
              title={event.title}
              description={event.description}
              id={event._id}
              registeredUsers={event.registeredUsers}
              organizer={event.organizer}
              eventDate={event.event_date}
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
