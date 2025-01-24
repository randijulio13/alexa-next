/*
  Warnings:

  - You are about to drop the `ContactData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ContactDataToEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ContactDataToVendor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ContactDataToEvent" DROP CONSTRAINT "_ContactDataToEvent_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContactDataToEvent" DROP CONSTRAINT "_ContactDataToEvent_B_fkey";

-- DropForeignKey
ALTER TABLE "_ContactDataToVendor" DROP CONSTRAINT "_ContactDataToVendor_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContactDataToVendor" DROP CONSTRAINT "_ContactDataToVendor_B_fkey";

-- DropTable
DROP TABLE "ContactData";

-- DropTable
DROP TABLE "_ContactDataToEvent";

-- DropTable
DROP TABLE "_ContactDataToVendor";

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContactToVendor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ContactToVendor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ContactToEvent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ContactToEvent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ContactToVendor_B_index" ON "_ContactToVendor"("B");

-- CreateIndex
CREATE INDEX "_ContactToEvent_B_index" ON "_ContactToEvent"("B");

-- AddForeignKey
ALTER TABLE "_ContactToVendor" ADD CONSTRAINT "_ContactToVendor_A_fkey" FOREIGN KEY ("A") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToVendor" ADD CONSTRAINT "_ContactToVendor_B_fkey" FOREIGN KEY ("B") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToEvent" ADD CONSTRAINT "_ContactToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToEvent" ADD CONSTRAINT "_ContactToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
