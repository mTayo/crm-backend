import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
    await prisma.appointment.deleteMany();
    await prisma.invoiceLineItem.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.invoice.deleteMany();
    await prisma.jobStatusHistory.deleteMany();
    await prisma.job.deleteMany();
    await prisma.customer.deleteMany();
    await prisma.user.deleteMany();
  const customers = await prisma.customer.createMany({
    data: [
      {
        name: "Alice Johnson",
        phone: "08012345678",
        email: "alice@example.com",
        address: "123 Palm Street, Lagos",
      },
      {
        name: "Brian Smith",
        phone: "08023456789",
        email: "brian@example.com",
        address: "45 Unity Road, Abuja",
      },
      {
        name: "Clara James",
        phone: "08034567890",
        email: "clara@example.com",
        address: "78 Market Avenue, Port Harcourt",
      },
    ],
  });


  const officePassword = await bcrypt.hash("office123", 10);
  const techPassword = await bcrypt.hash("tech123", 10);

  // Seed Users
  await prisma.user.upsert({
    where: { email: "office@example.com" },
    update: {},
    create: {
      name: "Office Admin",
      email: "office@example.com",
      password: officePassword,
      role: "office",
    },
  });

    const technician =  await prisma.user.upsert({
    where: { email: "taylor@example.com" },
    update: {},
    create: {
      name: "Taylor",
      email: "taylor@example.com",
      password: techPassword,
      role: "technician",
    },
  });

  console.log("✅ Technician Taylor created");

  // --- Fetch first customer IDs ---
  const allCustomers = await prisma.customer.findMany();

  // --- Create 2 jobs in NEW status ---
  const job1 = await prisma.job.create({
    data: {
      title: "Install Air Conditioner",
      description: "Installation of split AC unit for customer.",
      status: "NEW",
      customerId: allCustomers[0].id,
    },
  });

  const job2 = await prisma.job.create({
    data: {
      title: "Fix Leaking Pipe",
      description: "Repair water leakage in the kitchen area.",
      status: "NEW",
      customerId: allCustomers[1].id,
    },
  });

  // --- Create 1 job already scheduled for Taylor (10:00 - 12:00) ---
  const scheduledJob = await prisma.job.create({
    data: {
      title: "Electrical Maintenance",
      description: "Routine electrical maintenance for the building.",
      status: "SCHEDULED",
      customerId: allCustomers[2].id,
      appointment: {
        create: {
          technician: technician.id,
          startTime: new Date("2025-10-05T10:00:00Z"),
          endTime: new Date("2025-10-05T12:00:00Z"),
        },
      },
    },
    include: {
      appointment: true,
    },
  });


}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
