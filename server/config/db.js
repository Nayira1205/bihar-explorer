// Forces TLS 1.2 for all connections this process makes. Works around an
// intermittent handshake failure ("SSL alert number 80") seen with newer
// Node/OpenSSL builds talking to MongoDB Atlas — confirmed fix during
// local setup, see server/README.md for more on this.
const tls = require("tls");
tls.DEFAULT_MAX_VERSION = "TLSv1.2";

const mongoose = require("mongoose");

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function connectDB(retries = 5, delayMs = 3000) {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("MONGODB_URI is not set. Add it to your .env file (see .env.example).");
    process.exit(1);
  }

  mongoose.set("strictQuery", true);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 8000,
        family: 4,
      });
      console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt ${attempt}/${retries} failed: ${err.message}`);
      if (attempt === retries) {
        console.error("All connection attempts failed. Exiting.");
        process.exit(1);
      }
      console.log(`Retrying in ${delayMs / 1000}s...`);
      await wait(delayMs);
    }
  }
}

module.exports = connectDB;
