const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//define collection schema
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    mobileNumber: {
      type: Number,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
