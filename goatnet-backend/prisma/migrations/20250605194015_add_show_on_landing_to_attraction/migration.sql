/*
  Warnings:

  - You are about to drop the `ShowcaseItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Attraction" ADD COLUMN     "landingOrder" INTEGER,
ADD COLUMN     "showOnLanding" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "ShowcaseItem";
