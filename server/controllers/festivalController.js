const Festival = require("../models/Festival");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const getFestivals = asyncHandler(async (req, res) => {
  const festivals = await Festival.find().sort({ createdAt: 1 });
  res.json({ success: true, count: festivals.length, data: festivals });
});

const getFestivalBySlug = asyncHandler(async (req, res) => {
  const festival = await Festival.findOne({ slug: req.params.slug });
  if (!festival) throw new ApiError(404, "Festival not found");
  res.json({ success: true, data: festival });
});

const createFestival = asyncHandler(async (req, res) => {
  const festival = await Festival.create(req.body);
  res.status(201).json({ success: true, data: festival });
});

const updateFestival = asyncHandler(async (req, res) => {
  const festival = await Festival.findOneAndUpdate({ slug: req.params.slug }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!festival) throw new ApiError(404, "Festival not found");
  res.json({ success: true, data: festival });
});

const deleteFestival = asyncHandler(async (req, res) => {
  const festival = await Festival.findOneAndDelete({ slug: req.params.slug });
  if (!festival) throw new ApiError(404, "Festival not found");
  res.json({ success: true, data: {} });
});

module.exports = {
  getFestivals,
  getFestivalBySlug,
  createFestival,
  updateFestival,
  deleteFestival,
};
