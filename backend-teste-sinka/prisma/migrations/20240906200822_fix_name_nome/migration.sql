/*
  Warnings:

  - You are about to drop the column `name` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Operador` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Operador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cliente` DROP COLUMN `name`,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Operador` DROP COLUMN `name`,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL;
