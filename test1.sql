-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               9.6.0 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             12.15.0.7171
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table dljs.schemes: ~7 rows (approximately)
INSERT INTO `schemes` (`scheme_id`, `name`, `price_per_month`, `planLength`, `gift`, `total_amount`, `company_contribution`, `created_at`) VALUES
	(1, '500 x 11', 500.00, 11, 'GIFT', 6000.00, 500.00, '2026-03-03 13:13:36'),
	(2, '1000 x 11', 1000.00, 11, 'GIFT', 12000.00, 1000.00, '2026-03-03 13:13:36'),
	(3, '1500 x 11', 1500.00, 11, 'GIFT', 18000.00, 1500.00, '2026-03-03 13:13:36'),
	(4, '2000 x 11', 2000.00, 11, 'GIFT', 24000.00, 2000.00, '2026-03-03 13:13:36'),
	(5, '2500 x 11', 2500.00, 11, 'GIFT', 30000.00, 2500.00, '2026-03-03 13:13:36'),
	(6, '5000 x 11', 5000.00, 11, 'GIFT', 60000.00, 5000.00, '2026-03-03 13:13:36'),
	(7, '10000 x 11', 10000.00, 11, 'GIFT', 120000.00, 10000.00, '2026-03-03 13:13:36');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
