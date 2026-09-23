import assert from 'node:assert/strict';
import { readFile, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const baseUrl = process.env.CMS_BASE_URL ?? 'http://127.0.0.1:3000';
const email = process.env.CMS_TEST_EMAIL;
const password = process.env.CMS_TEST_PASSWORD;
assert.ok(email && password, 'Set CMS_TEST_EMAIL and CMS_TEST_PASSWORD.');

const json = (value) => JSON.stringify(value);
const request = (path, options = {}) => fetch(new URL(path, baseUrl), options);
const credentials = await request('/api/auth/login', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: json({ email, password }),
});
assert.equal(credentials.status, 200, 'Admin login failed.');
const cookie = credentials.headers.getSetCookie().map((value) => value.split(';')[0]).join('; ');
assert.ok(cookie, 'Login did not set a session cookie.');
const api = (path, options = {}) => request(path, {
  ...options,
  headers: { cookie, ...options.headers },
});

let projectId;
let userId;
const uploadedUrls = [];
const uploadUrlPattern = /^\/uploads\/[a-f0-9-]{36}\.(avif|jpg|mp4|png|webm|webp)$/;
const trackUpload = (url) => {
  if (typeof url === 'string' && uploadUrlPattern.test(url)) uploadedUrls.push(url);
};
try {
  const anonymous = await request('/api/admin/projects');
  assert.equal(anonymous.status, 401, 'Project API must reject anonymous requests.');

  for (const page of [
    '/admin', '/admin/projects', '/admin/projects/new', '/admin/content',
    '/admin/content/contact', '/admin/hero', '/admin/users',
  ]) {
    const response = await api(page);
    assert.equal(response.status, 200, `Admin page ${page} failed.`);
  }

  const projects = await api('/api/admin/projects');
  assert.equal(projects.status, 200);
  assert.ok(Array.isArray(await projects.json()));

  const invalidProject = await api('/api/admin/projects', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: json({ title: '' }),
  });
  assert.equal(invalidProject.status, 422);

  const createdProject = await api('/api/admin/projects', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: json({
      title: `CMS Smoke ${Date.now()}`,
      category: 'Test',
      location: 'Test',
      img: '/test.webp',
      desc: 'Temporary CMS API test.',
    }),
  });
  assert.equal(createdProject.status, 201);
  const project = await createdProject.json();
  projectId = project.id;

  const readProject = await api(`/api/admin/projects/${projectId}`);
  assert.equal(readProject.status, 200);
  const updateProject = await api(`/api/admin/projects/${projectId}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: json({
      title: `${project.title} Updated`,
      category: project.category,
      categoryEn: project.categoryEn ?? '',
      location: project.location,
      img: project.img,
      gallery: project.gallery ?? [],
      desc: project.desc,
      descEn: project.descEn ?? '',
      materials: project.materials ?? '',
      materialsEn: project.materialsEn ?? '',
      specs: project.specs ?? { landArea: '', buildingArea: '', levels: '', year: '', concreteGrade: '' },
      features: project.features ?? [],
      featuresEn: project.featuresEn ?? [],
      specsTable: project.specsTable ?? [],
      specsTableEn: project.specsTableEn ?? [],
      order: project.order,
      published: project.published,
    }),
  });
  assert.equal(updateProject.status, 200);
  assert.match((await updateProject.json()).title, /Updated$/);
  assert.equal((await api(`/api/admin/projects/${projectId}`, { method: 'DELETE' })).status, 200);
  projectId = undefined;

  const content = await api('/api/admin/content/contact');
  assert.equal(content.status, 200);
  const originalContent = await content.json();
  const saveContent = await api('/api/admin/content/contact', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: json(originalContent.value),
  });
  assert.equal(saveContent.status, 200);
  assert.deepEqual((await saveContent.json()).value, originalContent.value);
  assert.equal((await api('/api/admin/content/not-a-section')).status, 404);
  const invalidContent = await api('/api/admin/content/contact', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: 'null',
  });
  assert.equal(invalidContent.status, 422);

  const sections = [
    'contact', 'rotatingDisciplines', 'philosophies', 'founders', 'services',
    'methodology', 'faqs', 'heroHome', 'heroAbout', 'heroServices', 'heroProjects', 'heroContact',
  ];
  for (const section of sections) {
    assert.equal((await api(`/api/admin/content/${section}`)).status, 200, `GET ${section} failed.`);
  }

  const users = await api('/api/admin/users');
  assert.equal(users.status, 200, 'Admin account must have Superadmin access.');
  assert.ok(Array.isArray(await users.json()));
  const invalidUser = await api('/api/admin/users', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: json({ email: 'invalid' }),
  });
  assert.equal(invalidUser.status, 422);

  const createdUser = await api('/api/admin/users', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: json({
      name: 'CMS Smoke Test',
      email: `cms-smoke-${Date.now()}@example.invalid`,
      username: `cms-smoke-${Date.now()}`,
      password: 'temporary-test-password',
      role: 'ADMIN',
    }),
  });
  assert.equal(createdUser.status, 201);
  const user = await createdUser.json();
  userId = user.id;
  assert.equal('passwordHash' in user, false, 'User API must not expose password hashes.');
  const updateUser = await api(`/api/admin/users/${userId}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: json({ name: 'CMS Smoke Updated' }),
  });
  assert.equal(updateUser.status, 200);
  assert.equal((await updateUser.json()).name, 'CMS Smoke Updated');
  assert.equal((await api(`/api/admin/users/${userId}`, { method: 'DELETE' })).status, 200);
  userId = undefined;

  const uploadForm = new FormData();
  uploadForm.set('file', new Blob(['not an image']), 'not-image.txt');
  assert.equal((await api('/api/admin/upload', { method: 'POST', body: uploadForm })).status, 422);

  for (const type of ['image/jpeg', 'video/mp4']) {
    const fakeForm = new FormData();
    fakeForm.set('file', new Blob(['not media'], { type }), `fake.${type === 'image/jpeg' ? 'jpg' : 'mp4'}`);
    const fakeResponse = await api('/api/admin/upload', { method: 'POST', body: fakeForm });
    const fakeBody = await fakeResponse.json();
    trackUpload(fakeBody.url);
    assert.equal(fakeResponse.status, 422, `${type} payload must be validated by content.`);
  }

  const sampleImage = await readFile(new URL('../public/images/projects/hero_poster.jpg', import.meta.url));
  for (const asset of [
    { bytes: sampleImage, name: 'cms-smoke.jpg', type: 'image/jpeg' },
    { path: '../public/images/ww/logo-512.png', name: 'cms-smoke.png', type: 'image/png' },
    { bytes: await sharp(sampleImage).webp().toBuffer(), name: 'cms-smoke.webp', type: 'image/webp' },
    { bytes: await sharp(sampleImage).avif().toBuffer(), name: 'cms-smoke.avif', type: 'image/avif' },
    { path: '../public/videos/logo.mp4', name: 'cms-smoke.mp4', type: 'video/mp4' },
  ]) {
    const bytes = asset.bytes ?? await readFile(new URL(asset.path, import.meta.url));
    const form = new FormData();
    form.set('file', new Blob([bytes], { type: asset.type }), asset.name);
    const response = await api('/api/admin/upload', { method: 'POST', body: form });
    assert.equal(response.status, 201, `${asset.type} upload failed.`);
    const { url } = await response.json();
    assert.match(url, uploadUrlPattern);
    trackUpload(url);

    const stored = await request(url);
    assert.equal(stored.status, 200, `${asset.type} is not publicly readable.`);
    assert.ok(Number(stored.headers.get('content-length')) > 0);
    assert.equal(stored.headers.get('content-type'), asset.type);
    const storedBytes = Buffer.from(await stored.arrayBuffer());
    if (asset.type.startsWith('image/')) {
      assert.ok((await sharp(storedBytes).metadata()).width, `${asset.type} response is not a valid image.`);
    }
    if (asset.type === 'video/mp4') {
      assert.deepEqual(storedBytes, bytes, 'Video should be stored unchanged.');
      const partial = await request(url, { headers: { range: 'bytes=0-63' } });
      assert.equal(partial.status, 206, 'Video URL must support byte ranges for seeking.');
      assert.equal((await partial.arrayBuffer()).byteLength, 64);
      assert.equal((await request(url, { headers: { range: `bytes=${bytes.length}-` } })).status, 416);
    }
  }
  assert.equal((await request('/uploads/not-a-upload.jpg')).status, 404);

  const oversizedForm = new FormData();
  oversizedForm.set('file', new Blob([new Uint8Array(10 * 1024 * 1024 + 1)], { type: 'image/jpeg' }), 'too-large.jpg');
  assert.equal((await api('/api/admin/upload', { method: 'POST', body: oversizedForm })).status, 413);

  console.log('OK CMS API: auth, projects, content, users, image/video upload, upload limits.');
} finally {
  if (projectId) await api(`/api/admin/projects/${projectId}`, { method: 'DELETE' });
  if (userId) await api(`/api/admin/users/${userId}`, { method: 'DELETE' });
  await Promise.all(uploadedUrls.map((url) => unlink(fileURLToPath(new URL(`../public${url}`, import.meta.url)))));
  await request('/api/auth/logout', { method: 'POST', headers: { cookie } });
}
