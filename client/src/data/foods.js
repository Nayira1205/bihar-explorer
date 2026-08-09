// Category list powers the filter tabs. Actual food items come from the
// API (see server/models/Food.js).
import { createContentStore } from "./createContentStore";
import { resolveFoodImage } from "../utils/foodImages";

const store = createContentStore("/foods");
export const fetchFoods = store.fetchAll;
export const getFoodBySlug = store.getBySlug;
export const getFoods = () =>
  store.getAll().map((f) => ({ ...f, id: f.slug, resolvedImage: resolveFoodImage(f.image) }));

export const foodCategories = [
  "Regional Cuisine",
  "Street Food",
  "Festival Food",
  "Desserts",
];
