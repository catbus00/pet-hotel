const mongoose = require("mongoose");
const PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name of your pet"],
      maxlength: 50,
    },
    gender: {
      type: String,
      required: [true, "Please provide the gender of your pet"],
      maxlength: 50,
    },
    color: {
      type: String,
      required: [true, "Please provide the color of your pet"],
      maxlength: 100,
    },
    age: {
      type: "Number",
      required: [true, "Please provide the age of your pet"],
      max: 3,
    },
    avatar: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Pet", PetSchema);
