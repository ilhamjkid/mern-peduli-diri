const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
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

server.use(require("./middleware/errorHandler"));

server.listen(PORT, (err) => {
  if (err) throw new Error(err.message);
  console.log("Server is running");
});
