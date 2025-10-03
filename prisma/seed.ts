import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Hash passwords
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

  await prisma.user.upsert({
    where: { email: "taylor@example.com" },
    update: {},
    create: {
      name: "Taylor",
      email: "taylor@example.com",
      password: techPassword,
      role: "technician",
    },
  });

  // Seed Customers
  const customers = [
    {
      name: "John Doe",
      phone: "123-456-7890",
      email: "john@example.com",
      address: "123 Main St, Springfield",
    },
    {
      name: "Jane Smith",
      phone: "987-654-3210",
      email: "jane@example.com",
      address: "456 Oak Ave, Metropolis",
    },
    {
      name: "Acme Corp",
      phone: "555-111-2222",
      email: "contact@acmecorp.com",
      address: "789 Industrial Rd, Gotham",
    },
  ];

  for (const c of customers) {
    await prisma.customer.upsert({
      where: { email: c.email },
      update: {},
      create: c,
    });
  }

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
