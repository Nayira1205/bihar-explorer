const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
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
    district: { type: String, required: true, index: true },
    category: {
      type: String,
      required: true,
      enum: ["Heritage", "Spiritual", "Nature", "Adventure", "Modern"],
      index: true,
    },
    entryFee: { type: String, default: "Free" },
    openingHours: { type: String, default: "" },
    bestSeason: { type: String, default: "" },
    shortDesc: { type: String, required: true },
    longDesc: { type: String, required: true },
    // Image field stores a filename/key (e.g. "nalanda-1.jpg") or a full
    // CDN URL, not a binary — actual files are served from /public or a
    // provider like Cloudinary. See server/README.md for the image strategy.
    images: { type: [String], default: [] },
    nearby: { type: [String], default: [] },
    tips: { type: [String], default: [] },
    featured: { type: Boolean, default: true },
  },
  { timestamps: true }
);

destinationSchema.index({ name: "text", shortDesc: "text", district: "text" });

module.exports = mongoose.model("Destination", destinationSchema);
