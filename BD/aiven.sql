-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Linux (x86_64)
--
-- Host: mysql-21fae83-build-invest.e.aivencloud.com    Database: build_invest
-- ------------------------------------------------------
-- Server version       8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `architect`
--

DROP TABLE IF EXISTS `architect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `architect` (
  `idarchitect` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `complete_name` varchar(70) NOT NULL,
  `dni` varchar(10) NOT NULL,
  `n_matricula` varchar(45) NOT NULL,
  `antecedentes` blob NOT NULL,
  `curriculum` blob NOT NULL,
  PRIMARY KEY (`idarchitect`),
  UNIQUE KEY `dni_UNIQUE` (`dni`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `architect`
--

LOCK TABLES `architect` WRITE;
/*!40000 ALTER TABLE `architect` DISABLE KEYS */;
/*!40000 ALTER TABLE `architect` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investment`
--

DROP TABLE IF EXISTS `investment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `investment` (
  `user_email` varchar(255) NOT NULL,
  `project` int NOT NULL,
  `amount` int NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_email`,`project`),
  KEY `fk_user_has_proyect_proyect1_idx` (`project`),
  KEY `fk_user_has_proyect_user_idx` (`user_email`),
  CONSTRAINT `fk_user_has_proyect_proyect1` FOREIGN KEY (`project`) REFERENCES `project` (`idproject`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_proyect_user` FOREIGN KEY (`user_email`) REFERENCES `users` (`email`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investment`
--

LOCK TABLES `investment` WRITE;
/*!40000 ALTER TABLE `investment` DISABLE KEYS */;
/*!40000 ALTER TABLE `investment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project` (
  `idproject` int NOT NULL AUTO_INCREMENT,
  `architect` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `latitude` varchar(25) NOT NULL,
  `length` varchar(25) NOT NULL,
  `interest_rate` decimal(10,2) NOT NULL,
  `min` int NOT NULL,
  `max` int NOT NULL,
  `start_date` timestamp NOT NULL,
  `estimated_end` timestamp NOT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`idproject`),
  KEY `fk_proyect_architect1_idx` (`architect`),
  CONSTRAINT `fk_proyect_architect1` FOREIGN KEY (`architect`) REFERENCES `architect` (`idarchitect`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `email` varchar(255) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(70) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`email`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER TABLE users
ADD COLUMN usertype tinyint DEFAULT 1;

ALTER TABLE architect
DROP COLUMN antecedentes;

ALTER TABLE architect
DROP COLUMN curriculum;


ALTER TABLE project
MODIFY COLUMN total decimal(18,2);

ALTER TABLE project MODIFY COLUMN total decimal(18,2) DEFAULT 0;

ALTER TABLE project ADD COLUMN description MEDIUMTEXT NOT NULL;

ALTER TABLE users ADD COLUMN balance decimal(20, 4) DEFAULT 0;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('fein@fein.fein','','$2b$10$9UjdnHaNVO8ak0SXplX9o.zfcc6BAKzukPwnThkXrjIqP2ukgrAxG','2024-10-16 18:13:24');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;