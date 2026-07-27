const express = require("express");
const {
  subscribe,
  unsubscribe,
  getSubscribers,
} = require("../controllers/newsletterController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(subscribe).get(protect, adminOnly, getSubscribers);
router.route("/:email").delete(protect, adminOnly, unsubscribe);

module.exports = router;
