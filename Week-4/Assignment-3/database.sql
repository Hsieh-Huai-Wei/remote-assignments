CREATE DATABASE
IF NOT EXISTS assignment;
USE assignment;
CREATE TABLE `user`
(
 `id` int
(10) unsigned NOT NULL AUTO_INCREMENT,
 `email` varchar
(50) COLLATE utf8mb4_unicode_ci NOT NULL,
 `password` varchar
(255) COLLATE utf8mb4_unicode_ci NOT NULL,
 PRIMARY KEY
(`id`),
 UNIQUE KEY `email`
(`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;