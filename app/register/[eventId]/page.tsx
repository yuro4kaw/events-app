"use client";
import { FormValues, formShema } from "@/utils/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import useFetchEvent from "@/hooks/useFetchEvent";

interface EventRegisterParams {
  eventId: string;
}

const EventRegister: FC<{ params: EventRegisterParams }> = ({ params }) => {
  const eventId = params.eventId;
  const { eventData } = useFetchEvent(eventId);

  const onSubmit = async (formData: FormValues) => {
    const formDataToSend = {
      ...formData,
      dateOfBirth: new Date(formData.dateOfBirth).toISOString(), // Конвертація в UTC
    };
    try {
      const response = await fetch(`/api/events`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formDataToSend, eventId }),
      });

      if (response.ok) {
        alert("Користувач успішно зареєстрований на івент!");
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { register, handleSubmit, formState, control } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      dateOfBirth: undefined,
      heardAbout: "",
    },
    resolver: zodResolver(formShema),
  });

  const { isSubmitting, errors } = formState;

  return (
    <div className="dark:text-white max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Event registration: {eventId}
      </h2>
      <p>{eventData?.event.title}</p>
      <p>{eventData?.event.description}</p>
      <p>
        Event date:{" "}
        {eventData?.event.event_date
          ? new Date(eventData.event.event_date).toLocaleString()
          : "No event date available"}
      </p>

      <p>{eventData?.event.organizer}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Full name:</label>
          <p className="text-red-500">{errors.fullName?.message}</p>
          <Input {...register("fullName")} placeholder="Enter your full name" />
        </div>
        <div>
          <label className="block mb-1">Email:</label>
          <p className="text-red-500">{errors.email?.message}</p>
          <Input
            {...register("email")}
            placeholder="Enter your email"
            type="email"
          />
        </div>
        <div>
          <label className="block mb-1">Date of birth:</label>
          <p className="text-red-500">{errors.dateOfBirth?.message}</p>
          <Controller
            control={control}
            name={"dateOfBirth"}
            render={({ field }) => (
              <DateInput onChange={(date) => field.onChange(date)} />
            )}
          />
        </div>
        <div>
          <label className="block mb-1">
            Where did you hear about this event?
          </label>
          <p className="text-red-500">{errors.heardAbout?.message}</p>
          {/* <select
            {...register("heardAbout")}
            className="dark:text-black border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="">Choose variant</option>
            <option value="Social media">Social media</option>
            <option value="Friends">Friends</option>
            <option value="Found myself">Found myself</option>
          </select> */}
          <Controller
            control={control}
            name={"heardAbout"}
            render={({ field }) => (
              <Select
                onChange={(date) => field.onChange(date)}
                data={["Social media", "Friends", "Found myself"]}
                placeholder="Pick value"
              />
            )}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 block w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default EventRegister;
