"use client";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { FormValues, formShema } from "@/utils/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetchEvent from "@/hooks/useFetchEvent";
import { SlArrowLeft } from "react-icons/sl";
import { useRouter } from "next/navigation";

interface EventRegisterParams {
  eventId: string;
}

const EventRegister: FC<{ params: EventRegisterParams }> = ({ params }) => {
  const eventId = params.eventId;
  const router = useRouter();
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
    <div className="flex justify-center items-center h-screen px-4">
      <div className="flex flex-col gap-2 w-full max-w-[480px]">
        <button
          onClick={() => router.back()}
          className="flex gap-1 text-white items-center my-4 hover:text-neutral-300 transition-all w-fit z-10"
        >
          <SlArrowLeft />
          Back
        </button>
        <div className="text-black w-full max-w-[480px] mx-auto bg-white p-6 rounded-lg shadow-[0_0px_100px_-10px_rgba(59,130,246,1)]">
          <h2 className="text-4xl font-semibold mb-4 text-center">
            Event registration
          </h2>
          <p className="text-xl text-center">
            <span className="font-bold">{eventData?.event.title}</span> by{" "}
            <span className="font-bold">{eventData?.event.organizer}</span>
          </p>
          <div className="text-center text-neutral-500 mb-4 flex gap-4 justify-center">
            {eventData?.event.event_date ? (
              <>
                <p className="text-lg font-sans">
                  {new Date(eventData?.event.event_date).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
                <p className="text-lg font-sans">
                  {new Date(eventData?.event.event_date).toLocaleDateString()}
                </p>
              </>
            ) : (
              <p className="text-base font-sans ">No event date available</p>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1">Full name:</label>
              <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
              <Input
                {...register("fullName")}
                placeholder="Enter your full name"
                classNames={{
                  input: `!bg-neutral-100 focus:${
                    !!errors.fullName?.message
                      ? "!border-red-500"
                      : "!border-neutral-800"
                  } ${
                    !!errors.fullName?.message
                      ? "!border-red-500"
                      : "!border-neutral-400"
                  } !transition-all !text-neutral-800`,
                }}
              />
            </div>
            <div>
              <label className="block mb-1">Email:</label>
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
              <Input
                {...register("email")}
                placeholder="Enter your email"
                classNames={{
                  input: `!bg-neutral-100 focus:${
                    !!errors.email?.message
                      ? "!border-red-500"
                      : "!border-neutral-800"
                  } ${
                    !!errors.email?.message
                      ? "!border-red-500"
                      : "!border-neutral-400"
                  } !transition-all !text-neutral-800 error:!border-red-500`,
                }}
              />
            </div>
            <div>
              <label className="block mb-1">Date of birth:</label>
              <p className="text-red-500 text-sm">
                {errors.dateOfBirth?.message}
              </p>
              <Controller
                control={control}
                name={"dateOfBirth"}
                render={({ field }) => (
                  <DateInput
                    onChange={(date) => field.onChange(date)}
                    placeholder="Choose your date of birth"
                    classNames={{
                      input: `!bg-neutral-100 focus:${
                        !!errors.dateOfBirth?.message
                          ? "!border-red-500"
                          : "!border-neutral-800"
                      } ${
                        !!errors.dateOfBirth?.message
                          ? "!border-red-500"
                          : "!border-neutral-400"
                      } !transition-all !text-neutral-800`,
                    }}
                  />
                )}
              />
            </div>
            <div>
              <label className="block mb-1">
                Where did you hear about this event?
              </label>
              <p className="text-red-500 text-sm">
                {errors.heardAbout?.message}
              </p>
              <Controller
                control={control}
                name={"heardAbout"}
                render={({ field }) => (
                  <Select
                    onChange={(date) => field.onChange(date)}
                    data={["Social media", "Friends", "Found myself"]}
                    placeholder="Pick value"
                    classNames={{
                      input: `!bg-neutral-100 focus:${
                        !!errors.heardAbout?.message
                          ? "!border-red-500"
                          : "!border-neutral-800"
                      } ${
                        !!errors.heardAbout?.message
                          ? "!border-red-500"
                          : "!border-neutral-400"
                      } !transition-all !text-neutral-800`,
                      dropdown: "!bg-neutral-100 !text-neutral-800",
                      option: "hover:!bg-neutral-300",
                    }}
                  />
                )}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600 transition duration-200 block w-full"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventRegister;
