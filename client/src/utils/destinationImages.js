import nalanda from "../assets/images/hero/Nalanda.jpg";
import mahabodhiHero from "../assets/images/hero/mahabodhi-temple.jpg";
import golghar from "../assets/images/hero/golghar.jpg";
import gurudawara from "../assets/images/hero/Gurudawara.jpg";
import shantiStupaRajgir from "../assets/images/hero/Shanti_Stupa,_Rajgir.jpg";

import mahabodhiBodhgaya from "../assets/images/destinations/Mahabodhi_Bodhgaya.jpg";
import bodhGayaTaiTemple from "../assets/images/destinations/Bodh_Gaya_tai_temple.jpg";
import vietnamTempleBodhGaya from "../assets/images/destinations/Vietnam_Temple_in_Bodh_Gaya.jpeg";
import rajgir from "../assets/images/destinations/Rajgir.webp";
import sonBhandarCaves from "../assets/images/destinations/Son_Bhandar_caves,_Rajgir,_Bihar_01.jpg";
import valmiki from "../assets/images/destinations/valmiki.jpeg";
import patna from "../assets/images/destinations/patna.jpg";
import sabhyataDwarPatna from "../assets/images/destinations/Sabhyata_dwar_Patna.jpg";

// Keys must match the `images` filenames stored in the Destination model
// (server/models/Destination.js) and seeded from server/seed/data/destinations.js.
const destinationImageMap = {
  "Nalanda.jpg": nalanda,
  "mahabodhi-temple.jpg": mahabodhiHero,
  "golghar.jpg": golghar,
  "Gurudawara.jpg": gurudawara,
  "Shanti_Stupa,_Rajgir.jpg": shantiStupaRajgir,
  "Mahabodhi_Bodhgaya.jpg": mahabodhiBodhgaya,
  "Bodh_Gaya_tai_temple.jpg": bodhGayaTaiTemple,
  "Vietnam_Temple_in_Bodh_Gaya.jpeg": vietnamTempleBodhGaya,
  "Rajgir.webp": rajgir,
  "Son_Bhandar_caves,_Rajgir,_Bihar_01.jpg": sonBhandarCaves,
  "valmiki.jpeg": valmiki,
  "patna.jpg": patna,
  "Sabhyata_dwar_Patna.jpg": sabhyataDwarPatna,
};

// Falls back to the hero Golghar shot if a filename from the API doesn't
// have a matching local asset yet, rather than rendering a broken image.
export function resolveDestinationImage(filename) {
  return destinationImageMap[filename] || golghar;
}

export function resolveDestinationImages(filenames = []) {
  return filenames.map(resolveDestinationImage);
}
