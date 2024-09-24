/*
  Warnings:

  - You are about to drop the column `label` on the `Session` table. All the data in the column will be lost.
  - Added the required column `topic` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "label",
ADD COLUMN     "topic" TEXT NOT NULL,
ALTER COLUMN "remainingTime" DROP NOT NULL,
ALTER COLUMN "isPaused" SET DEFAULT true,
ALTER COLUMN "status" SET DEFAULT 'INCOMPLETE';
