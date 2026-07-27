const express = require("express");
const {
  getDestinations,
  getDestinationBySlug,
  createDestination,
  updateDestination,
  deleteDestination,
} = require("../controllers/destinationController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getDestinations).post(protect, adminOnly, createDestination);
router
  .route("/:slug")
  .get(getDestinationBySlug)
  .put(protect, adminOnly, updateDestination)
  .delete(protect, adminOnly, deleteDestination);

module.exports = router;
