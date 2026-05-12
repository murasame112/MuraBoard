-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('PLN', 'EUR', 'USD');

-- AlterTable
ALTER TABLE "JobOffer" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'PLN';
