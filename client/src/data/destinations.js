// Category and district lists power the filter UI. They mirror the
// `category` enum and `district` values used in the backend Destination
// model (server/models/Destination.js).
import { createContentStore } from "./createContentStore";
import { resolveDestinationImages } from "../utils/destinationImages";

const store = createContentStore("/destinations");
export const fetchDestinations = store.fetchAll;
export const getDestinationBySlug = (slug) => {
  const d = store.getBySlug(slug);
  return d ? { ...d, id: d.slug, images: resolveDestinationImages(d.images) } : undefined;
};
export const getDestinations = () =>
  store.getAll().map((d) => ({ ...d, id: d.slug, images: resolveDestinationImages(d.images) }));

export const categories = ["Heritage", "Spiritual", "Nature", "Adventure", "Modern"];

export const districts = [
  "Patna",
  "Gaya",
  "Nalanda",
  "Rajgir",
  "Vaishali",
  "Bhagalpur",
  "West Champaran",
  "Buxar",
  "Munger",
  "Rohtas",
  "Kaimur",
  "Begusarai",
  "Darbhanga",
  "Saran",
  "Nawada",
  "Jehanabad",
  "East Champaran",
];