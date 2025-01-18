import mongoose from "mongoose";
import rsvp from "../models/reservations.js";
import dotenv from 'dotenv';

// Configure .env file
dotenv.config();

// Connect to mongodb
const db = mongoose.connect(process.env.DATABASE_URI)

// Function to add new RSVP to database
export async function newRSVP(first_name, last_name) {
  
  //Function to captialize first letter in both names
  function upper(name) {

    const capName = 
      name.charAt(0).toUpperCase()
      + name.slice(1);

    // trim method to remove potential blank spaces in string
    return capName.trim();
  }

  const newFirstName = upper(first_name);
  const newLastName = upper(last_name);

  try {
    const reserve = await rsvp.create({ 
      firstName: newFirstName, 
      lastName: newLastName,
    });
    
  } catch (e) {
    console.log(e.message);
  }
}