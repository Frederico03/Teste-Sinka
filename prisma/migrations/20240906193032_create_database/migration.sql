-- CreateTable
CREATE TABLE `Operador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `criado_em` DATETIME(3) NOT NULL,
    `atualizado_em` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `operadorId` INTEGER NOT NULL,
    `criado_em` DATETIME(3) NOT NULL,
    `atualizado_em` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Cliente_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_operadorId_fkey` FOREIGN KEY (`operadorId`) REFERENCES `Operador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
