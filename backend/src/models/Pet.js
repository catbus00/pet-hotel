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
      enum: ["male", "female", "other"],
      required: [true, "Please provide the gender of your pet"],
    },
    color: {
      type: String,
      required: [true, "Please provide the color of your pet"],
      maxlength: 100,
    },
    age: {
      type: "Number",
      required: [true, "Please provide the age of your pet"],
      max: 100,
    },
    likes: {
      type: [
        {
          type: String,
          trim: true,
          required: [true, "A like has to be defined"],
        },
      ],
      default: [],
    },
    dislikes: {
      type: [
        {
          type: String,
          trim: true,
          required: [true, "A like has to be defined"],
        },
      ],
      default: [],
    },
    species: {
      type: String,
      enum: ["cat", "dog", "other"],
      required: [true, "Please provide the species of your pet"],
    },
    hotel: {
      type: mongoose.Types.ObjectId,
      ref: "Hotel",
    },
    photo: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Pet", PetSchema);
