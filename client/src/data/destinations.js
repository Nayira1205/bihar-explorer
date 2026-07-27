// Category and district lists power the filter UI. They mirror the
// `category` enum and `district` values used in the backend Destination
// model (server/models/Destination.js) — the actual destination records
// now come from the API (see src/hooks/useDestinations.js), not from a
// static array here.
export const categories = ["Heritage", "Spiritual", "Nature", "Adventure", "Modern"];

export const districts = [
  "Patna",
  "Gaya",
  "Nalanda",
  "Rajgir",
  "Vaishali",
  "Bhagalpur",
  "West Champaran",
];
