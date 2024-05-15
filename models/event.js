import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
  title: String,
  description: String,
  event_date: String,
  organizer: String,
});

const Event =  mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
