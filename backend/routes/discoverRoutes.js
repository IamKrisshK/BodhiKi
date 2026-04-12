const express = require("express");
const { discoverCtrl } = require("../ctrl/discoverCtrl");

const router = express.Router();

router.get("/api/discover", discoverCtrl);

module.exports= router;