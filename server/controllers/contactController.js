const Contact = require("../models/Contact");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

// POST /api/contact
const submitContact = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    throw new ApiError(400, "Name, email, and message are all required");
  }

  const contact = await Contact.create({ name, email, message });
  res.status(201).json({
    success: true,
    message: "Thanks for reaching out — we'll get back to you soon.",
    data: contact,
  });
});

// GET /api/contact  (intended for an admin-only view once auth lands)
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json({ success: true, count: contacts.length, data: contacts });
});

module.exports = { submitContact, getContacts };
