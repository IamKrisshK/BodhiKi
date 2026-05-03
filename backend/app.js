const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const actRoutes = require("./routes/actRoutes");
const discoverRoutes = require("./routes/discoverRoutes");
const errorHandler = require("./mare/errorHandler");

const app = express();
app.options("*", cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://bodhi-ki.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);
app.use(actRoutes);
app.use(discoverRoutes);
app.use(errorHandler);

module.exports = app;
