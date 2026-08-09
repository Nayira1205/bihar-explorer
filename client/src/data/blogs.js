// NOTE: there is currently no backend route for blogs (no /api/blogs
// endpoint, no Blog model). fetchBlogs() will resolve to an empty list
// until that's built — see the project merge report for details. Wiring
// it up now so pages compile and degrade gracefully rather than crash.
import { createContentStore } from "./createContentStore";

const store = createContentStore("/blogs");
export const fetchBlogs = store.fetchAll;
export const getBlogs = store.getAll;
export const getBlogBySlug = store.getBySlug;

export const blogCategories = [
  "All",
  "Heritage",
  "Festivals",
  "Food",
  "Spiritual",
  "Travel Tips",
  "Culture",
];
