const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./configs/db");

dotenv.config();

// database connection
connectDB();

//port
const PORT = process.env.PORT || 5000;

// rest objext
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
// test
app.use("/api/v1/test/", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoute"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));

// listen
app.listen(PORT, () => {
  console.log(
    `Server is up in ${process.env.DEV_MODE} mode and running at ${PORT} port`
      .bgBlue.white
  );
});
