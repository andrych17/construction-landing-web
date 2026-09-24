-- Patch SiteContent founders with bilingual fields (roleEn, focusEn, bioEn, credentialsEn)
UPDATE "SiteContent"
SET "value" = jsonb_build_array(
  jsonb_build_object(
    'name', 'Alvin Indrajaya Setia, S.T.',
    'role', 'Pendiri & Direktur',
    'roleEn', 'Founder & Director',
    'image', '/images/founders/alvin_indrajaya.png',
    'isSvgPlaceholder', false,
    'focus', 'Perencanaan & Pelaksanaan Konstruksi',
    'focusEn', 'Design & Construction Management',
    'bio', 'Alvin memimpin Wonderful Works dan memegang langsung perencanaan serta pelaksanaan proyek, dari studi tapak sampai serah terima.',
    'bioEn', 'Alvin leads Wonderful Works and oversees the planning and construction of its projects, from site study to handover.',
    'credentials', jsonb_build_array('Sarjana Teknik (S.T.)'),
    'credentialsEn', jsonb_build_array('Bachelor of Engineering (S.T.)'),
    'quote', '',
    'quoteEn', ''
  )
),
"updatedAt" = NOW()
WHERE "key" = 'founders';
