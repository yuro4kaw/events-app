"use client";

import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import { Autocomplete, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

interface RegisteredUser {
  fullName: string;
  email: string;
  dateOfBirth: string; // or use type Date
  heardAbout: string;
  _id: string;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  event_date: string; // or use type Date
  organizer: string;
  registeredUsers: RegisteredUser[];
}

const CardsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [titleSortMethod, setTitleSortMethod] = useState<string>("Default");
  const [dateSortMethod, setDateSortMethod] = useState<string>("Default");
  const [organizerSortMethod, setOrganizerSortMethod] = useState<string>("Default");
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

  const getUniqueTitles = (events: Event[]) => {
    const titles = events.map((event) => event.title);
    return Array.from(new Set(titles)); // Removes duplicate titles
  };

  const getUniqueOrganizers = (events: Event[]) => {
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
    events: Event[],
    titleSortMethod: string,
    dateSortMethod: string,
    organizerSortMethod: string
  ) => {
    // Спочатку сортуємо за датою
    const sortedByDate = sortEventsByDate(events, dateSortMethod);

    // Потім за назвою, у разі рівності дати
    const sortedByDateAndTitle = sortEventsByTitle(
      sortedByDate,
      titleSortMethod
    );

    // Потім за організатором, у разі рівності дати та назви
    const sortedByAll = sortEventsByOrganizer(
      sortedByDateAndTitle,
      organizerSortMethod
    );

    return sortedByAll;
  };

  // Функція сортування за назвою
  const sortEventsByTitle = (events: Event[], method: string) => {
    if (method === "Ascending") {
      return [...events].sort((a, b) => a.title.localeCompare(b.title));
    } else if (method === "Descending") {
      return [...events].sort((a, b) => b.title.localeCompare(a.title));
    }
    return events;
  };

  // Функція сортування за датою
  const sortEventsByDate = (events: Event[], method: string) => {
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

  // Функція сортування за організатором
  const sortEventsByOrganizer = (events: Event[], method: string) => {
    if (method === "Ascending") {
      return [...events].sort((a, b) => a.organizer.localeCompare(b.organizer));
    } else if (method === "Descending") {
      return [...events].sort((a, b) => b.organizer.localeCompare(a.organizer));
    }
    return events;
  };

  const filterEventsByDate = (events: Event[], startDate: Date | null, endDate: Date | null) => {
    if (!startDate || !endDate) return events;
    return events.filter((event) => {
      const eventDate = new Date(event.event_date);
      return eventDate >= startDate && eventDate <= endDate;
    });
  };

  const sortedEvents = sortEvents(
    filteredEvents,
    titleSortMethod,
    dateSortMethod,
    organizerSortMethod
  );

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

  const handleTitleSortChange = (value: string | null) => {
    if (value !== null) {
      setTitleSortMethod(value);
    }
  };

  const handleDateSortChange = (value: string | null) => {
    if (value !== null) {
      setDateSortMethod(value);
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

  const handleOrganizerSortChange = (value: string | null) => {
    if (value !== null) {
      setOrganizerSortMethod(value);
    }
  };

  return (
    <div className="px-4 dark:text-white" id="cards">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
      <h2 className="font-black">Sort By Title</h2>
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
          label="Sort events by title"
          placeholder="Choose sort method"
          data={["Default", "Ascending", "Descending"]}
          value={titleSortMethod}
          onChange={(value) => handleTitleSortChange(value)}
          className="w-full"
        />
      </div>
      <h2 className="font-black">Sort By Date</h2>
      <div className="flex">
        <Select
          label="Sort events by date"
          placeholder="Choose sort method"
          data={["Default", "Ascending", "Descending"]}
          value={dateSortMethod}
          onChange={(value) => handleDateSortChange(value)}
          className="w-full"
        />
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
      </div>
      <h2 className="font-black">Sort and Filter By Organizer</h2>
      <div className="flex">
        <Autocomplete
          label="Filter events by organizer"
          placeholder="Pick organizer or search by name"
          data={uniqueOrganizers}
          value={organizerFilter}
          onChange={(value) => handleOrganizerChange(value)}
          className="w-full"
        />
        <Select
          label="Sort events by organizer"
          placeholder="Choose sort method"
          data={["Default", "Ascending", "Descending"]}
          value={organizerSortMethod}
          onChange={(value) => handleOrganizerSortChange(value)}
          className="w-full"
        />
      </div>
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
