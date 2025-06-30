import bcrypt from "bcryptjs";

async function run() {
  try {
    const hash = await bcrypt.hash("password123", 10);
    console.log("Generated hash:", hash);
  } catch (err) {
    console.error(err);
  }
}

run();
