const express = require("express");
const colors = require("colors");

const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/ErrorMiddleware");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/goals", require("./Routes/GoalRoutes"));
app.use("/api/users", require("./Routes/UserRoutes"));

app.use(errorHandler);
app.listen(port, () =>
  console.log(`server started on the port http://localhost:${port}`)
);
