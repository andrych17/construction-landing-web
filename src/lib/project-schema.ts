import { z } from 'zod';

const specLine = z.object({ label: z.string().min(1), value: z.string().min(1) });

export const projectInputSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  categoryEn: z.string().optional().nullable(),
  location: z.string().min(1),
  img: z.string().min(1),
  desc: z.string().min(1),
  descEn: z.string().optional().nullable(),
  materials: z.string().optional().nullable(),
  materialsEn: z.string().optional().nullable(),
  specs: z
    .object({
      landArea: z.string(),
      buildingArea: z.string(),
      levels: z.string(),
      year: z.string(),
      concreteGrade: z.string(),
    })
    .optional(),
  features: z.array(z.string()).optional(),
  featuresEn: z.array(z.string()).optional(),
  specsTable: z.array(specLine).optional(),
  specsTableEn: z.array(specLine).optional(),
  order: z.number().int().optional(),
  published: z.boolean().optional(),
});

export type ProjectInput = z.infer<typeof projectInputSchema>;
