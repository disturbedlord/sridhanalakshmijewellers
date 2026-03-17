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

-- Dumping data for table dljs.categories: ~13 rows (approximately)
INSERT INTO `categories` (`id`, `name`, `description`, `image`, `is_active`, `created_date`) VALUES
	(1, 'Anklet', 'Discover our exquisite collection of sterling silver anklets, crafted with precision and elegance for those seeking to elevate their leg jewellery with timeless style. From delicate chains to ornamental designs, our anklets are perfect for adding a subtle sparkle to any occasion, whether for everyday wear or special celebrations.', '/assets/images/categories/anklet.webp', 1, '2024-01-01'),
	(2, 'Bangle', 'Discover our exquisite collection of silver bangles, expertly crafted to add timeless elegance to any wrist. From delicate minimalist designs to ornate statement pieces, our bangles appeal to those seeking versatile, high-quality silver jewellery that seamlessly transitions from everyday wear to special occasions.', '/assets/images/categories/bangle.webp', 1, '2024-01-01'),
	(3, 'Bracelet', 'Discover our exquisite collection of sterling silver bracelets, featuring timeless designs from delicate chains to bold statement pieces that elevate any occasion. Perfect for those seeking sophisticated, versatile jewelry that complements both everyday style and special moments.', '/assets/images/categories/bracelet.webp', 1, '2024-01-01'),
	(4, 'Brooch', 'Discover our exquisite collection of silver brooches, timeless pieces that add sophistication and elegance to any ensemble. Crafted with meticulous attention to detail, our brooches appeal to discerning jewelry enthusiasts and fashion-forward individuals seeking to elevate their style with versatile, statement-making accessories.', '/assets/images/categories/brooch.webp', 1, '2024-01-01'),
	(5, 'Chain', 'Discover our exquisite collection of sterling silver chains, crafted to elevate any look with timeless elegance and versatility. From delicate, minimalist designs to bold statement pieces, our chains appeal to jewelry enthusiasts seeking quality craftsmanship and the perfect foundation for layering or wearing solo.', '/assets/images/categories/chain.webp', 1, '2024-01-01'),
	(6, 'Cufflink', 'Elevate your formal attire with our exquisite collection of silver cufflinks, expertly crafted to add sophistication and polish to any gentleman\'s wardrobe. From classic designs to contemporary styles, our cufflinks appeal to discerning professionals and those seeking timeless accessories that make a refined statement.', '/assets/images/categories/cufflink.webp', 1, '2024-01-01'),
	(7, 'Earring', 'Discover our exquisite collection of silver earrings, crafted to elevate any style from casual to sophisticated. Each piece combines timeless elegance with contemporary design, perfect for those who appreciate quality craftsmanship and versatile accessories that complement every occasion.', '/assets/images/categories/earring.webp', 1, '2024-01-01'),
	(8, 'Hair Pin', 'Elevate your everyday style with our exquisite collection of silver hair pins, crafted to add a touch of sophisticated elegance to any hairstyle. Perfect for both minimalist and ornate tastes, these versatile accessories appeal to anyone seeking timeless beauty and refined craftsmanship in their personal grooming.', '/assets/images/categories/hair-pin.webp', 1, '2024-01-01'),
	(9, 'Necklace', 'Discover our exquisite collection of sterling silver necklaces, featuring timeless designs from delicate chains to statement pieces that complement any occasion. Perfect for those who appreciate refined elegance, each necklace combines craftsmanship with versatility, making it an essential accessory for everyday wear or special moments.', '/assets/images/categories/necklace.webp', 1, '2024-01-01'),
	(10, 'Nose Pin', 'Discover our exquisite collection of silver nose pins, featuring delicate designs from traditional studs to modern artistic pieces crafted from premium sterling silver. Perfect for anyone seeking elegant, versatile adornments that add a touch of sophistication to any occasion.', '/assets/images/categories/nose-pin.webp', 1, '2024-01-01'),
	(11, 'Pendant', 'Elegant silver pendants designed to complement any style, from delicate minimalist pieces to bold statement designs. Perfect for those seeking timeless jewelry that adds sophistication to everyday wear or special occasions.', '/assets/images/categories/pendant.webp', 1, '2024-01-01'),
	(12, 'Ring', 'Discover our exquisite collection of sterling silver rings, expertly crafted to complement any occasion—from timeless classics to contemporary designs. Perfect for those seeking elegant, versatile pieces that blend sophistication with quality craftsmanship.', '/assets/images/categories/ring.webp', 1, '2024-01-01'),
	(13, 'Toe Ring', 'Discover our exquisite collection of sterling silver toe rings, designed to add a delicate touch of elegance to your feet. Perfect for beach lovers, bohemian style enthusiasts, and anyone seeking to express their individuality with understated, timeless jewellery.', '/assets/images/categories/toe-ring.webp', 1, '2024-01-01');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
