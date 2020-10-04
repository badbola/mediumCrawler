const mongoose = require("mongoose");

const searchSchema = mongoose.Schema({
  content: String,
  date: Date,
});

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    searchHistory: [searchSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
