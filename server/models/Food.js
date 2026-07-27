const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["Regional Cuisine", "Street Food", "Festival Food", "Desserts"],
      index: true,
    },
    tag: { type: String, default: "" },
    image: { type: String, default: "" },
    description: { type: String, required: true },
    whereToEat: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
