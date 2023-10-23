-- MariaDB dump 10.19  Distrib 10.4.27-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: lab-fullstack
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Current Database: `lab-fullstack`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `lab-fullstack` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `lab-fullstack`;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `idadmin` int NOT NULL AUTO_INCREMENT,
  `admin_username` varchar(30) NOT NULL,
  `admin_password` varchar(255) NOT NULL,
  PRIMARY KEY (`idadmin`),
  UNIQUE KEY `admin_username_UNIQUE` (`admin_username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (3,'admin','$2b$10$lBjRH8UmUTUFKXXmeUHCF.Ft5Nk7HAh6l4LBkdUTC5KFsAw1SgXhC');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedbacks` (
  `id_feedback` int NOT NULL AUTO_INCREMENT,
  `feedback_text` tinytext NOT NULL,
  `feedback_rating` smallint NOT NULL,
  `id_user` int NOT NULL,
  `id_subject` int NOT NULL,
  `feedback_date` datetime NOT NULL,
  PRIMARY KEY (`id_feedback`),
  KEY `fk_feedbacks_subjects_idx` (`id_subject`),
  KEY `kf_feedbacks_students_idx` (`id_user`),
  CONSTRAINT `fk_feedbacks_subjects` FOREIGN KEY (`id_subject`) REFERENCES `subjects` (`id_subject`),
  CONSTRAINT `kf_feedbacks_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
INSERT INTO `feedbacks` VALUES (1,'bello',3,9,3,'2023-05-23 11:13:29'),(2,'bellissimo',4,9,5,'2023-11-23 11:13:44'),(3,'non mi è piaciuto',1,9,14,'2023-11-23 11:13:51'),(4,'no thanks',1,9,4,'2023-07-23 11:14:01'),(5,'interessante',3,9,13,'2023-02-23 11:14:13'),(6,'il mio corso preferito',5,1,6,'2023-01-23 11:15:19'),(7,'assolutamente no',1,1,4,'2023-01-23 11:15:31'),(8,'molto interessante',4,1,10,'2023-03-23 11:15:41'),(9,'bello ma lungo',5,1,14,'2023-09-23 11:15:52'),(10,'figata',3,1,3,'2023-12-23 11:16:08'),(11,'non mi è piaciuto',2,1,1,'2023-10-23 11:16:08'),(12,'bellino',3,1,5,'2023-04-23 11:16:08'),(13,'non saprei',2,1,9,'2023-11-23 11:16:08'),(14,'interessante',4,1,2,'2023-03-23 11:16:08'),(15,'bellissimo',5,2,3,'2023-09-23 11:41:12'),(16,'noioso',1,2,14,'2023-10-23 11:41:20'),(17,'il mio preferito',5,2,5,'2023-09-23 11:41:31'),(18,'meraviglioso',5,3,3,'2023-06-23 11:42:06'),(19,'quello che mi aspettavo',4,3,14,'2023-04-23 11:42:15'),(20,'sapevo già tutto',1,3,5,'2023-10-23 11:42:25'),(21,'pessimo',1,3,4,'2023-10-23 11:42:37');
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students` (
  `id_student` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(45) NOT NULL,
  `student_surname` varchar(45) NOT NULL,
  `student_number` char(5) NOT NULL,
  PRIMARY KEY (`id_student`),
  UNIQUE KEY `student_number_UNIQUE` (`student_number`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'Alice','Smith','S001'),(2,'Bob','Johnson','S002'),(3,'Charlie','Williams','S003'),(4,'David','Brown','S004'),(5,'Ella','Jones','S005'),(6,'Frank','Davis','S006'),(7,'Grace','Wilson','S007'),(8,'Henry','Martinez','S008'),(9,'Isabella','Anderson','S009'),(10,'Jack','Hernandez','S010');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subjects` (
  `id_subject` int NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id_subject`),
  UNIQUE KEY `subject_naw_UNIQUE` (`subject_name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (3,'Algoritmi e Strutture Dati'),(14,'Analisi dei Dati'),(5,'Basi di Dati'),(13,'Grafica Computerizzata'),(7,'Ingegneria del Software'),(10,'Intelligenza Artificiale'),(1,'Introduzione alla Programmazione'),(15,'Programmazione Distribuita'),(12,'Programmazione Funzionale'),(9,'Programmazione Mobile'),(2,'Programmazione Orientata agli Oggetti'),(8,'Reti di Calcolatori'),(11,'Sicurezza Informatica'),(6,'Sistemi Operativi'),(4,'Sviluppo Web');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id_user` int NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`),
  CONSTRAINT `fk_users_students` FOREIGN KEY (`id_user`) REFERENCES `students` (`id_student`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'alice.smith@gmail.com','$2b$10$t0rNubKUXgcMVucWKF.lp.nvD/cpHFGFmyKs1JUSRimJTQT8RVI.u'),(2,'bob.johnson@gmail.com','$2b$10$VcJd1dn/Lo3bH4mrpxYCeun2lw/k2yvjlFh3uFkK5q1iru9AnmP/m'),(3,'charlie.williams@gmail.com','$2b$10$AZOe/SnDJUTiG1YSG4Uzm.Ju00U0wT67DbEyqwJ1E9rpOJtXZS4ZG'),(9,'isabella.anderson@gmail.com','$2b$10$o39InBc8QX1rU3IMvDBN1uSr3qi9L6u/3USGj4TSqTREDJpuFxNlO');
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

-- Dump completed on 2023-10-23 13:47:12
