import mongoose, { Schema } from "mongoose";

// Схема для івенту
const eventSchema = new Schema({
  title: String,
  description: String,
  event_date: String,
  organizer: String,
  registeredUsers: [ // Поле для зареєстрованих користувачів
    {
      fullName: String,
      email: String,
      dateOfBirth: String,
      heardAbout: String
    }
  ]
});

// Модель для івенту
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
