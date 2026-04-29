import api from "./apiClient";

class ActivityService {
  constructor() {
    this._reset();
  }

  _reset() {
    this.sessionId = null;
    this.startTime = null;
    this.config = null;         // { category, technique, source, milestones, moodBefore }
    this.viewedPosts = [];      // [{ post_id, viewed_at }]
    this.moodAfter = null;
    this.rating = null;
    this._active = false;
  }

  /**
   * Start a new session. Stops any existing one first.
   *
   * config = {
   *   category:   "focus" | "study" | "feed"
   *   technique:  one of the enum values in your schema
   *   source:     optional — preset name for focus (e.g. "quick-reset")
   *   milestones: optional array [{ label, difficulty }]
   *   moodBefore: optional string emoji
   * }
   */
  start(config) {
    if (this._active) this._forceStop();

    this.sessionId  = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.startTime  = Date.now();
    this.config     = config;
    this.viewedPosts = [];
    this.moodAfter  = null;
    this.rating     = null;
    this._active    = true;
  }

  /** Call when a post enters the viewport */
  trackPost(postId) {
    if (!this._active) return;
    // Deduplicate — only track first view
    if (this.viewedPosts.some(p => String(p.post_id) === String(postId))) return;
    this.viewedPosts.push({ post_id: postId, viewed_at: new Date().toISOString() });
  }

  /** Call when user selects a mood/rating after the session */
  setMoodAfter(emoji) { this.moodAfter = emoji; }
  setRating(value)    { this.rating = value; }   // 1–5 or index mapped outside

  /**
   * Stop session and POST one document.
   * Returns the payload sent (useful for debug / optimistic UI).
   */
  async stop() {
    if (!this._active) return null;

    const endTime = Date.now();
    const durationSeconds = Math.floor((endTime - this.startTime) / 1000);

    if (durationSeconds < 1) {
      this._reset();
      return null;
    }

    const { category, technique, source, milestones, moodBefore } = this.config;

    const payload = {
      sessionId:  this.sessionId,
      category,
      technique,
      startedAt:  new Date(this.startTime).toISOString(),
      endedAt:    new Date(endTime).toISOString(),
      duration:   durationSeconds,
      ...(source       && { source }),
      ...(moodBefore   && { moodBefore }),
      ...(this.moodAfter && { moodAfter: this.moodAfter }),
      ...(this.rating  != null && { rating: this.rating }),
      ...(milestones?.length   && { milestones }),
      ...(this.viewedPosts.length && { viewedPosts: this.viewedPosts }),
    };

    this._reset();

    try {
      await api.post("/api/activity", payload);
    } catch (err) {
      console.error("[ActivityService] send failed:", err);
    }

    return payload;
  }

  _forceStop() {
    this._reset();
  }
}

export const activityService = new ActivityService();