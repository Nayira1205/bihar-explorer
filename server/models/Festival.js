const mongoose = require("mongoose");

const festivalSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    badge: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    description: { type: String, required: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Festival", festivalSchema);
