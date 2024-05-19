"use client"
import React, { FC, useEffect, useState } from 'react';

interface EventRegisterParams {
  eventId: string;
}

interface RegisteredUser {
    fullName: string;
    email: string;
    dateOfBirth: string; // або можна використовувати тип Date
    heardAbout: string;
    _id: string;
  }

const ViewEvent: FC<{ params: EventRegisterParams }> = ({ params }) => {
  const eventId = params.eventId;
  const [eventData, setEventData] = useState<any>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEventData(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchEventData();
  }, [eventId]);

  return (
    <div className='dark:text-white'>
      <h2>Event Details</h2>
      {eventData ? (
        <div>
          <p>Title: {eventData.event.title}</p>
          <p>Description: {eventData.event.description}</p>
          <p>Organizer: {eventData.event.organizer}</p>
          <p>Registered Users:</p>
          <ul>
            {eventData.event.registeredUsers.map((user: RegisteredUser) => (
              <li key={user._id}>
                {user.fullName} - {user.email}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading event data...</p>
      )}
    </div>
  );
};

export default ViewEvent;
