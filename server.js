import express from 'express';
import dotenv from 'dotenv';

// Create Web App
const server = express();

// Set view engine for ejs
server.set("view engine", "ejs");

// Configure Middlewaer for parsing body, JSON, public folder
server.use(express.static("public"));
server.use(express.urlencoded({extended: true}));
server.use(express.json());

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
  res.send("Hello World");
});

// Listen for server
server.listen(process.env.PORT, () => {
  console.log("Server listening on port 3000");
});