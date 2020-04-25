const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

//Define collection schema
const postSchema = new Schema(
  {
    post: {
      type: String,
      required: true
    },
    comments: [commentSchema],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const postModel = mongoose.model("Post", postSchema);

const commentModel = mongoose.model("comment", commentSchema);

module.exports = {
    Post:postModel,
    Comment: commentModel
}