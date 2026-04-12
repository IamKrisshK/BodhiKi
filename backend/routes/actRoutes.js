const express = require("express");
const router = express.Router();
const {protect} = require("../mare/authMare");
const { logActivity, getActivities } = require("../ctrl/actCtrl");

router.post("/activity", protect, logActivity);
router.get("/activity", protect, getActivities);
module.exports = router;