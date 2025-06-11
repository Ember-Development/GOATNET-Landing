/*
  Warnings:

  - You are about to drop the column `studioId` on the `Attraction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attraction" DROP CONSTRAINT "Attraction_studioId_fkey";

-- AlterTable
ALTER TABLE "Attraction" DROP COLUMN "studioId";
