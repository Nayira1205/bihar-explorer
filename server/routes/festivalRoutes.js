const express = require("express");
const {
  getFestivals,
  getFestivalBySlug,
  createFestival,
  updateFestival,
  deleteFestival,
} = require("../controllers/festivalController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getFestivals).post(protect, adminOnly, createFestival);
router
  .route("/:slug")
  .get(getFestivalBySlug)
  .put(protect, adminOnly, updateFestival)
  .delete(protect, adminOnly, deleteFestival);

module.exports = router;
