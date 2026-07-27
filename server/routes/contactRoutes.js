const express = require("express");
const { submitContact, getContacts } = require("../controllers/contactController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(submitContact).get(protect, adminOnly, getContacts);

module.exports = router;
