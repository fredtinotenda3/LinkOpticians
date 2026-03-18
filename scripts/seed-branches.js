import * as sdk from "node-appwrite";
import * as dotenv from "dotenv";

dotenv.config();

/* -----------------------------
   Appwrite Client Setup
-------------------------------- */
const client = new sdk.Client()
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
  .setProject(process.env.PROJECT_ID)
  .setKey(process.env.API_KEY);

const databases = new sdk.Databases(client);

/* -----------------------------
   Environment Validation
-------------------------------- */
const DATABASE_ID = process.env.DATABASE_ID;
const BRANCHES_COLLECTION_ID = process.env.BRANCHES_COLLECTION_ID;

if (!DATABASE_ID || !BRANCHES_COLLECTION_ID) {
  console.error("❌ Missing DATABASE_ID or BRANCHES_COLLECTION_ID");
  process.exit(1);
}

/* -----------------------------
   Seed Data - FIXED: doctors should be arrays
-------------------------------- */
const branches = [
  {
    name: "Link Opticians - Downtown",
    address: "123 Main Street, Downtown",
    phone: "+1234567890",
    email: "downtown@linkopticians.com",
    operatingHours: "9am-6pm, Sat 10am-4pm",
    service: [
      "Eye Tests",
      "Glasses",
      "Contact Lenses",
      "Children's Eye Care"
    ],
    doctors: ["Dr. Sarah Johnson"], // Changed to array
    isActive: true
  },
  {
    name: "Link Opticians - Westgate",
    address: "456 West Avenue, Westgate",
    phone: "+1234567891",
    email: "westgate@linkopticians.com",
    operatingHours: "9am-6pm, Sat 10am-4pm",
    service: ["Eye Tests", "Glasses", "Contact Lenses"],
    doctors: ["Dr. Emily Wilson"], // Changed to array
    isActive: true
  },
  {
    name: "Link Opticians - Eastgate",
    address: "789 East Boulevard, Eastgate",
    phone: "+1234567892",
    email: "eastgate@linkopticians.com",
    operatingHours: "9am-6pm, Sat 10am-4pm",
    service: [
      "Eye Tests",
      "Glasses",
      "Contact Lenses",
      "Emergency Eye Care"
    ],
    doctors: ["Dr. Robert Kim"], // Changed to array
    isActive: true
  },
  {
    name: "Link Opticians - Northgate",
    address: "101 North Road, Northgate",
    phone: "+1234567893",
    email: "northgate@linkopticians.com",
    operatingHours: "9am-6pm, Sat 10am-4pm",
    service: [
      "Eye Tests",
      "Glasses",
      "Contact Lenses",
      "Senior Eye Care"
    ],
    doctors: ["Dr. James Miller"], // Changed to array
    isActive: true
  },
  {
    name: "Link Opticians - Southgate",
    address: "202 South Lane, Southgate",
    phone: "+1234567894",
    email: "southgate@linkopticians.com",
    operatingHours: "9am-6pm, Sat 10am-4pm",
    service: [
      "Eye Tests",
      "Glasses",
      "Contact Lenses",
      "Sports Vision"
    ],
    doctors: ["Dr. Maria Garcia"], // Changed to array
    isActive: true
  }
];

/* -----------------------------
   Seed Function
-------------------------------- */
async function seedBranches() {
  console.log("🌱 Seeding branches...\n");

  try {
    for (const branch of branches) {
      await databases.createDocument(
        DATABASE_ID,
        BRANCHES_COLLECTION_ID,
        sdk.ID.unique(),
        branch
      );

      console.log(`✅ Created branch: ${branch.name}`);
    }

    console.log("\n🎉 Branch seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error seeding branches:\n");

    if (error.response) {
      console.error(JSON.stringify(error.response, null, 2));
    } else {
      console.error(error);
    }

    process.exit(1);
  }
}

/* -----------------------------
   Execute
-------------------------------- */
seedBranches();