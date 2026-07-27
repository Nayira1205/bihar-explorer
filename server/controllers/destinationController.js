const Destination = require("../models/Destination");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

// GET /api/destinations
// Query params: category, district, search, sort (name | district | featured)
const getDestinations = asyncHandler(async (req, res) => {
  const { category, district, search, sort } = req.query;

  const filter = {};
  if (category && category !== "All") filter.category = category;
  if (district && district !== "All districts") filter.district = district;
  if (search) filter.$text = { $search: search };

  let query = Destination.find(filter);

  if (sort === "name") query = query.sort({ name: 1 });
  else if (sort === "district") query = query.sort({ district: 1 });
  else query = query.sort({ featured: -1, createdAt: -1 });

  const destinations = await query;
  res.json({ success: true, count: destinations.length, data: destinations });
});

// GET /api/destinations/:slug
const getDestinationBySlug = asyncHandler(async (req, res) => {
  const destination = await Destination.findOne({ slug: req.params.slug });
  if (!destination) throw new ApiError(404, "Destination not found");
  res.json({ success: true, data: destination });
});

// POST /api/destinations
const createDestination = asyncHandler(async (req, res) => {
  const destination = await Destination.create(req.body);
  res.status(201).json({ success: true, data: destination });
});

// PUT /api/destinations/:slug
const updateDestination = asyncHandler(async (req, res) => {
  const destination = await Destination.findOneAndUpdate({ slug: req.params.slug }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!destination) throw new ApiError(404, "Destination not found");
  res.json({ success: true, data: destination });
});

// DELETE /api/destinations/:slug
const deleteDestination = asyncHandler(async (req, res) => {
  const destination = await Destination.findOneAndDelete({ slug: req.params.slug });
  if (!destination) throw new ApiError(404, "Destination not found");
  res.json({ success: true, data: {} });
});

module.exports = {
  getDestinations,
  getDestinationBySlug,
  createDestination,
  updateDestination,
  deleteDestination,
};
