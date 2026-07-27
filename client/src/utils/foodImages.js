import litti from "../assets/images/food/litti.jpg";
import khaja from "../assets/images/food/khaja.png";
import thekua from "../assets/images/food/thekua.jpg";
import malpua from "../assets/images/food/malpua.webp";
import dalPithi from "../assets/images/food/dal-pithi.jpg";
import champaranMutton from "../assets/images/food/champaran-mutton.jpg";

// Keys match the `image` filenames stored in the Food model
// (server/models/Food.js) and seeded from server/seed/data/foods.js.
const foodImageMap = {
  "litti.jpg": litti,
  "khaja.png": khaja,
  "thekua.jpg": thekua,
  "malpua.webp": malpua,
  "dal-pithi.jpg": dalPithi,
  "champaran-mutton.jpg": champaranMutton,
};

export function resolveFoodImage(filename) {
  return foodImageMap[filename] || litti;
}
