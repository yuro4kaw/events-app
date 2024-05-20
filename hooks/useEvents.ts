import { useState, useEffect } from "react";
import { EventInterface } from "@/hooks/useFetchEvent";

const useEvents = (initialPage: number = 1) => {
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

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

  const loadMore = () => setPage((prevPage) => prevPage + 1);

  return { events, loading, hasMore, loadMore };
};

export default useEvents;
