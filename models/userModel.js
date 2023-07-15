const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "role is required..."],
      enum: ["admin", "user", "organization", "hospital"],
    },
    name: {
      type: String,
      required: function () {
        if (this.role === "user" || this.role === "admin") return true;
        else return false;
      },
    },
    organizationName: {
      type: String,
      required: function () {
        if (this.role === "organization") return true;
        else return false;
      },
    },
    hospitalName: {
      type: String,
      required: function () {
        if (this.role === "hospital") return true;
        else return false;
      },
    },
    email: {
      type: String,
      required: [true, "Email is required..."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required..."],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address is required..."],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required..."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userModel);
