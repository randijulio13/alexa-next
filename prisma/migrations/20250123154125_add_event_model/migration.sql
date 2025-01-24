/*
  Warnings:

  - You are about to drop the column `clientId` on the `ContactData` table. All the data in the column will be lost.
  - You are about to drop the column `vendorId` on the `ContactData` table. All the data in the column will be lost.
  - You are about to drop the column `event_date` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventDate` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ContactData" DROP CONSTRAINT "ContactData_clientId_fkey";

-- DropForeignKey
ALTER TABLE "ContactData" DROP CONSTRAINT "ContactData_vendorId_fkey";

-- AlterTable
ALTER TABLE "ContactData" DROP COLUMN "clientId",
DROP COLUMN "vendorId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "event_date",
ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Client";

-- CreateTable
CREATE TABLE "_EventToVendor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EventToVendor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ContactDataToVendor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ContactDataToVendor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ContactDataToEvent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ContactDataToEvent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EventToVendor_B_index" ON "_EventToVendor"("B");

-- CreateIndex
CREATE INDEX "_ContactDataToVendor_B_index" ON "_ContactDataToVendor"("B");

-- CreateIndex
CREATE INDEX "_ContactDataToEvent_B_index" ON "_ContactDataToEvent"("B");

-- AddForeignKey
ALTER TABLE "_EventToVendor" ADD CONSTRAINT "_EventToVendor_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToVendor" ADD CONSTRAINT "_EventToVendor_B_fkey" FOREIGN KEY ("B") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactDataToVendor" ADD CONSTRAINT "_ContactDataToVendor_A_fkey" FOREIGN KEY ("A") REFERENCES "ContactData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactDataToVendor" ADD CONSTRAINT "_ContactDataToVendor_B_fkey" FOREIGN KEY ("B") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactDataToEvent" ADD CONSTRAINT "_ContactDataToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "ContactData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactDataToEvent" ADD CONSTRAINT "_ContactDataToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
