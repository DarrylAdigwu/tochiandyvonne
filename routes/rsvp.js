import express from "express";
import { newRSVP, newTradRSVP } from "../database.js";

const router = express.Router();

// RSVP Page
router.route("/")
.get(async (req, res) => {
  res.render("rsvp");
})
.post(async (req, res) =>{
  const regex = /\W/gi;
  const data = req.body;
  const dataObjLength = (Object.keys(data).length - 1) / 2;
  const event_attendace = req.body["event-attendance"];

  if(req.method === "POST") {

    // Adds inputs into database
    for(let i = 0; i < dataObjLength; i++) {
      let firstname = `firstName_${i + 1}`;
      let lastname = `lastName_${i + 1}`;
      
      firstname = req.body[firstname];
      lastname = req.body[lastname];
      
      // Sanitize user input
      firstname = firstname.replaceAll(regex, "");
      lastname = lastname.replaceAll(regex, "");
      
      // Insert into database function
      if(event_attendace === "ceremony") {
       await newRSVP(firstname, lastname)
      } 

      if (event_attendace === "celebration") {
        await newTradRSVP(firstname, lastname)
      } 

      if(event_attendace === "both") {
        await newRSVP(firstname, lastname),
        await newTradRSVP(firstname, lastname)
      }
    }
    
  }

})

router.route("/thank_you")
.get(async (req, res) => {
  res.render("thank_you")
})

export default router;