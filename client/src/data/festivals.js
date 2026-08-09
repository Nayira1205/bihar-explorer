// Festival data comes from the API (see server/models/Festival.js).
import { createContentStore } from "./createContentStore";
import { resolveFestivalImage } from "../utils/festivalImages";

const store = createContentStore("/festivals");
export const fetchFestivals = store.fetchAll;
export const getFestivalBySlug = store.getBySlug;
export const getFestivals = () =>
  store.getAll().map((f) => ({ ...f, resolvedImage: resolveFestivalImage(f.image) }));
