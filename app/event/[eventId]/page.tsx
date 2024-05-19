'use client'
import useFetchEvent, { UserInterface } from '@/hooks/useFetchEvent'
import React, { FC } from "react";

interface EventRegisterParams {
  eventId: string;
}

const ViewEvent: FC<{ params: EventRegisterParams }> = ({ params }) => {
  const eventId = params.eventId;
  const { eventData, loading, error } = useFetchEvent(eventId);

  if (loading) {
    return <p>Loading event data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>; // Ensure error is of type string
  }

  return (
    <div className="dark:text-white">
      <h2>Event Details</h2>
      {eventData ? (
        <div>
          <p>Title: {eventData.event.title}</p>
          <p>Description: {eventData.event.description}</p>
          <p>Organizer: {eventData.event.organizer}</p>
          <p>Event date: {new Date(eventData.event.event_date).toLocaleString()}</p>
          <p>Registered Users:</p>
          <ul>
            {eventData.event.registeredUsers.map((user: UserInterface) => (
              <li key={user._id}>
                {user.fullName} - {user.email} - {user.heardAbout} - {new Date(user.dateOfBirth).toLocaleString()}
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
