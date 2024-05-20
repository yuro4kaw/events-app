import mongoose, { Schema } from "mongoose";

// Схема для івенту
const eventSchema = new Schema({
  title: String,
  description: String,
  event_date: Date,
  organizer: String,
  registeredUsers: [ // Поле для зареєстрованих користувачів
    {
      fullName: String,
      email: String,
      dateOfBirth: Date,
      heardAbout: String
    }
  ]
});

// Модель для івенту
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
