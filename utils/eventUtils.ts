import { EventInterface } from "@/hooks/useFetchEvent";

export const getUniqueTitles = (events: EventInterface[]): string[] => {
  const titles = events.map((event) => event.title);
  return Array.from(new Set(titles)); // Removes duplicate titles
};

export const getUniqueOrganizers = (events: EventInterface[]): string[] => {
  const organizers = events.map((event) => event.organizer);
  return Array.from(new Set(organizers)); // Removes duplicate organizers
};

export const filterEvents = (
  events: EventInterface[],
  searchValue: string,
  organizerFilter: string
): EventInterface[] => {
  return events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchValue.toLowerCase()) &&
      event.organizer.toLowerCase().includes(organizerFilter.toLowerCase())
  );
};

export const filterEventsByDate = (
  events: EventInterface[],
  startDate: Date | null,
  endDate: Date | null
): EventInterface[] => {
  if (!startDate || !endDate) return events;
  return events.filter((event) => {
    const eventDate = new Date(event.event_date);
    return eventDate >= startDate && eventDate <= endDate;
  });
};

export const sortEvents = (
  events: EventInterface[],
  sortMethod: string
): EventInterface[] => {
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

const sortEventsByTitle = (events: EventInterface[], method: string): EventInterface[] => {
  if (method === "Ascending") {
    return [...events].sort((a, b) => a.title.localeCompare(b.title));
  } else if (method === "Descending") {
    return [...events].sort((a, b) => b.title.localeCompare(a.title));
  }
  return events;
};

const sortEventsByDate = (events: EventInterface[], method: string): EventInterface[] => {
  if (method === "Ascending") {
    return [...events].sort(
      (a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
    );
  } else if (method === "Descending") {
    return [...events].sort(
      (a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
    );
  }
  return events;
};

const sortEventsByOrganizer = (events: EventInterface[], method: string): EventInterface[] => {
  if (method === "Ascending") {
    return [...events].sort((a, b) => a.organizer.localeCompare(b.organizer));
  } else if (method === "Descending") {
    return [...events].sort((a, b) => b.organizer.localeCompare(a.organizer));
  }
  return events;
};
