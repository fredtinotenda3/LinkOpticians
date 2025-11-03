===============================
 C:\Users\fredt\Desktop\LinkOpticians\prisma\schema.prisma
===============================
`$lang
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Branch {
  id          String   @id @default(cuid())
  name        String
  address     String
  phone       String
  email       String
  operatingHours String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  appointments Appointment[]
  opticians    Optician[]
  
  @@map("branches")
}

model Service {
  id          String   @id @default(cuid())
  name        String
  description String?
  duration    Int      // in minutes
  price       Float?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  appointments Appointment[]
  
  @@map("services")
}

model Optician {
  id          String   @id @default(cuid())
  name        String
  email       String
  phone       String
  specialty   String?  // e.g., "Eye Examinations", "Contact Lenses", etc.
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relationships
  branchId    String
  branch      Branch   @relation(fields: [branchId], references: [id], onDelete: Cascade)
  
  appointments Appointment[]
  
  @@map("opticians")
}

model Appointment {
  id          String   @id @default(cuid())
  patientName String
  phone       String   // Zimbabwe format: +263 XXX XXX XXX
  email       String?
  
  // Relationships
  serviceId   String
  service     Service  @relation(fields: [serviceId], references: [id], onDelete: Cascade)
  
  branchId    String
  branch      Branch   @relation(fields: [branchId], references: [id], onDelete: Cascade)
  
  opticianId  String?
  optician    Optician? @relation(fields: [opticianId], references: [id], onDelete: SetNull)
  
  // Appointment details
  scheduledAt DateTime
  status      AppointmentStatus @default(pending)
  notes       String?
  
  // Metadata
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("appointments")
}

enum AppointmentStatus {
  pending
  confirmed
  completed
  cancelled
  no_show
}
```

===============================
 C:\Users\fredt\Desktop\LinkOpticians\prisma\seed.ts
===============================
`$lang
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

  // Create opticians for each branch
  const allBranches = await prisma.branch.findMany();

  for (const branch of allBranches) {
    await prisma.optician.createMany({
      data: [
        {
          name: `Dr. ${branch.name.split(" ")[0]} Moyo`,
          email: `dr.moyo@${branch.email.split("@")[1]}`,
          phone: branch.phone,
          specialty: "Eye Examinations",
          branchId: branch.id,
        },
        {
          name: `Dr. ${branch.name.split(" ")[0]} Ndlovu`,
          email: `dr.ndlovu@${branch.email.split("@")[1]}`,
          phone: branch.phone,
          specialty: "Contact Lenses",
          branchId: branch.id,
        },
        {
          name: `Optician ${branch.name.split(" ")[0]} Chikowore`,
          email: `optician.chikowore@${branch.email.split("@")[1]}`,
          phone: branch.phone,
          specialty: "Spectacles Dispensing",
          branchId: branch.id,
        },
      ],
      skipDuplicates: true,
    });
  }

  const opticiansCount = await prisma.optician.count();

  console.log("Database seeded successfully!");
  console.log(`Created ${branches.count} branches`);
  console.log(`Created ${services.count} services`);
  console.log(`Created ${opticiansCount} opticians`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

```

