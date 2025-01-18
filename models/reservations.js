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

const rsvp = mongoose.model("reservations", rsvpSchema);

export default rsvp;