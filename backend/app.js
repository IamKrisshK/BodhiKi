const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./mare/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);
app.use(errorHandler);

module.exports = app;
