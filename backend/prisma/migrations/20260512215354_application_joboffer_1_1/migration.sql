/*
  Warnings:

  - A unique constraint covering the columns `[jobOfferId]` on the table `Application` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Application_jobOfferId_key" ON "Application"("jobOfferId");
