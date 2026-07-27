const NewsletterSubscriber = require("../models/NewsletterSubscriber");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

// POST /api/newsletter
const subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new ApiError(400, "Email is required");

  const existing = await NewsletterSubscriber.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.json({ success: true, message: "You're already on the list." });
  }

  await NewsletterSubscriber.create({ email });
  res.status(201).json({ success: true, message: "You're on the list. Dhanyavad!" });
});

// DELETE /api/newsletter/:email
const unsubscribe = asyncHandler(async (req, res) => {
  await NewsletterSubscriber.findOneAndDelete({ email: req.params.email.toLowerCase() });
  res.json({ success: true, message: "You've been unsubscribed." });
});

// GET /api/newsletter (admin)
const getSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await NewsletterSubscriber.find().sort({ createdAt: -1 });
  res.json({ success: true, count: subscribers.length, data: subscribers });
});

module.exports = { subscribe, unsubscribe, getSubscribers };
