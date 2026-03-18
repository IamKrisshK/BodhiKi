const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const postSchema = new mongoose.Schema(
    {
        author: {
            type: ObjectId,
            ref: "Users",
            required: true
        },

        title:{
            type: String,
            required:true
        },

        content:{
            type: String
        },

        mediaUrl:{
            type: String
        },

        category:{
            type: String,
            index: true
        },

        tags:[{
            type: String
        }],
        
        likes:{
            type: Number,
            default: 0
        },

        comments:{
            type: Number,
            default:0
        }
    },
    {timestamps:true}
);
module.exports = mongoose.model("Posts", postSchema);