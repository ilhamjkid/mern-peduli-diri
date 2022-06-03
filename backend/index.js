const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { connectDB } = require("./config/dbConfig");

const server = express();
const PORT = process.env.PORT || 5000;

connectDB();

server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors(require("./config/corsOptions")));

server.use("/api/users", require("./routes/userRouter"));
server.use("/api/notes", require("./routes/noteRouter"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  server.use(express.static(path.join(__dirname, "../frontend/build")));
  server.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html")));
} else server.get("/", (req, res) => res.send("Please set to production"));

server.use(require("./middleware/errorHandler"));

server.listen(PORT, (err) => {
  if (err) throw new Error(err.message);
  console.log("Server is running");
});
