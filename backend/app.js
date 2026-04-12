const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const actRoutes = require("./routes/actRoutes");
const discoverRoutes = require("./routes/discoverRoutes");
const errorHandler = require("./mare/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);
app.use(actRoutes);
app.use(discoverRoutes);
app.use(errorHandler);

module.exports = app;
