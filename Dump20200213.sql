-- MySQL dump 10.13  Distrib 8.0.16, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: final_project
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATED_AT` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin','$2b$08$pIFWynElkV.4njsMIYkBi.anKMxyyuWKWLdVdgqVwJFng6yQTgH5K','2019-08-30 15:46:38',NULL);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) NOT NULL,
  `products_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATED_AT` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `users_id` (`users_id`),
  KEY `products_id` (`products_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`products_id`) REFERENCES `product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (105,1,4,1,'2020-02-12 09:16:43',NULL);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_name` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Tshirt','2019-08-30 15:49:10','2019-08-30 15:49:10'),(2,'Long Sleeve','2019-08-30 15:49:26','2019-08-30 15:49:26'),(3,'Scarf','2019-08-30 15:49:36','2019-08-30 15:49:36'),(4,'Hanging Wall','2019-08-30 15:49:52','2019-08-30 15:49:52');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checkout`
--

DROP TABLE IF EXISTS `checkout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `checkout` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip` int(11) DEFAULT NULL,
  `bank` varchar(255) DEFAULT NULL,
  `kurir_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `order_receipt` varchar(255) DEFAULT NULL,
  `total_harga` int(11) NOT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATED_AT` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `kurir_id` (`kurir_id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `checkout_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `checkout_ibfk_3` FOREIGN KEY (`kurir_id`) REFERENCES `kurir` (`id`) ON DELETE CASCADE,
  CONSTRAINT `checkout_ibfk_4` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkout`
--

LOCK TABLES `checkout` WRITE;
/*!40000 ALTER TABLE `checkout` DISABLE KEYS */;
INSERT INTO `checkout` VALUES (19,1,'rawamemek','indonesia','jakarta',1234,'bca',1,1,'1567445492985image.jpg',100000,'Transaksi Selesai','2019-09-02 17:31:06','2019-09-02 17:32:34'),(20,1,'qwer','indonesia','jakarta',123,'bca',1,1,'1567505046337image.jpeg',3300000,'Transaksi Selesai','2019-09-02 17:33:45','2019-09-03 10:04:18'),(21,11,'sudirman','indonesia','jakarta',11234,'bri',3,1,'1567446650631image.jpg',200000,'Transaksi Selesai','2019-09-02 17:49:34','2019-09-02 17:52:16'),(22,11,'jl rawamemek','indonesia','jakarta',123,'bri',3,1,'1567461943520image.jpg',1485000,'Transaksi Selesai','2019-09-02 22:04:45','2019-09-02 22:05:53'),(23,12,'jln sudirman','indonesia','jakarta',12950,'bca',1,1,'1567490351120image.jpeg',405000,'Transaksi Selesai','2019-09-03 05:57:50','2019-09-03 05:59:32'),(25,13,'sudirman sinarmas','indonesia','jakarta',1234,'cimb',2,1,'1567498287838image.jpg',715000,'Transaksi Selesai','2019-09-03 08:09:42','2019-09-03 08:17:27'),(26,13,'rawamngun','indonesia','depok',1234,'cimb',2,1,'1567498747578image.jpeg',285000,'Transaksi Selesai','2019-09-03 08:13:09','2019-09-03 08:19:26'),(27,13,'rawamangun','indonesia','bekasi',1234,'bca',3,1,'1567498805471image.jpg',135000,'Transaksi Selesai','2019-09-03 08:20:00','2019-09-03 08:24:01'),(28,13,'rawamngun','indonesia','Tangerang',111,'bca',1,1,'1567499080863image.jpg',2000,'Transaksi Selesai','2019-09-03 08:24:31','2019-09-03 08:24:57'),(29,13,'rawamngun','indonesia','jakarta',213,'bca',1,1,NULL,135000,'Transaksi Ditolak','2019-09-03 08:25:30','2019-09-03 08:25:48'),(31,1,'rawamangun','indonesia','jakarta',123,'bca',1,1,'1567513592983image.jpeg',135000,'Transaksi Selesai','2019-09-03 12:23:33','2019-09-10 09:50:59'),(32,1,'rawamemek','indonesia','jakarta',12378,'bca',1,1,'1568734115541image.jpeg',135000,'Transaksi Selesai','2019-09-17 15:26:27','2019-09-17 17:39:29'),(33,1,'rawamangun','indonesia','jakarta',13220,'bca',3,1,'1570677711227image.jpeg',818000,'Transaksi Selesai','2019-10-04 10:44:04','2019-10-10 03:39:34'),(34,1,'','indonesia','jakarta',123,'bca',1,1,'1570683267250image.jpeg',1485000,'Transaksi Selesai','2019-10-10 03:30:06','2019-10-10 04:54:56'),(35,1,'','indonesia','jakarta',123,'bca',1,1,'1570692286105image.jpeg',540000,'Transaksi Selesai','2019-10-10 04:39:24','2019-10-10 07:24:57'),(36,1,'','indonesia','jakarta',123,'bca',1,1,'1570694389837image.jpeg',2320000,'Transaksi Selesai','2019-10-10 07:31:50','2019-10-10 08:31:11'),(37,1,'','indonesia','jakarta',123,'bca',1,1,'1581498770201image.jpeg',1350000,'Transaksi Selesai','2019-10-10 08:18:09','2020-02-12 09:13:08'),(38,1,'rawamemek','indonesia','jakarta',13220,'bca',1,1,NULL,1080000,'Pending','2020-02-12 09:13:46',NULL),(39,16,'rawamangun','indonesia','jakarta',13200,'bca',1,1,'1581499127126image.jpeg',250000,'Dibayar','2020-02-12 09:18:26','2020-02-12 09:18:47');
/*!40000 ALTER TABLE `checkout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kurir`
--

DROP TABLE IF EXISTS `kurir`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `kurir` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kurir_name` varchar(255) DEFAULT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATED_AT` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kurir`
--

LOCK TABLES `kurir` WRITE;
/*!40000 ALTER TABLE `kurir` DISABLE KEYS */;
INSERT INTO `kurir` VALUES (1,'JNE','2019-08-30 16:50:31',NULL),(2,'Tiki','2019-08-30 16:50:39',NULL),(3,'Gojek','2019-08-30 16:50:48',NULL);
/*!40000 ALTER TABLE `kurir` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `products_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATED_AT` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `checkout_id` int(11) DEFAULT (1),
  PRIMARY KEY (`id`),
  KEY `products_id` (`products_id`),
  KEY `checkout_id` (`checkout_id`),
  CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`products_id`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_detail_ibfk_3` FOREIGN KEY (`checkout_id`) REFERENCES `checkout` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (29,4,11,'2019-09-02 22:04:45',NULL,22),(30,4,1,'2019-09-03 05:57:50',NULL,23),(32,7,1,'2019-09-03 05:57:50',NULL,23),(36,6,2,'2019-09-03 08:09:42',NULL,25),(37,17,2,'2019-09-03 08:09:42',NULL,25),(39,20,2,'2019-09-03 08:13:09',NULL,26),(41,28,1,'2019-09-03 08:24:31',NULL,28),(44,4,1,'2019-09-03 12:23:33',NULL,31),(45,4,1,'2019-09-17 15:26:27',NULL,32),(46,28,4,'2019-10-04 10:44:04',NULL,33),(47,7,6,'2019-10-04 10:44:04',NULL,33),(48,5,11,'2019-10-10 03:30:06',NULL,34),(49,7,4,'2019-10-10 04:39:24',NULL,35),(50,14,8,'2019-10-10 07:31:50',NULL,36),(51,5,8,'2019-10-10 07:31:50',NULL,36),(52,6,10,'2019-10-10 08:18:09',NULL,37),(53,4,5,'2020-02-12 09:13:46',NULL,38),(54,9,3,'2020-02-12 09:13:46',NULL,38),(55,26,1,'2020-02-12 09:18:26',NULL,39);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(50) NOT NULL,
  `category_id` int(11) NOT NULL,
  `detail` varchar(255) NOT NULL,
  `comment` varchar(999) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATED_AT` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (4,'Tropis',1,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1581498863591image.jpeg',135000,120,'2019-09-02 18:14:51','2020-02-12 09:14:23'),(5,'Biru Senja',1,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567448387039image.png',135000,120,'2019-09-02 18:15:36','2019-10-09 18:23:32'),(6,'Hijau Sendu',1,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567448398735image.png',135000,120,'2019-09-02 18:15:42','2019-10-09 18:24:21'),(7,'Ceria Kelapa',1,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567448418542image.png',135000,120,'2019-09-02 18:15:48','2019-10-09 18:24:57'),(8,'Sabut Kelapa',1,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567448429525image.png',135000,120,'2019-09-02 18:15:57','2019-10-09 18:25:07'),(9,'product 8',1,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567448569169image.png',135000,120,'2019-09-02 18:16:02','2019-10-09 18:24:00'),(10,'Gading Sendu',1,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567448578745image.png',135000,120,'2019-09-02 18:16:07','2019-10-09 18:25:47'),(11,'Pasir Pantai',1,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567448591256image.png',135000,120,'2019-09-02 18:16:14','2019-10-09 18:26:14'),(12,'Ombak Sore',2,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567449638569image.png',155000,120,'2019-09-02 18:16:55','2019-10-09 18:26:31'),(13,'Kerang Debur',2,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567449649327image.png',155000,120,'2019-09-02 18:17:01','2019-10-09 18:26:56'),(14,'Mentari Sore',2,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567449678864image.png',155000,120,'2019-09-02 18:17:06','2019-10-09 18:27:24'),(15,'Buih Ombak',2,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567449691498image.png',155000,120,'2019-09-02 18:17:11','2019-10-09 18:28:19'),(16,'Ombak Timur',2,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567449701244image.png',155000,120,'2019-09-02 18:17:16','2019-10-09 18:28:46'),(17,'Nuansa Sore',2,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567449714956image.png',155000,120,'2019-09-02 18:17:23','2019-10-09 18:28:59'),(18,'Delima Timur',3,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567450356264image.png',75000,120,'2019-09-02 18:17:49','2019-10-09 18:29:18'),(19,'Kerang Bamboo',3,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567450366775image.png',75000,120,'2019-09-02 18:17:54','2019-10-09 18:30:01'),(20,'Rasta Timur',3,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567450378433image.png',75000,120,'2019-09-02 18:18:01','2019-10-09 18:30:14'),(21,'Rasta Selatan',3,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567450388575image.png',75000,120,'2019-09-02 18:18:06','2019-10-09 18:30:25'),(22,'Desiran Gaduh Ombak',3,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567450400969image.png',75000,120,'2019-09-02 18:18:11','2019-10-09 18:30:48'),(23,'MEntari Sore Hari',4,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567449736412image.png',250000,120,'2019-09-02 18:18:29','2019-10-09 18:31:09'),(24,'Sore Sendu',4,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567449751780image.png',250000,120,'2019-09-02 18:18:35','2019-10-09 18:31:27'),(25,'Sore Kelabu',4,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567449770048image.png',250000,120,'2019-09-02 18:18:40','2019-10-09 18:31:38'),(26,'Mutiara Dasar',4,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567449785021image.png',250000,120,'2019-09-02 18:18:45','2019-10-09 18:32:00'),(27,'Kelabu Dini Hari',4,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567449799188image.png',250000,120,'2019-09-02 18:18:51','2019-10-09 18:32:18'),(28,'Matahari Kelabu',3,'Bahan premium state yang enak digunakan dan memiliki jenis bahan yang menyerap keringatdengan design hijau tropis yang menggambarikan ke sejukan kelapa yang bisa menyegarkan pandangan dan imajinasi hari ini dan seterusnya',NULL,'1567498984881image.jpg',2000,1290,'2019-09-03 08:22:29','2019-10-09 18:32:38');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `size` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `size_s` int(11) DEFAULT NULL,
  `size_m` int(11) DEFAULT NULL,
  `size_l` int(11) DEFAULT NULL,
  `size_xl` int(11) DEFAULT NULL,
  `order_detail_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `order_detail_id` (`order_detail_id`),
  CONSTRAINT `size_ibfk_1` FOREIGN KEY (`order_detail_id`) REFERENCES `order_detail` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` enum('male','Female') DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'dhimas','dhimas','dhimas@gmail.com','Female','$2b$06$ezyCBWE5mNiaeTV9nVgS9ODVCQro/WRebDjBGjZ1okMmGu2l/LsDm','1570140454293image.jpg',0,'2019-08-30 18:40:03','2019-10-09 18:39:29'),(4,'dhimas','dhimas1','dh@gmail.com','male','$2b$06$RerKwy2KzuIv0.FntHRAIeulCSOBdulA7aUfrunCRyxrdM3LZ7B7i',NULL,0,'2019-08-30 18:44:13','2019-08-30 18:44:13'),(7,'dhimas','dhimas2','dhi@gmail.com','male','$2b$06$pIVCWlQnXxfMkCtz6FFt/eTor8U9f5XsyhYl1eM.fJgLUdf2RAk/W',NULL,0,'2019-08-30 18:46:13','2019-08-30 18:46:13'),(10,'dhimas','dhimas3','dhim@gmail.com','male','$2b$06$OpoCr5cQIbiQddy2LyRKB.epHQ19NX6i.nClSuuRjWFFS1eW4VMfm',NULL,0,'2019-08-30 18:46:52','2019-08-30 18:46:52'),(11,'subhan','subhan','subhan@gmail.com','Female','$2b$06$JNhgwZwr.M8JKW4K.mKmCeLfFD/djQNtPSAWYpwO/CvXTtgkeRPaC','1567458146172image.jpg',0,'2019-09-02 17:46:59','2019-09-02 21:02:26'),(12,'dinand123','dinand27','dinand@gmail.com','male','$2b$06$uA1QyICfnt6lPBuEYCxuyOiyMhPZ7VlfXUWRy4N4O0scPc09KvIKS',NULL,0,'2019-09-03 05:54:59','2019-09-03 05:54:59'),(13,'alvinnama','alvin','alvin@gmail.com','Female','$2b$06$kPA/J6d7TAfxC/N2Yo2w1.RIQZehsT5jMbosrdsTmBMeX6TA83BnK',NULL,0,'2019-09-03 08:00:15','2019-09-03 08:00:15'),(16,'aqua','aqua','aqua@aqua.com','male','$2b$06$MIFkclLbucof63P8wsyumeglACxiiEMOnspw1qxpv4vBvNUsPKQ8e',NULL,0,'2020-02-12 09:17:50','2020-02-12 09:17:50');
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

-- Dump completed on 2020-02-13 14:02:08
