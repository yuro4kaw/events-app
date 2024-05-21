"use client";
import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues, formSchema } from "@/utils/formSchema";
import useFetchEvent from "@/hooks/useFetchEvent";
import { SlArrowLeft } from "react-icons/sl";
import { FaRegCircleCheck } from "react-icons/fa6";

import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import FormDateInput from "@/components/form/FormDateInput";
import Preloader from "@/components/Preloader";

interface EventRegisterParams {
  eventId: string;
}

const EventRegister: FC<{ params: EventRegisterParams }> = ({ params }) => {
  const { eventId } = params;
  const router = useRouter();
  const { eventData, loading, error } = useFetchEvent(eventId);
  const [isSuccess, setIsSuccess] = useState(false);

  const { control, handleSubmit, formState, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formData: FormValues) => {
    const formDataToSend = {
      ...formData,
      dateOfBirth: formData.dateOfBirth?.toISOString(), // Convert to UTC
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
        setIsSuccess(true);
        reset();
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { isSubmitting, errors } = formState;

  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <Preloader />
      </div>
    );
  }
  if (error)
    return (
      <div className="text-center text-4xl font-bold mt-10">Error: {error}</div>
    );

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
                  {new Date(eventData.event.event_date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="text-lg font-sans">
                  {new Date(eventData.event.event_date).toLocaleDateString()}
                </p>
              </>
            ) : (
              <p className="text-base font-sans">No event date available</p>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              name="fullName"
              control={control}
              label="Full name"
              placeholder="Enter your full name"
              error={errors.fullName?.message}
            />
            <FormInput
              name="email"
              control={control}
              label="Email"
              placeholder="Enter your email"
              error={errors.email?.message}
            />
            <FormDateInput
              name="dateOfBirth"
              control={control}
              label="Date of birth"
              placeholder="Choose your date of birth"
              error={errors.dateOfBirth?.message}
            />
            <FormSelect
              name="heardAbout"
              control={control}
              label="Where did you hear about this event?"
              placeholder="Pick value"
              data={["Social media", "Friends", "Found myself"]}
              error={errors.heardAbout?.message}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600 transition duration-200 block w-full"
            >
              Register
            </button>
            {isSuccess && (
              <p className="mt-4 text-green-500 flex justify-center items-center gap-2">
                <FaRegCircleCheck size={20} />
                You are successfully registered for the event!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventRegister;
