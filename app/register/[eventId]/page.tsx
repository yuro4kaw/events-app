'use client'
import React, { FC, useState } from 'react';

interface EventRegisterParams {
  eventId: string;
}

const EventRegister: FC<{ params: EventRegisterParams }> = ({ params }) => {
  const eventId = params.eventId;
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    heardAbout: '',
    eventId: eventId,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/events`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Користувач успішно зареєстрований на івент!');
      } else {
        console.log(response.statusText)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Реєстрація на івент: {eventId}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Повне ім&apos;я:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Дата народження:</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
        </div>
        <div>
          <label>Звідки ви дізналися про івент?</label>
          <select name="heardAbout" value={formData.heardAbout} onChange={handleChange} required>
            <option value="">Оберіть варіант</option>
            <option value="Інтернет">Інтернет</option>
            <option value="Друзі">Друзі</option>
            <option value="Реклама">Реклама</option>
            <option value="Інше">Інше</option>
          </select>
        </div>
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
};

export default EventRegister;
