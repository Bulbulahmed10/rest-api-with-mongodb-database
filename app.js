const express = require("express");
const cors = require("cors");
require("./config/db");
const app = express();
const userRouter = require("./routes/user.route");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//! user route

app.use("/api/users", userRouter);

//! home route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/./views/index.html");
});

//! route error
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});

//! server error
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "something broke",
  });
});

module.exports = app;
