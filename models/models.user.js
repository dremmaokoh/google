const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    googleId: { type: String },
    thumbnail: { type: String },
  },
  { collection: "user_info", timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
