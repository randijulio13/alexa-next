/*
  Warnings:

  - The values [admin,team,client] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "VendorType" AS ENUM ('VENUE', 'CATERING', 'PHOTOGRAPHY', 'DECORATION', 'ENTERTAINMENT', 'TRANSPORTATION', 'RENTAL', 'OTHER');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'TEAM', 'CLIENT');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'TEAM';
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'TEAM';

-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "vendorType" "VendorType" NOT NULL DEFAULT 'OTHER';
