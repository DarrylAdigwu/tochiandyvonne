import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';

// Create Web App
const server = express();

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

// Configure .env file
dotenv.config();

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


// Listen for server
server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});