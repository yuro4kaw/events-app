"use client";
import useFetchEvent, { UserInterface } from "@/hooks/useFetchEvent";
import { Input } from "@mantine/core";
import React, { FC, useState } from "react";

interface EventRegisterParams {
  eventId: string;
}

const ViewEvent: FC<{ params: EventRegisterParams }> = ({ params }) => {
  const eventId = params.eventId;
  const { eventData, loading, error } = useFetchEvent(eventId);
  const [searchName, setSearchName] = useState<string>("");
  const [searchEmail, setSearchEmail] = useState<string>("");

  const handleNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleEmailSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEmail(e.target.value);
  };

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

  return (
    <div className="dark:text-white">
      <h2>Event Details</h2>
      {eventData ? (
        <div>
          <p>Title: {eventData.event.title}</p>
          <p>Description: {eventData.event.description}</p>
          <p>Organizer: {eventData.event.organizer}</p>
          <p>
            Event date:
            {eventData.event.event_date
              ? new Date(eventData.event.event_date).toLocaleString()
              : "No event date available"}
          </p>
          <Input
            placeholder="Search by name"
            value={searchName}
            onChange={handleNameSearch}
          />
          <Input
            placeholder="Search by email"
            value={searchEmail}
            onChange={handleEmailSearch}
          />
          <p>Registered Users:</p>
          <ul>
            {filteredUsers.map((user: UserInterface) => (
              <li key={user._id}>
                {user.fullName} - {user.email} - {user.heardAbout} -{" "}
                {new Date(user.dateOfBirth).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No event data available.</p>
      )}
    </div>
  );
};

export default ViewEvent;
