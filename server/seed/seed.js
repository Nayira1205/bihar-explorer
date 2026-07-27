require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");

const Destination = require("../models/Destination");
const Food = require("../models/Food");
const Festival = require("../models/Festival");
const User = require("../models/User");

const destinations = require("./data/destinations");
const foods = require("./data/foods");
const festivals = require("./data/festivals");

async function seedAdminUser() {
  const email = (process.env.ADMIN_EMAIL || "admin@biharexplorer.local").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123";

  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`Admin account already exists: ${email}`);
    return;
  }

  await User.create({ name: "Bihar Explorer Admin", email, password, role: "admin" });
  console.log(`Admin account created — email: ${email} / password: ${password}`);
  console.log("Change ADMIN_EMAIL / ADMIN_PASSWORD in .env before this goes anywhere public.");
}

async function run() {
  await connectDB();

  const destroy = process.argv.includes("--destroy");

  if (destroy) {
    await Destination.deleteMany();
    await Food.deleteMany();
    await Festival.deleteMany();
    console.log("All destinations, foods, and festivals removed.");
    return mongoose.connection.close();
  }

  await Destination.deleteMany();
  await Food.deleteMany();
  await Festival.deleteMany();

  await Destination.insertMany(destinations);
  await Food.insertMany(foods);
  await Festival.insertMany(festivals);

  console.log(
    `Seeded ${destinations.length} destinations, ${foods.length} foods, ${festivals.length} festivals.`
  );

  await seedAdminUser();

  await mongoose.connection.close();
}

run().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
