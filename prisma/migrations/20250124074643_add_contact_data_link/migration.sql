/*
  Warnings:

  - Added the required column `description` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Vendor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "instagramLink" TEXT,
ADD COLUMN     "whatsappLink" TEXT;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "description" TEXT NOT NULL;
