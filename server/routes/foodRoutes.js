const express = require("express");
const {
  getFoods,
  getFoodBySlug,
  createFood,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getFoods).post(protect, adminOnly, createFood);
router
  .route("/:slug")
  .get(getFoodBySlug)
  .put(protect, adminOnly, updateFood)
  .delete(protect, adminOnly, deleteFood);

module.exports = router;
