const Activity = require("../models/Activity");
const logActivity = async (req, res, next) => {
  try {
    console.log("🔥 HIT logActivity");
    console.log("BODY:", JSON.stringify(req.body, null, 2));

    const body = req.body;
    if (body.data && Array.isArray(body.data)) {
      const { sessionStart, sessionEnd, sessionId } = body;

      const records = body.data.map((d) => ({
        user: req.user._id,
        sessionId,
        category: d.category || "focus",
        technique: d.technique,
        duration: d.duration,

        startedAt: new Date(sessionStart),
        endedAt: new Date(sessionEnd),

        rating: d.rating,
        moodBefore: d.moodBefore,
        moodAfter: d.moodAfter,

        milestones: d.milestones || [],
        viewedPosts: d.viewedPosts || [],
        source: d.source || "client_batch",
      }));

      await Activity.insertMany(records);

      return res.status(201).json({
        message: "Batch logged",
        sessionId,
        count: records.length,
      });
    }

    const {
      sessionId,
      category,
      duration,
      technique,
      rating,
      moodBefore,
      moodAfter,
      milestones,
      viewedPosts
    } = body;

    if (!duration || duration < 1) {
      return res.status(400).json({ message: "Invalid duration" });
    }
    const activity = await Activity.create({
      user: req.user._id,
      sessionId,
      category: category || "focus",
      startedAt: new Date(Date.now()),
      endedAt: new Date(Date.now() + duration * 1000),
      duration,
      technique,
      rating,
      moodBefore,
      moodAfter,
      milestones: milestones || [],
      viewedPosts: viewedPosts || []
    });

    res.status(201).json(activity);
  } catch (err) {
    next(err);
  }
};

const getActivities = async (req, res, next) => {
  try {
    const { category, limit = 50,page=1 } = req.query;
    const lim = Math.min(parseInt(liimit)||50,80);
    const skipper = (page-1)*lim;
    const query = { user: req.user._id };

    if (category) {
      query.category = category;
    }

    const data = await Activity.find(query)
      .sort({ startedAt: -1 })
      .skip(skipper)
      .limit(lim);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getSummary = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const data = await Activity.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: {
            category: "$category",
            technique: "$technique"
          },
          totalTime: { $sum: "$duration" },
          sessions: { $sum: 1 },
          postsViewed: {
            $sum: { $size: { $ifNull: ["$viewedPosts", []] } }
          }
        }
      }
    ]);
    const result = {
      categories: {},
      totals: {
        focusTime: 0,
        studyTime: 0,
        feedTime: 0,
        totalPostsViewed: 0
      }
    };
    for (const row of data) {
      const { category, technique } = row._id;
      if (!result.categories[category]) {
      result.categories[category] = {
        totalTime: 0,
        sessions: 0,
        postsViewed: 0,
        techniques: {}
        };
      } 
      const cat=result.categories[category];
      cat.totalTime += row.totalTime;
      cat.sessions += row.sessions;
      cat.postsViewed += row.postsViewed;
      result.totals.totalPostsViewed += row.postsViewed;
      if (category === "focus") result.totals.focusTime += row.totalTime;
      if (category === "study") result.totals.studyTime += row.totalTime;
      if (category === "feed") result.totals.feedTime += row.totalTime;
      if (technique) {
        if (!cat.techniques[technique]) {
          cat.techniques[technique] = {
            time: 0,
            sessions: 0
          };
        }

        cat.techniques[technique].time += row.totalTime;
        cat.techniques[technique].sessions += row.sessions;
      }
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getTimeseries = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const data = await Activity.aggregate([
      { $match: { user: userId } },

      {
        $group: {
          _id: {
            $dateToString: {format: "%Y-%m-%d",date: "$startedAt",},
          },
          time: { $sum: "$duration" },
        },
      },

      { $sort: { _id: 1 } },
    ]);

    res.json(
      data.map((d) => ({
        date: d._id,
        time: d.time,
      }))
    );
  } catch (err) {
    next(err);
  }
};

const getBreakdown = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const data = await Activity.aggregate([
      { $match: { user: userId } },

      {
        $group: {
          _id: "$category",
          value: { $sum: "$duration" },
          sessions:{$sum:1}
        },
        
      },{$sort:{value:-1}}
    ]);

    res.json(
      data.map((d) => ({
        name: d._id,
        value: d.value,
        sessions: d.sessions
      }))
    );
  } catch (err) {
    next(err);
  }
};
const flushActivity = async (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ message: "sessionId required" });
  }
  const result = await Activity.updateMany(
    { user: req.user._id, sessionId },
    { $set: { endedAt: new Date() } }
  );
  if (result.modifiedCount === 0) {
    return res.status(404).json({ message: "No active session found" });
  }
  res.json({ success: true,modified:result.modifiedCount });
};
module.exports = {logActivity, getActivities, getSummary, getTimeseries, getBreakdown, flushActivity};