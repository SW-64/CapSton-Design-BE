-- CreateTable
CREATE TABLE `users` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nickName` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `spots` (
    `spotId` INTEGER NOT NULL AUTO_INCREMENT,
    `spotName` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `like` INTEGER NOT NULL DEFAULT 0,
    `image_url` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`spotId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `reviewId` INTEGER NOT NULL AUTO_INCREMENT,
    `spot_spotId` INTEGER NOT NULL,
    `user_userId` INTEGER NOT NULL,
    `rate` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`reviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorys` (
    `categoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `spot_spotId` INTEGER NOT NULL,
    `Category` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `interactions` (
    `interactionId` INTEGER NOT NULL AUTO_INCREMENT,
    `spot_spotId` INTEGER NOT NULL,
    `user_userId` INTEGER NOT NULL,
    `type` ENUM('LIKE', 'BOOKMARK') NOT NULL DEFAULT 'LIKE',

    UNIQUE INDEX `interactions_spot_spotId_key`(`spot_spotId`),
    PRIMARY KEY (`interactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_spot_spotId_fkey` FOREIGN KEY (`spot_spotId`) REFERENCES `spots`(`spotId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_user_userId_fkey` FOREIGN KEY (`user_userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categorys` ADD CONSTRAINT `categorys_spot_spotId_fkey` FOREIGN KEY (`spot_spotId`) REFERENCES `spots`(`spotId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `interactions` ADD CONSTRAINT `interactions_spot_spotId_fkey` FOREIGN KEY (`spot_spotId`) REFERENCES `spots`(`spotId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `interactions` ADD CONSTRAINT `interactions_user_userId_fkey` FOREIGN KEY (`user_userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
