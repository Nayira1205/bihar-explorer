// NOTE: there is currently no backend route for gallery (no /api/gallery
// endpoint, no Gallery model). fetchGallery() will resolve to an empty
// list until that's built — see the project merge report for details.
// Wiring it up now so pages compile and degrade gracefully rather than
// crash.
import { createContentStore } from "./createContentStore";

const store = createContentStore("/gallery");
export const fetchGallery = store.fetchAll;
export const getGallery = store.getAll;

export const galleryCategories = [
  "All",
  "Heritage",
  "Spiritual",
  "Nature",
  "Festivals",
  "Food",
  "Modern",
];
