const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    role: {
      type: string,
      required: [true, "role is required..."],
      enu: ["admin", "user", "organization", "hospital"],
    },
    name: {
      type: string,
      required: () => {
        if (this.role === "user" || role === "admin") return true;
        else return false;
      },
    },
    organizationName: {
      type: string,
      required: () => {
        if (this.role === "organization") return true;
        else return false;
      },
    },
    hospitalName: {
      type: string,
      required: () => {
        if (this.role === "hospital") return true;
        else return false;
      },
    },
    email: {
      type: string,
      required: [true, "Email is required..."],
      unique: true,
    },
    password: {
      type: string,
      required: [true, "Password is required..."],
    },
    website: {
      type: string,
    },
    address: {
      type: string,
      required: [true, "Address is required..."],
    },
    phone: {
      type: string,
      required: [true, "Phone number is required..."],
    },
  },
  { timeStamp: true }
);

module.exports = mongoose.model("users", userModel);
