"use client";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

interface EventRegisterParams {
  eventId: string;
}

type Form = {
  name: string;
  email: string;
  dateOfBirth: string;
  event: string;
};

const EventRegister: FC<{ params: EventRegisterParams }> = ({ params }) => {
  const eventId = params.eventId;

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(`/api/events`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(formData)
  //     });

  //     if (response.ok) {
  //       alert('Користувач успішно зареєстрований на івент!');
  //     } else {
  //       console.log(response.statusText)
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const { register, handleSubmit, formState } = useForm<Form>({
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      event: "",
    },
  });

  const onSubmit = (props: Form) => {
    console.log(props);
  };

  const {isValid, isSubmitting, errors} = formState;

  return (
    <div className="dark:text-white">
      <h2>Реєстрація на івент: {eventId}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Повне ім'я:</label>
          <p>{errors.name?.message}</p>
          <input
            {...register("name")}
            className="dark:text-black"
            type="text"
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <p>{errors.email?.message}</p>
          <input
            {...register("email")}
            className="dark:text-black"
            type="email"
            required
          />
        </div>
        <div>
          <label>Дата народження:</label>
          <p>{errors.dateOfBirth?.message}</p>
          <input
            {...register("dateOfBirth")}
            className="dark:text-black"
            type="date"
            required
          />
        </div>
        <div>
          <label>Звідки ви дізналися про івент?</label>
          <p>{errors.event?.message}</p>
          <select
            {...register("event")}
            className="dark:text-black"
            required
          >
            <option value="">Оберіть варіант</option>
            <option value="Інтернет">Інтернет</option>
            <option value="Друзі">Друзі</option>
            <option value="Реклама">Реклама</option>
            <option value="Інше">Інше</option>
          </select>
        </div>
        <button type="submit" disabled={isSubmitting}>Зареєструватися</button>
      </form>
    </div>
  );
};

export default EventRegister;