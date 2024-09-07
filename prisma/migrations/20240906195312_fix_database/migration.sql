/*
  Warnings:

  - The primary key for the `Operador` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Cliente` DROP FOREIGN KEY `Cliente_operadorId_fkey`;

-- AlterTable
ALTER TABLE `Cliente` MODIFY `operadorId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Operador` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_operadorId_fkey` FOREIGN KEY (`operadorId`) REFERENCES `Operador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
