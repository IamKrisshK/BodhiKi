const Activity = require("../models/Activity");

const logActivity = async (req, res, next) => {
  try {
    const { duration, technique, milestones, type } = req.body;

    const activity = await Activity.create({
      user: req.user._id,
      duration,
      technique,
      milestones,
      type,
    });

    res.status(201).json(activity);
  } catch (err) {
    next(err);
  }
};

const getActivities = async (req, res, next) => {
  try {
    const data = await Activity.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = { logActivity, getActivities };