import { PrismaClient } from '@prisma/client';
import { WW_PROJECTS } from '../src/data/siteData';

const db = new PrismaClient();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function syncProjects() {
  console.log(`Memulai sinkronisasi ${WW_PROJECTS.length} proyek ke database...`);

  // Hapus proyek lama untuk menjamin urutan dan data bersih
  const deleted = await db.project.deleteMany({});
  console.log(`Menghapus ${deleted.count} data proyek lama.`);

  for (let i = 0; i < WW_PROJECTS.length; i += 1) {
    const p = WW_PROJECTS[i];
    const created = await db.project.create({
      data: {
        slug: slugify(p.title),
        title: p.title,
        category: p.category,
        categoryEn: p.categoryEn,
        location: p.location,
        img: p.img,
        gallery: p.gallery,
        desc: p.desc,
        descEn: p.descEn,
        materials: p.materials,
        materialsEn: p.materialsEn,
        specs: p.specs,
        features: p.features,
        featuresEn: p.featuresEn,
        specsTable: p.specsTable,
        specsTableEn: p.specsTableEn,
        order: i,
        published: true,
      },
    });
    console.log(`[${i + 1}/${WW_PROJECTS.length}] Berhasil membuat: ${created.title} (${created.slug})`);
  }

  console.log('Sinkronisasi proyek ke database selesai.');
}

syncProjects()
  .catch((err) => {
    console.error('Error saat sinkronisasi proyek:', err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
