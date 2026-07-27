function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const festivals = [
  {
    title: "Chhath Puja",
    badge: "Spiritual",
    image: "chhath.jpg",
    subtitle: "The Festival of Devotion",
    description:
      "One of Bihar's most revered festivals where devotees offer prayers to the setting and rising Sun along rivers and ponds.",
  },
  {
    title: "Sonepur Mela",
    badge: "Cultural Fair",
    image: "sonepur.jpeg",
    subtitle: "Asia's Historic Fair",
    description:
      "A centuries-old fair known for its rich traditions, handicrafts, folk performances and vibrant local culture.",
  },
  {
    title: "Jitiya",
    badge: "Tradition",
    image: "jitiya.jpg",
    subtitle: "Festival of Faith",
    description:
      "A traditional festival where mothers observe a fast for the well-being and long life of their children.",
  },
  {
    title: "Sama Chakeva",
    badge: "Folk Tradition",
    image: "sama-chakeva.jpg",
    subtitle: "Celebrating Sibling Bond",
    description:
      "A colourful festival of songs, rituals and handcrafted figurines symbolising love between brothers and sisters.",
  },
  {
    title: "Mansa Puja",
    badge: "Folklore",
    image: "Mansa_Puja.jpg",
    subtitle: "Ancient Beliefs",
    description:
      "Dedicated to Goddess Manasa, this traditional celebration reflects Bihar's rich mythology and folk heritage.",
  },
].map((f) => ({ ...f, slug: slugify(f.title) }));

module.exports = festivals;
