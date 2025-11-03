const { Client } = require("pg");

async function testConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log("✅ Database connected successfully");
    await client.end();
  } catch (err) {
    console.log("❌ Database connection failed:", err.message);
  }
}

testConnection();
