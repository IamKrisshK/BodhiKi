const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    
    sessionId: {
      type: String,
      index: true,
    },
    category: {
      type: String,
      enum: ["focus", "study", "feed"],
      default: "feed",
      required: true
    },

    startedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    
    endedAt: {
      type: Date,
    },
    duration:{
      type:Number,
      min:1
    },
    technique: {
      type: String,
      enum: [
        "discovery","user-posts",
        "pomodoro", "deep-work", "hardcore", 
        "meditation", "breathing", "soundscape","reflection",
        "quick-reset","vipassana","peak-focus","deep-rest"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    moodBefore: String,
    moodAfter: String,

    milestones: [
      {
        label: String,
        difficulty:String,
        timestamp: Date,
      },
    ],

    viewedPosts: [{
      post_id:{type:mongoose.Schema.Types.ObjectId},
      viewed_at: {type:Date,default:Date.now}
    }],

    source:String, 

  },
  { timestamps: true }
);

activitySchema.index({ user: 1, startedAt: -1 });
activitySchema.index({ user: 1, sessionId: 1 });
module.exports = mongoose.model("Activity", activitySchema);