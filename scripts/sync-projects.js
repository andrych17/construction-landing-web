const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const db = new PrismaClient();

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function run() {
  const jsonPath = path.join(__dirname, 'projects-data.json');
  const projects = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  console.log(`Memulai sinkronisasi ${projects.length} proyek ke database...`);

  // Hapus data proyek lama
  const deleted = await db.project.deleteMany({});
  console.log(`Menghapus ${deleted.count} data proyek lama.`);

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const created = await db.project.create({
      data: {
        slug: slugify(p.title),
        title: p.title,
        category: p.category,
        categoryEn: p.categoryEn || null,
        location: p.location,
        img: p.img,
        gallery: p.gallery || null,
        desc: p.desc,
        descEn: p.descEn || null,
        materials: p.materials || null,
        materialsEn: p.materialsEn || null,
        specs: p.specs || null,
        features: p.features || null,
        featuresEn: p.featuresEn || null,
        specsTable: p.specsTable || null,
        specsTableEn: p.specsTableEn || null,
        order: i,
        published: true,
      },
    });
    console.log(`[${i + 1}/${projects.length}] Berhasil simpan: ${created.title} (${created.slug})`);
  }

  const finalCount = await db.project.count();
  console.log(`Selesai! Total proyek aktif di database: ${finalCount}`);
}

run()
  .catch((err) => {
    console.error('Gagal sinkronisasi:', err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
