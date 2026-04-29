const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const actRoutes = require("./routes/actRoutes");
const discoverRoutes = require("./routes/discoverRoutes");
const errorHandler = require("./mare/errorHandler");

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);
app.use(actRoutes);
app.use(discoverRoutes);
app.use(errorHandler);

module.exports = app;
