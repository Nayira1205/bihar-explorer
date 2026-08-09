// NOTE: there is currently no backend route for experiences
// (no /api/experiences endpoint, no Experience model). fetchExperiences()
// will resolve to an empty list until that's built — see the project
// merge report for details. Wiring it up now so pages compile and degrade
// gracefully rather than crash.
import { createContentStore } from "./createContentStore";

const store = createContentStore("/experiences");
export const fetchExperiences = store.fetchAll;
export const getExperiences = store.getAll;
export const getExperienceBySlug = store.getBySlug;

export const experienceCategories = [
  "All",
  "Spiritual",
  "Heritage",
  "Wildlife",
  "Adventure",
  "Cultural",
];
