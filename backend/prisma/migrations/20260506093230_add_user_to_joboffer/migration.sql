/*
  Warnings:

  - Added the required column `userId` to the `JobOffer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobOffer" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "JobOffer" ADD CONSTRAINT "JobOffer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
