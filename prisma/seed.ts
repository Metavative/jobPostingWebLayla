import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";


const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL not found");
}

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const existing = await prisma.admin.findUnique({
    where: { email: "admin@example.com" },
  });

  if (existing) {
    console.log("Admin already exists");
    return;
  }

  await prisma.admin.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      passwordHash: hashedPassword,
    },
  });

  console.log("Admin created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });