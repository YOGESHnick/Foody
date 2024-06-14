const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cash: {
      type: Number,
      default: "",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
