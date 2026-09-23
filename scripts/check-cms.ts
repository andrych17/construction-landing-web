import assert from 'node:assert/strict';
import { defaultHomeLayout, publishHomeLayout, sanitizeHistory, sanitizeHomeLayout, sectionAnchor } from '../src/lib/home-layout';
import { safeNextPath } from '../src/lib/safe-next';
import { isContentSectionKey } from '../src/lib/content-sections';
import { projectInputSchema } from '../src/lib/project-schema';

const project = {
  title: 'Rumah Contoh',
  category: 'Residential',
  location: 'Bandung',
  img: '/uploads/cover.webp',
  desc: 'Deskripsi proyek.',
};

assert.equal(projectInputSchema.safeParse(project).success, true);
assert.equal(
  projectInputSchema.safeParse({
    ...project,
    gallery: ['/uploads/detail.webp'],
    specsTable: [{ label: 'Luas', value: '120 m²' }],
    published: false,
  }).success,
  true,
);
assert.equal(projectInputSchema.safeParse({ ...project, title: '' }).success, false);
assert.equal(projectInputSchema.safeParse({ ...project, published: 'yes' }).success, false);
assert.equal(
  projectInputSchema.safeParse({ ...project, specsTable: [{ label: '', value: '120 m²' }] }).success,
  false,
);

for (const key of [
  'contact',
  'rotatingDisciplines',
  'philosophies',
  'founders',
  'services',
  'methodology',
  'faqs',
  'heroHome',
  'heroAbout',
  'heroServices',
  'heroProjects',
  'heroContact',
]) {
  assert.equal(isContentSectionKey(key), true, `Section CMS '${key}' harus dikenal`);
}
assert.equal(isContentSectionKey('unknownSection'), false);

const fallback = defaultHomeLayout();
assert.deepEqual(
  fallback.content.map((block) => block.type),
  ['Hero', 'About', 'Philosophy', 'Founder', 'Services', 'Projects', 'Contact'],
);
assert.equal(sanitizeHomeLayout(null), null);
assert.equal(sanitizeHomeLayout({ content: 'nope' }), null);
const cleaned = sanitizeHomeLayout({
  content: [
    { type: 'Contact', props: { id: 'Contact' } },
    { type: 'Widget', props: { id: 'no' } },
    { type: 'Hero', props: { id: 'Hero' } },
    { type: 'Hero', props: { id: 'Hero' } },
  ],
});
assert.deepEqual(
  cleaned?.content.map((block) => [block.type, block.props.id]),
  [
    ['Contact', 'Contact'],
    ['Hero', 'Hero'],
    ['Hero', 'Hero-2'],
  ],
);
assert.deepEqual(sanitizeHomeLayout({ content: [] })?.content, []);
const nastyId = sanitizeHomeLayout({ content: [{ type: 'Hero', props: { id: '"><script>' } }] })?.content[0].props.id;
assert.equal(nastyId, 'script');
assert.equal(/^[A-Za-z0-9_-]+$/.test(nastyId ?? ''), true);
assert.equal(
  sanitizeHomeLayout({ content: [{ type: 'Hero', props: { id: '"><' } }] })?.content[0].props.id,
  'Hero',
);
assert.equal(sectionAnchor('Hero', 'Hero'), 'hero');
assert.equal(sectionAnchor('Hero', 'Hero-2'), 'hero-Hero-2');
assert.equal(sectionAnchor('Contact', 'Contact'), 'contact');
assert.equal(publishHomeLayout({ content: [] }).ok, false);
assert.equal(publishHomeLayout({ content: [{ type: 'Nope', props: { id: 'Nope' } }] }).ok, false);
assert.equal(publishHomeLayout({ content: Array.from({ length: 21 }, () => ({ type: 'Hero', props: { id: 'Hero' } })) }).ok, false);
assert.equal(publishHomeLayout(defaultHomeLayout()).ok, true);
const withCopy = sanitizeHomeLayout({
  content: [{ type: 'Hero', props: { id: 'Hero', line1Id: '  JUDUL\u0000  ', secret: 'no' } }],
});
assert.equal(withCopy?.content[0].props.line1Id, 'JUDUL');
assert.equal('secret' in (withCopy?.content[0].props ?? {}), false);
assert.equal(
  sanitizeHistory('home', [{ at: '2026-01-01T00:00:00.000Z', data: defaultHomeLayout() }]).length,
  1,
);
assert.equal(sanitizeHistory('about', [{ at: '2026-01-01', data: defaultHomeLayout() }]).length, 0);
assert.equal(safeNextPath(null), '/admin');
assert.equal(safeNextPath('/'), '/admin');
assert.equal(safeNextPath('/admin/login'), '/admin');
assert.equal(safeNextPath('//evil.example'), '/admin');
assert.equal(safeNextPath('/admin/content'), '/admin/content');

console.log('OK CMS: validasi proyek dan daftar section lulus.');
