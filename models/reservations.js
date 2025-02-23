import mongoose from "mongoose";

// Create Schema
const rsvpSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
});

export const rsvp = mongoose.model("reservations", rsvpSchema);
export const tradRsvp = mongoose.model("trad_reserve", rsvpSchema)
