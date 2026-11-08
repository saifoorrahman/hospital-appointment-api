import { prisma } from "./lib/prisma.js";

async function main() {
  // Clear existing data
  await prisma.appointment.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.patient.deleteMany();

  // Seed patients
  const alice = await prisma.patient.create({
    data: {
      name: "Alice Johnson",
      phone: "555-1001",
      dateOfBirth: new Date("1990-04-15"),
    },
  });

  const bob = await prisma.patient.create({
    data: {
      name: "Bob Martinez",
      phone: "555-1002",
      dateOfBirth: new Date("1985-08-22"),
    },
  });

  // Seed doctors
  const drSmith = await prisma.doctor.create({
    data: {
      name: "Dr. Emily Smith",
      specialty: "Cardiology",
    },
  });

  const drPatel = await prisma.doctor.create({
    data: {
      name: "Dr. Raj Patel",
      specialty: "Neurology",
    },
  });

  // Seed appointments
  await prisma.appointment.create({
    data: {
      Patient: { connect: { id: alice.id } },
      Doctor: { connect: { id: drSmith.id } },
      appointmentDate: new Date("2025-02-10T09:00:00Z"),
      status: "scheduled",
    },
  });

  await prisma.appointment.create({
    data: {
      Patient: { connect: { id: bob.id } },
      Doctor: { connect: { id: drPatel.id } },
      appointmentDate: new Date("2025-02-11T14:00:00Z"),
      status: "scheduled",
    },
  });

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
