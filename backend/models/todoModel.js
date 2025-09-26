const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const todoSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    mediaUri: String,
    mediaType: {
      type: String,
      enum: ["image", "video", null],
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = model("Todo", todoSchema);
