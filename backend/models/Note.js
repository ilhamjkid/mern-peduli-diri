const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const noteSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Note", noteSchema);
