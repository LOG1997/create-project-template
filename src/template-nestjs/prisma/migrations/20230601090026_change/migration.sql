-- DropIndex
DROP INDEX `User_avatar_idx` ON `user`;

-- AlterTable
ALTER TABLE `artical` ADD COLUMN `published` BOOLEAN NOT NULL DEFAULT false;
