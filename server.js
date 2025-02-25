import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import rsvpRouter from './routes/rsvp.js';

// Create Web App
const server = express();

// Configure .env file
dotenv.config();

// Connect to mongodb
async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URI)
  } catch(error) {
    console.error('Error conncting to MongoDB:', error)
    process.exit(1)
  }
}

connectDB();

// Set view engine for ejs
server.set("view engine", "ejs");

// Configure Middlewaer for parsing body, JSON, public folder
server.use(express.static("public"));
server.use(express.urlencoded({extended: true}));
server.use(express.json());

// Middleware for web security
server.use(helmet());

//Middleware for cross-origin resources
server.use(cors())

// Global Error Handling
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something unusual occurred");
});

// Landing Page
server.route("/")
.get(async (req, res) => {
  res.render("index");
});

// Our story page
server.route("/our_story")
.get(async (req, res) => {
  res.render("our_story");
});

// Schedule Page
server.route("/schedule")
.get(async (req, res) => {
  res.render("schedule");
})

// Hotel Page
server.route("/hotel")
.get(async (req, res) => {
  res.render("hotel");
})

// Wedding Party Page
server.route("/wedding_party")
.get(async (req, res) => {
  res.render("wedding_party");
});

// Gallery Page
server.route("/gallery")
.get(async (req, res) => {
  res.render("gallery");
});

// Registry Page
server.route("/registry")
.get(async (req, res) => {
  res.render("registry");
});

// RSVP router
server.use("/rsvp", rsvpRouter);

// FAQ Page
server.route("/info")
.get(async (req, res) => {
  res.render("info");
});

// Listen for server
server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});