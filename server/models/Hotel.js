const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", HotelSchema);