"use client";
import React, { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import { Autocomplete, Select, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { EventInterface } from "@/hooks/useFetchEvent";
import useEvents from "@/hooks/useEvents";
import {
  getUniqueTitles,
  getUniqueOrganizers,
  filterEvents,
  filterEventsByDate,
  sortEvents,
} from "@/utils/eventUtils";
import { motion, AnimatePresence } from "framer-motion";
import { VscSettings } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";

const CardsSection = () => {
  const { events, loading, hasMore, loadMore } = useEvents();
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortMethod, setSortMethod] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [organizerFilter, setOrganizerFilter] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
          document.documentElement.offsetHeight &&
        !loading &&
        hasMore
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, loadMore]);

  // Get unique event titles and organizers for autocomplete
  const uniqueEventTitles = getUniqueTitles(events);
  const uniqueOrganizers = getUniqueOrganizers(events);

  // Filter events by search value and organizer
  const filteredEvents = filterEvents(events, searchValue, organizerFilter);

  // Sort events by selected method
  const sortedEvents = sortEvents(filteredEvents, sortMethod);

  // Filter events by date range
  const filteredEventsByDate = filterEventsByDate(
    sortedEvents,
    startDate,
    endDate
  );

  if (loading && events.length === 0) {
    return <p>Loading...</p>;
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchValue("");
    setStartDate(null);
    setEndDate(null);
    setOrganizerFilter("");
  };

  return (
    <div className="px-4 text-white" id="cards">
      <div className="max-w-7xl mx-auto flex flex-col gap-3 py-10">
        <div className="flex items-center">
          <button
            className="w-40 bg-white rounded text-black px-4 py-2 flex justify-center items-center gap-2"
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            {filtersVisible ? "Hide Filters" : "Show Filters"} <VscSettings />
          </button>
          <Select
            placeholder="Choose sort method"
            data={[
              "Default",
              "Name Ascending",
              "Name Descending",
              "Date Ascending",
              "Date Descending",
              "Organizer Ascending",
              "Organizer Descending",
            ]}
            value={sortMethod}
            onChange={(value) => setSortMethod(value || "Default")}
            className="hidden mb-4 sm:block sm:ml-auto sm:max-w-60"
            size="md"
          />
        </div>
        <AnimatePresence>
          {filtersVisible && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-3 bg-[#232323] p-4 border-[#4F4F4F] border rounded-lg"
            >
              <div className="flex gap-4 items-end flex-col md:flex-row">
                <Autocomplete
                  label="Search event by name"
                  placeholder="Pick event or search by name"
                  data={uniqueEventTitles}
                  value={searchValue}
                  onChange={(value) => setSearchValue(value || "")}
                  className="w-full"
                  size="md"
                  classNames={{ label: "!text-sm" }}
                />
                <Autocomplete
                  label="Filter events by organizer"
                  placeholder="Pick organizer or search by name"
                  data={uniqueOrganizers}
                  value={organizerFilter}
                  onChange={(value) => setOrganizerFilter(value || "")}
                  className="w-full"
                  size="md"
                />
                <DatePickerInput
                  label="Pick start date"
                  placeholder="Start date"
                  value={startDate}
                  onChange={setStartDate}
                  className="w-full"
                  clearable
                  size="md"
                />
                <DatePickerInput
                  label="Pick end date"
                  placeholder="End date"
                  value={endDate}
                  onChange={setEndDate}
                  className="w-full"
                  clearable
                  size="md"
                />
                <div className="flex justify-end mt-6">
                  <button
                    onClick={clearFilters}
                    className="w-40 bg-white rounded text-black px-4 py-2 flex justify-center items-center gap-2"
                  >
                    Clear Filters <RxCross2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="max-w-7xl mx-auto pb-10">
        <Select
          placeholder="Choose sort method"
          data={[
            "Name Ascending",
            "Name Descending",
            "Date Ascending",
            "Date Descending",
            "Organizer Ascending",
            "Organizer Descending",
          ]}
          value={sortMethod}
          onChange={(value) => setSortMethod(value || "Default")}
          className="w-full mb-4 sm:hidden"
          size="md"
        />
        <BentoGrid>
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
                color={colors[index % colors.length]}
              />
            ))
          ) : (
            <p>No events found</p>
          )}
        </BentoGrid>
      </div>
      {loading && <p>Loading more events...</p>}
    </div>
  );
};

export default CardsSection;

const colors = [
  "#4DE3ED", // Синьо-бірюзовий
  "#DF91F2", // Фіолетовий
  "#91F2A6", // Зелений
  "#ED91E3", // Рожевий
  "#F2DF91", // Жовтий
  "#A691F2", // Фіолетовий
  "#E3914D", // Помаранчевий
];
