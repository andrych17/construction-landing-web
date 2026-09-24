import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import {
  SITE_CONTACT,
  ROTATING_DISCIPLINES,
  ROTATING_DISCIPLINES_EN,
  WW_PHILOSOPHIES,
  WW_FOUNDERS,
  CENTRA_SERVICES,
  MASTER_METHODOLOGY,
  WW_FAQS,
  WW_PROJECTS,
  DEFAULT_HERO_HOME,
  DEFAULT_HERO_ABOUT,
  DEFAULT_HERO_SERVICES,
  DEFAULT_HERO_PROJECTS,
  DEFAULT_HERO_CONTACT,
} from '../src/data/siteData';

const db = new PrismaClient();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@wwconstruction.id';
  const password = process.env.ADMIN_PASSWORD ?? 'password123';
  const name = process.env.ADMIN_NAME ?? 'Superadmin WW';
  const username = process.env.ADMIN_USERNAME ?? 'admin';

  const passwordHash = await bcrypt.hash(password, 10);
  await db.adminUser.upsert({
    where: { email },
    create: { email, username, name, role: 'SUPERADMIN', passwordHash },
    update: { username, name, role: 'SUPERADMIN', passwordHash },
  });
  console.log(`Superadmin user siap: email=${email}, username=${username}, role=SUPERADMIN`);
}

async function seedContent() {
  const sections: Array<[string, unknown]> = [
    ['contact', SITE_CONTACT],
    ['rotatingDisciplines', { id: ROTATING_DISCIPLINES, en: ROTATING_DISCIPLINES_EN }],
    ['philosophies', WW_PHILOSOPHIES],
    ['founders', WW_FOUNDERS],
    ['services', CENTRA_SERVICES],
    ['methodology', MASTER_METHODOLOGY],
    ['faqs', WW_FAQS],
    ['heroHome', DEFAULT_HERO_HOME],
    ['heroAbout', DEFAULT_HERO_ABOUT],
    ['heroServices', DEFAULT_HERO_SERVICES],
    ['heroProjects', DEFAULT_HERO_PROJECTS],
    ['heroContact', DEFAULT_HERO_CONTACT],
  ];

  for (const [key, value] of sections) {
    await db.siteContent.upsert({
      where: { key },
      create: { key, value: value as object },
      update: { value: value as object },
    });
  }
  console.log(`Site content siap: ${sections.length} section diperbarui.`);
}

async function seedProjects() {
  const existing = await db.project.count();
  if (existing > 0) {
    console.log(`Proyek sudah ada (${existing}) — lewati seed proyek.`);
    return;
  }

  for (let i = 0; i < WW_PROJECTS.length; i += 1) {
    const p = WW_PROJECTS[i];
    await db.project.create({
      data: {
        slug: slugify(p.title),
        title: p.title,
        category: p.category,
        categoryEn: p.categoryEn,
        location: p.location,
        img: p.img,
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
      },
    });
  }
  console.log(`Proyek siap: ${WW_PROJECTS.length} proyek dibuat.`);
}

async function main() {
  await seedAdmin();
  await seedContent();
  await seedProjects();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
