/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/ tickets /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE tickets;

DROP TABLE IF EXISTS customers;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS roles;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS ticket_priority;
CREATE TABLE `ticket_priority` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS ticket_responses;
CREATE TABLE `ticket_responses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ticket_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user` int NOT NULL,
  `description` longtext,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`ticket_id`),
  KEY `users_idx` (`user`),
  CONSTRAINT `responses_tickets` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`),
  CONSTRAINT `responses_users` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS ticket_status;
CREATE TABLE `ticket_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS ticket_type;
CREATE TABLE `ticket_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS tickets;
CREATE TABLE `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `customer` int NOT NULL,
  `creation_user` int NOT NULL,
  `subject` varchar(200) NOT NULL,
  `description` text,
  `priority` int NOT NULL,
  `type` int NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `customers_idx` (`customer`),
  KEY `users_idx` (`creation_user`),
  KEY `status_idx` (`status`),
  KEY `priority_idx` (`type`),
  KEY `priority_idx1` (`priority`),
  CONSTRAINT `customers` FOREIGN KEY (`customer`) REFERENCES `customers` (`id`),
  CONSTRAINT `priority` FOREIGN KEY (`priority`) REFERENCES `ticket_priority` (`id`),
  CONSTRAINT `status` FOREIGN KEY (`status`) REFERENCES `ticket_status` (`id`),
  CONSTRAINT `type` FOREIGN KEY (`type`) REFERENCES `ticket_type` (`id`),
  CONSTRAINT `users` FOREIGN KEY (`creation_user`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS user_customer;
CREATE TABLE `user_customer` (
  `user` int NOT NULL,
  `customer` int NOT NULL,
  `role` int NOT NULL,
  PRIMARY KEY (`user`,`customer`),
  KEY `Role_idx` (`role`),
  KEY `customer_idx` (`customer`),
  CONSTRAINT `customer` FOREIGN KEY (`customer`) REFERENCES `customers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `Role` FOREIGN KEY (`role`) REFERENCES `roles` (`id`),
  CONSTRAINT `user` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS users;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;


INSERT INTO `tickets`.`ticket_priority` (`description`) VALUES ('High');
INSERT INTO `tickets`.`ticket_priority` (`description`) VALUES ('Medium');
INSERT INTO `tickets`.`ticket_priority` (`description`) VALUES ('Low');