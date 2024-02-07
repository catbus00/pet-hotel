const mongoose = require("mongoose");
const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name of your hotel"],
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, "Please provide a description of your business"],
      maxlength: 300,
    },
    year: {
      type: Number,
      required: [true, "Please provide the year your company was founded"],
      maxlength: 2,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Hotel", HotelSchema);
