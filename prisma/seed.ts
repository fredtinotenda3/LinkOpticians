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
    const opticians = await prisma.optician.createMany({
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

    // Add working hours for each optician
    const branchOpticians = await prisma.optician.findMany({
      where: { branchId: branch.id },
    });

    for (const optician of branchOpticians) {
      // Standard working hours: Mon-Fri 8am-5pm, Sat 8am-1pm, Sun off
      const workingHours = [
        // Monday
        {
          opticianId: optician.id,
          dayOfWeek: 1,
          startTime: "08:00",
          endTime: "17:00",
          isAvailable: true,
        },
        // Tuesday
        {
          opticianId: optician.id,
          dayOfWeek: 2,
          startTime: "08:00",
          endTime: "17:00",
          isAvailable: true,
        },
        // Wednesday
        {
          opticianId: optician.id,
          dayOfWeek: 3,
          startTime: "08:00",
          endTime: "17:00",
          isAvailable: true,
        },
        // Thursday
        {
          opticianId: optician.id,
          dayOfWeek: 4,
          startTime: "08:00",
          endTime: "17:00",
          isAvailable: true,
        },
        // Friday
        {
          opticianId: optician.id,
          dayOfWeek: 5,
          startTime: "08:00",
          endTime: "17:00",
          isAvailable: true,
        },
        // Saturday
        {
          opticianId: optician.id,
          dayOfWeek: 6,
          startTime: "08:00",
          endTime: "13:00",
          isAvailable: true,
        },
        // Sunday - off
        {
          opticianId: optician.id,
          dayOfWeek: 0,
          startTime: "09:00",
          endTime: "17:00",
          isAvailable: false,
        },
      ];

      await prisma.opticianWorkingHours.createMany({
        data: workingHours,
        skipDuplicates: true,
      });

      // Add sample time-off for one optician per branch
      if (optician.name.includes("Moyo")) {
        // Add vacation for next month
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        const vacationStart = new Date(nextMonth);
        vacationStart.setDate(1);
        const vacationEnd = new Date(vacationStart);
        vacationEnd.setDate(vacationStart.getDate() + 7); // 1 week vacation

        await prisma.opticianTimeOff.create({
          data: {
            opticianId: optician.id,
            startDate: vacationStart,
            endDate: vacationEnd,
            reason: "Annual Vacation",
            isAllDay: true,
          },
        });

        // Add training day for next week
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        const trainingStart = new Date(nextWeek);
        trainingStart.setHours(9, 0, 0, 0);
        const trainingEnd = new Date(trainingStart);
        trainingEnd.setHours(17, 0, 0, 0);

        await prisma.opticianTimeOff.create({
          data: {
            opticianId: optician.id,
            startDate: trainingStart,
            endDate: trainingEnd,
            reason: "Professional Development Training",
            isAllDay: true,
          },
        });
      }
    }
  }

  // Create sample appointments to test availability
  const sampleService = await prisma.service.findFirst();
  const sampleBranch = await prisma.branch.findFirst();
  const sampleOptician = await prisma.optician.findFirst();

  if (sampleService && sampleBranch && sampleOptician) {
    // Create appointments for tomorrow at different times
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const appointments = [
      {
        patientName: "John Smith",
        phone: "+263772123456",
        email: "john.smith@example.com",
        serviceId: sampleService.id,
        branchId: sampleBranch.id,
        opticianId: sampleOptician.id,
        scheduledAt: new Date(tomorrow.setHours(9, 0, 0, 0)),
        status: "confirmed" as const,
      },
      {
        patientName: "Sarah Johnson",
        phone: "+263773654321",
        email: "sarah.j@example.com",
        serviceId: sampleService.id,
        branchId: sampleBranch.id,
        opticianId: sampleOptician.id,
        scheduledAt: new Date(tomorrow.setHours(11, 0, 0, 0)),
        status: "confirmed" as const,
      },
    ];

    await prisma.appointment.createMany({
      data: appointments,
      skipDuplicates: true,
    });
  }

  const opticiansCount = await prisma.optician.count();
  const workingHoursCount = await prisma.opticianWorkingHours.count();
  const timeOffCount = await prisma.opticianTimeOff.count();
  const appointmentsCount = await prisma.appointment.count();

  console.log("Database seeded successfully!");
  console.log(`Created ${branches.count} branches`);
  console.log(`Created ${services.count} services`);
  console.log(`Created ${opticiansCount} opticians`);
  console.log(`Created ${workingHoursCount} working hours entries`);
  console.log(`Created ${timeOffCount} time off entries`);
  console.log(`Created ${appointmentsCount} sample appointments`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
