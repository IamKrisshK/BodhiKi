const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const commentSchema = new mongoose.Schema(
    {
        author:{
            type:ObjectId,
            ref:"Users",
            required:true,

        },
        post:{
            type:ObjectId,
            ref:"Posts",
            required:true
        },
        body:{
            type:String,
            required:true
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Comments",commentSchema);