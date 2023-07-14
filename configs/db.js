const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `Database is Connected successfully ${mongoose.connection.host}...`
        .bgMagenta.white
    );
  } catch (error) {
    console.log(`Error while connecting with database ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
