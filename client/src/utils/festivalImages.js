import chhath from "../assets/images/festivals/chhath.jpg";
import sonepur from "../assets/images/festivals/sonepur.jpeg";
import jitiya from "../assets/images/festivals/jitiya.jpg";
import samaChakeva from "../assets/images/festivals/sama-chakeva.jpg";
import mansaPuja from "../assets/images/festivals/Mansa_Puja.jpg";

// Keys match the `image` filenames stored in the Festival model
// (server/models/Festival.js) and seeded from server/seed/data/festivals.js.
const festivalImageMap = {
  "chhath.jpg": chhath,
  "sonepur.jpeg": sonepur,
  "jitiya.jpg": jitiya,
  "sama-chakeva.jpg": samaChakeva,
  "Mansa_Puja.jpg": mansaPuja,
};

export function resolveFestivalImage(filename) {
  return festivalImageMap[filename] || chhath;
}
