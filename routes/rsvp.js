import express from "express";
import { newRSVP } from "../db/database.js";

const router = express.Router();

// RSVP Page
router.route("/")
.get(async (req, res) => {
  res.render("rsvp");
})
.post(async (req, res) =>{
  const regex = /\W/gi;
  const data = req.body;
  const dataObjLength = Object.keys(data).length / 2;

  if(req.method === 'POST') {

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
      await newRSVP(firstname, lastname);
    }
  }

})

router.route("/thank_you")
.get(async (req, res) => {
  res.render("thank_you")
})

export default router;