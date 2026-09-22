-- AlterTable
ALTER TABLE "AdminUser" ADD COLUMN IF NOT EXISTS "username" TEXT;
ALTER TABLE "AdminUser" ADD COLUMN IF NOT EXISTS "role" TEXT NOT NULL DEFAULT 'ADMIN';
ALTER TABLE "AdminUser" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace WHERE c.relname = 'AdminUser_username_key') THEN
    CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");
  END IF;
END $$;
