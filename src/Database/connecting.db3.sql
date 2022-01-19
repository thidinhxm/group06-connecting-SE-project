DROP DATABASE IF EXISTS `connecting`;
CREATE DATABASE `connecting`;
USE `connecting`;

CREATE TABLE `account` (
  `account_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` char(60) NOT NULL,
  `is_locked` tinyint(1) NOT NULL DEFAULT '0',
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `token` text NULL DEFAULT NULL,
  `expired_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1026 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `admin` (
  `admin_id` int NOT NULL,
  `display_name` varchar(20) NOT NULL,
  `fullname` varchar(60) NOT NULL,
  `avatar` text,
  `type_admin` int NOT NULL,
  PRIMARY KEY (`admin_id`),
  CONSTRAINT `FK_Admin_Account` FOREIGN KEY (`admin_id`) REFERENCES `account` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `student` (
  `student_id` int NOT NULL,
  `display_name` varchar(20) NOT NULL,
  `fullname` varchar(60) NOT NULL,
  `avatar` text,
  `phone` char(10) NOT NULL,
  `address` text NOT NULL,
  `birthday` date DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  CONSTRAINT `FK_Student_Account` FOREIGN KEY (`student_id`) REFERENCES `account` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tutor` (
  `tutor_id` int NOT NULL,
  `display_name` varchar(20) NOT NULL,
  `fullname` varchar(60) NOT NULL,
  `avatar` text,
  `phone` char(10) NOT NULL,
  `address` text NOT NULL,
  `birthday` date NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `grade` text NOT NULL,
  `subject` text NOT NULL,
  `time` text NOT NULL,
  `area` text NOT NULL,
  `advantages` text,
  `min_salary` int DEFAULT NULL,
  `job` varchar(20) NOT NULL,
  PRIMARY KEY (`tutor_id`),
  CONSTRAINT `FK_Tutor_Account` FOREIGN KEY (`tutor_id`) REFERENCES `account` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `studentrequest` (
  `student_request_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `address` text NOT NULL,
  `phone` char(10) NOT NULL,
  `salary` int NOT NULL,
  `grade` varchar(40) DEFAULT NULL,
  `subject` varchar(40) DEFAULT NULL,
  `time` text,
  `other_request` text,
  `status` varchar(20) NOT NULL DEFAULT 'Chưa duyệt',
  PRIMARY KEY (`student_request_id`),
  KEY `FK_StudentRequest_Student` (`student_id`),
  CONSTRAINT `FK_StudentRequest_Student` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1012 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `student_request_id` int NOT NULL,
  `address` text NOT NULL,
  `subject` varchar(40) NOT NULL,
  `grade` varchar(40) NOT NULL,
  `time` text NOT NULL,
  `salary` int NOT NULL,
  `extra_fee` int DEFAULT NULL,
  `other_request` text,
  `status` varchar(20) NOT NULL DEFAULT 'Chưa giao',
  PRIMARY KEY (`post_id`),
  KEY `FK_Post_StudentRequest` (`student_request_id`),
  CONSTRAINT `FK_Post_StudentRequest` FOREIGN KEY (`student_request_id`) REFERENCES `studentrequest` (`student_request_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1008 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tutorrequest` (
  `tutor_request_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `tutor_id` int NOT NULL,
  `phone` char(10) NOT NULL,
  `payment_option` varchar(40) NOT NULL,
  `other_request` text,
  `status` varchar(20) NOT NULL DEFAULT 'Chưa duyệt',
  PRIMARY KEY (`tutor_request_id`),
  KEY `FK_TutorRequest_Post` (`post_id`),
  KEY `FK_TutorRequest_Tutor` (`tutor_id`),
  CONSTRAINT `FK_TutorRequest_Post` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`),
  CONSTRAINT `FK_TutorRequest_Tutor` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`tutor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
