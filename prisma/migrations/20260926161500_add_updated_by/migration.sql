-- AlterTable
ALTER TABLE "SiteContent" ADD COLUMN IF NOT EXISTS "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "updatedBy" TEXT;
