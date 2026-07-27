const Food = require("../models/Food");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

// GET /api/foods?category=Regional+Cuisine
const getFoods = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = {};
  if (category) filter.category = category;

  const foods = await Food.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: foods.length, data: foods });
});

// GET /api/foods/:slug
const getFoodBySlug = asyncHandler(async (req, res) => {
  const food = await Food.findOne({ slug: req.params.slug });
  if (!food) throw new ApiError(404, "Food item not found");
  res.json({ success: true, data: food });
});

const createFood = asyncHandler(async (req, res) => {
  const food = await Food.create(req.body);
  res.status(201).json({ success: true, data: food });
});

const updateFood = asyncHandler(async (req, res) => {
  const food = await Food.findOneAndUpdate({ slug: req.params.slug }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!food) throw new ApiError(404, "Food item not found");
  res.json({ success: true, data: food });
});

const deleteFood = asyncHandler(async (req, res) => {
  const food = await Food.findOneAndDelete({ slug: req.params.slug });
  if (!food) throw new ApiError(404, "Food item not found");
  res.json({ success: true, data: {} });
});

module.exports = { getFoods, getFoodBySlug, createFood, updateFood, deleteFood };
