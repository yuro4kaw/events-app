"use client";
import useFetchEvent, { UserInterface } from "@/hooks/useFetchEvent";
import { Input, Pagination } from "@mantine/core";
import Link from "next/link";
import UserCard from "@/components/UserCard";
import React, { FC, useEffect, useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import "@/utils/flipClock.css";
import { TbCircleArrowUpRight } from "react-icons/tb";
import { useRouter } from "next/navigation";

interface EventRegisterParams {
  eventId: string;
}

const ViewEvent: FC<{ params: EventRegisterParams }> = ({ params }) => {
  const eventId = params.eventId;
  const { eventData, loading, error } = useFetchEvent(eventId);
  const [searchName, setSearchName] = useState<string>("");
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [eventEnded, setEventEnded] = useState<boolean>(false);
  const [activePage, setPage] = useState(1);
  const router = useRouter();

  const handleNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleEmailSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEmail(e.target.value);
  };

  useEffect(() => {
    if (eventData?.event.event_date) {
      const eventDateTime = new Date(eventData.event.event_date).getTime();
      const currentDateTime = new Date().getTime();
      if (eventDateTime < currentDateTime) {
        setEventEnded(true);
      } else {
        setEventEnded(false);
      }
    }
  }, [eventData]);

  if (loading) {
    return <p>Loading event data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>; // Ensure error is of type string
  }

  let filteredUsers = eventData?.event.registeredUsers || [];

  if (searchName) {
    filteredUsers = filteredUsers.filter((user: UserInterface) =>
      user.fullName.toLowerCase().includes(searchName.toLowerCase())
    );
  }

  if (searchEmail) {
    filteredUsers = filteredUsers.filter((user: UserInterface) =>
      user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
  }

  const eventDate = eventData?.event.event_date
    ? new Date(eventData.event.event_date).getTime()
    : null;

  const itemsPerPage = 21;

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="text-white max-w-7xl mx-auto px-4 mt-10">
      <button
        onClick={() => router.back()}
        className="flex gap-1 items-center my-4 hover:text-neutral-300 transition-all w-fit"
      >
        <SlArrowLeft />
        Back
      </button>

      {eventData ? (
        <>
          <div className="flex flex-col md:flex-row justify-between gap-10 items-start bg-[#232323] p-4 border-[#4F4F4F] border rounded-lg overflow-hidden">
            <div>
              <h1 className="text-5xl font-bold mb-2">
                {eventData.event.title}
              </h1>
              <p className="mb-2">{eventData.event.description}</p>
              {!eventEnded && (
                <Link
                  href={`/register/${eventData.event._id}`}
                  className="group flex gap-2 items-center bg-white rounded w-fit font-normal text-black px-4 py-2 hover:scale-105 transition-all duration-300 mb-6"
                >
                  Register
                  <TbCircleArrowUpRight
                    size={25}
                    className="group-hover:rotate-45 transition-all"
                  />
                </Link>
              )}

              <p className="text-neutral-400 text-lg">
                Organizer:{" "}
                <span className="font-bold">{eventData.event.organizer}</span>
              </p>
              <div className="flex gap-2">
                {eventData.event.event_date ? (
                  <>
                    <p className="text-lg font-sans text-white font-bold">
                      {new Date(eventData.event.event_date).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                    <p className="text-lg font-sans font-normal text-neutral-300">
                      {new Date(
                        eventData.event.event_date
                      ).toLocaleDateString()}
                    </p>
                    {eventEnded && (
                      <p className="bg-red-400 px-2 py-1 text-sm rounded text-white font-bold">
                        Ended
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-base font-sans font-normal text-neutral-300">
                    No event date available
                  </p>
                )}
              </div>
            </div>
            <FlipClockCountdown to={eventDate as number} />
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between my-4">
            <p className="text-2xl font-bold mb-2 md:mb-0">Registered Users:</p>
            <div className="flex gap-2">
              <Input
                placeholder="Search by name"
                value={searchName}
                onChange={handleNameSearch}
                className="w-full"
              />
              <Input
                placeholder="Search by email"
                value={searchEmail}
                onChange={handleEmailSearch}
                className="w-full"
              />
            </div>
          </div>

          <ul className="grid md:auto-rows grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {currentPageUsers.map((user: UserInterface) => (
              <UserCard
                id={user._id}
                email={user.email}
                fullName={user.fullName}
                key={user._id}
              />
            ))}
          </ul>
          {filteredUsers.length > itemsPerPage && (
            <Pagination
              className="flex justify-center mt-4 mb-8"
              total={Math.ceil(filteredUsers.length / itemsPerPage)}
              value={activePage} // Активна сторінка
              onChange={setPage} // Функція для зміни активної сторінки
              classNames={{ control: "!text-neutral-400" }}
            />
          )}
        </>
      ) : (
        <p>No event data available.</p>
      )}
    </div>
  );
};

export default ViewEvent;
