/*
 Navicat Premium Data Transfer

 Source Server         : guozijia
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : guohub

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 30/04/2021 11:38:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for avatar
-- ----------------------------
DROP TABLE IF EXISTS `avatar`;
CREATE TABLE `avatar`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size` int NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `filename`(`filename`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `avatar_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `moment_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_id` int NULL DEFAULT NULL,
  `author` int NOT NULL,
  `status` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `moment_id`(`moment_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `comment_id`(`comment_id`) USING BTREE,
  INDEX `author`(`author`) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_4` FOREIGN KEY (`author`) REFERENCES `moment` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size` int NULL DEFAULT NULL,
  `moment_id` int NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `filename`(`filename`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `moment_id`(`moment_id`) USING BTREE,
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `file_ibfk_2` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 179 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for label
-- ----------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for likes
-- ----------------------------
DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `moment_id` int NOT NULL,
  `user_id` int NOT NULL,
  `status` int NULL DEFAULT NULL,
  `author` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `moment_id`(`moment_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `author`(`author`) USING BTREE,
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_3` FOREIGN KEY (`author`) REFERENCES `moment` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 45 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for moment
-- ----------------------------
DROP TABLE IF EXISTS `moment`;
CREATE TABLE `moment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` int NOT NULL,
  `createAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `moment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 169 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for moment_label
-- ----------------------------
DROP TABLE IF EXISTS `moment_label`;
CREATE TABLE `moment_label`  (
  `moment_id` int NOT NULL,
  `label_id` int NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`moment_id`, `label_id`) USING BTREE,
  INDEX `label_id`(`label_id`) USING BTREE,
  CONSTRAINT `moment_label_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `moment_label_ibfk_2` FOREIGN KEY (`label_id`) REFERENCES `label` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mywork_cover
-- ----------------------------
DROP TABLE IF EXISTS `mywork_cover`;
CREATE TABLE `mywork_cover`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size` int NULL DEFAULT NULL,
  `work_id` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `filename`(`filename`) USING BTREE,
  INDEX `work_id`(`work_id`) USING BTREE,
  CONSTRAINT `mywork_cover_ibfk_1` FOREIGN KEY (`work_id`) REFERENCES `myworks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mywork_pic
-- ----------------------------
DROP TABLE IF EXISTS `mywork_pic`;
CREATE TABLE `mywork_pic`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size` int NULL DEFAULT NULL,
  `work_id` int NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `filename`(`filename`) USING BTREE,
  INDEX `work_id`(`work_id`) USING BTREE,
  CONSTRAINT `mywork_pic_ibfk_1` FOREIGN KEY (`work_id`) REFERENCES `myworks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for myworks
-- ----------------------------
DROP TABLE IF EXISTS `myworks`;
CREATE TABLE `myworks`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cover_url` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `avatar_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
