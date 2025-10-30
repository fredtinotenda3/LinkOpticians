import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Create branches
  const branches = await prisma.branch.createMany({
    data: [
      {
        name: "Robinson House",
        address: "15 & 16 Robinson House, Cnr Angwa & K.Nkrumah, Harare",
        phone: "+263242757558",
        email: "robinson@linkopticians.co.zw",
        operatingHours: "Mon-Fri: 08:00-17:00, Sat: 08:00-13:00",
      },
      {
        name: "Construction House",
        address:
          "Construction House 1st Floor, 110 Leopold Takawira St, Harare",
        phone: "+263242770732",
        email: "construction@linkopticians.co.zw",
        operatingHours: "Mon-Fri: 08:00-17:00, Sat: 08:00-13:00",
      },
      {
        name: "Greendale",
        address: "16 Greendale Ave, Greendale, Harare",
        phone: "+263242481690",
        email: "greendale@linkopticians.co.zw",
        operatingHours: "Mon-Fri: 08:00-17:00, Sat: 08:00-13:00",
      },
      {
        name: "Chiredzi",
        address: "361 Mopani Drive, Chiredzi",
        phone: "+263312312615",
        email: "chiredzi@linkopticians.co.zw",
        operatingHours: "Mon-Fri: 08:00-17:00, Sat: 08:00-13:00",
      },
      {
        name: "Chipinge",
        address: "98 Moodie Street, Chipinge",
        phone: "+263272045605",
        email: "chipinge@linkopticians.co.zw",
        operatingHours: "Mon-Fri: 08:00-17:00, Sat: 08:00-13:00",
      },
    ],
    skipDuplicates: true,
  });

  // Create services
  const services = await prisma.service.createMany({
    data: [
      {
        name: "Eye Examination",
        description: "Comprehensive eye health and vision assessment",
        duration: 30,
        price: 50.0,
      },
      {
        name: "Contact Lens Fitting",
        description: "Professional contact lens fitting and training",
        duration: 45,
        price: 35.0,
      },
      {
        name: "Spectacles Dispensing",
        description: "Eyeglass fitting and prescription services",
        duration: 20,
        price: 25.0,
      },
      {
        name: "Low Vision Services",
        description: "Specialized services for low vision patients",
        duration: 60,
        price: 75.0,
      },
      {
        name: "Repairs & Adjustments",
        description: "Eyewear repairs and frame adjustments",
        duration: 15,
        price: 15.0,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Database seeded successfully!");
  console.log(`Created ${branches.count} branches`);
  console.log(`Created ${services.count} services`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
