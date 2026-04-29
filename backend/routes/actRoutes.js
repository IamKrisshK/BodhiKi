const express = require("express");
const router = express.Router();
const { protect } = require("../mare/authMare");
const { logActivity, getActivities, getSummary, getTimeseries, getBreakdown, flushActivity } = require("../ctrl/actCtrl");

router.post("/api/activity/", protect, logActivity);
router.get("/api/activity/", protect, getActivities);
router.get("/api/activity/summary", protect, getSummary);
router.get("/api/activity/timeseries", protect, getTimeseries);
router.get("/api/activity/breakdown", protect, getBreakdown);
router.post("/api/activity/flush",protect,flushActivity);
module.exports = router;