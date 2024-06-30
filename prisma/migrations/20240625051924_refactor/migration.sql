-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(36) NOT NULL,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `ssoProvider` VARCHAR(50) NULL,
    `ssoProviderUserId` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `username` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `space` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `accessPassword` VARCHAR(255) NOT NULL,
    `adminId` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `space_name_key`(`name`),
    INDEX `space_adminId_fkey`(`adminId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sport` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `spaceId` VARCHAR(36) NULL,

    UNIQUE INDEX `sport_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `spaceId` VARCHAR(36) NOT NULL,
    `sportId` VARCHAR(36) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `team_name_key`(`name`),
    INDEX `team_spaceId_idx`(`spaceId`),
    INDEX `team_sportId_idx`(`sportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `spaceId` VARCHAR(36) NULL,

    UNIQUE INDEX `player_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_team` (
    `id` VARCHAR(36) NOT NULL,
    `playerId` VARCHAR(36) NOT NULL,
    `teamId` VARCHAR(36) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `game` (
    `gameDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id` VARCHAR(36) NOT NULL,
    `spaceId` VARCHAR(36) NOT NULL,
    `sportId` VARCHAR(36) NOT NULL,
    `teamAId` VARCHAR(36) NOT NULL,
    `teamAScore` INTEGER NOT NULL,
    `teamBId` VARCHAR(36) NOT NULL,
    `teamBScore` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `game_spaceId_idx`(`spaceId`),
    INDEX `game_teamAId_idx`(`teamAId`),
    INDEX `game_teamBId_idx`(`teamBId`),
    INDEX `game_sportId_idx`(`sportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `space` ADD CONSTRAINT `space_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sport` ADD CONSTRAINT `sport_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `space`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team` ADD CONSTRAINT `team_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player` ADD CONSTRAINT `player_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `space`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player_team` ADD CONSTRAINT `player_team_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `player`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player_team` ADD CONSTRAINT `player_team_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game` ADD CONSTRAINT `game_spaceId_fkey` FOREIGN KEY (`spaceId`) REFERENCES `space`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game` ADD CONSTRAINT `game_sportId_fkey` FOREIGN KEY (`sportId`) REFERENCES `sport`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game` ADD CONSTRAINT `game_teamAId_fkey` FOREIGN KEY (`teamAId`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game` ADD CONSTRAINT `game_teamBId_fkey` FOREIGN KEY (`teamBId`) REFERENCES `team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
