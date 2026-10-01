const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const db = new PrismaClient();

async function run() {
  const jsonPath = path.join(__dirname, 'site-content-data.json');
  if (!fs.existsSync(jsonPath)) {
    console.error(`File ${jsonPath} not found!`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const entries = Object.entries(data);

  console.log(`Memulai sinkronisasi ${entries.length} section SiteContent...`);

  for (const [key, value] of entries) {
    await db.siteContent.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });
    console.log(`[OK] Updated SiteContent key: ${key}`);
  }

  console.log('Semua konten dan layout berhasil disinkronkan ke database!');
}

run()
  .catch((err) => {
    console.error('Gagal sinkronisasi content:', err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
