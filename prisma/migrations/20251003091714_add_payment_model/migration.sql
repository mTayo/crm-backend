/*
  Warnings:

  - You are about to drop the column `currency` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `reference` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `PaymentSession` table. All the data in the column will be lost.
  - You are about to drop the column `gatewayPaymentId` on the `PaymentSession` table. All the data in the column will be lost.
  - You are about to drop the column `gatewayRef` on the `PaymentSession` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `PaymentSession` table. All the data in the column will be lost.
  - You are about to drop the column `requestPayload` on the `PaymentSession` table. All the data in the column will be lost.
  - You are about to drop the column `responsePayload` on the `PaymentSession` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `PaymentSession` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `PaymentSession` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `PaymentSession` table. All the data in the column will be lost.
  - Made the column `invoiceId` on table `Payment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `Payment_invoiceId_fkey`;

-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `Payment_userId_fkey`;

-- DropIndex
DROP INDEX `Payment_invoiceId_fkey` ON `Payment`;

-- DropIndex
DROP INDEX `Payment_reference_key` ON `Payment`;

-- DropIndex
DROP INDEX `Payment_userId_fkey` ON `Payment`;

-- AlterTable
ALTER TABLE `Invoice` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Payment` DROP COLUMN `currency`,
    DROP COLUMN `provider`,
    DROP COLUMN `reference`,
    DROP COLUMN `status`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `userId`,
    MODIFY `invoiceId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `PaymentSession` DROP COLUMN `createdAt`,
    DROP COLUMN `gatewayPaymentId`,
    DROP COLUMN `gatewayRef`,
    DROP COLUMN `provider`,
    DROP COLUMN `requestPayload`,
    DROP COLUMN `responsePayload`,
    DROP COLUMN `sessionId`,
    DROP COLUMN `status`,
    DROP COLUMN `updatedAt`;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `Invoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
