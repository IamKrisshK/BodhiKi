const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const likeSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: "Users",
            required: true
        },
        post: {
            type: ObjectId,
            ref: "Posts",
            required: true
        }
    },
    {timestamps:true}
);
likeSchema.index({user:1,post:1},{unique:true});
module.exports = mongoose.model("Likes", likeSchema);