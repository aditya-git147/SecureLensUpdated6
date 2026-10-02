const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgresql://securelens:securelens@localhost:5433/securelens' });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const users = await prisma.user.findMany();
  console.log('Users found:', users.length);
  for (const u of users) {
    console.log(`- ${u.id}: ${u.email} (${u.name})`);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
