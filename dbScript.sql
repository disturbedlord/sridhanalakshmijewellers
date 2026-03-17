-- Create Database dljs
CREATE DATABASE dljs ; 

-- Use dljs
USE dljs;

-- Create User Table
CREATE TABLE users(
    user_id CHAR(36) PRIMARY KEY,
    mobile_no VARCHAR(15) NOT NULL UNIQUE,
    name VARCHAR(64),
    pwd_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create SCHEME Table
CREATE TABLE schemes (
  scheme_id INT  AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,               -- E.g. "500 x 11"
  price_per_month DECIMAL(10, 2) NOT NULL,   -- E.g. 500, 1000
  planLength INT NOT NULL,                       -- Always 11
  gift VARCHAR(255),                        -- E.g. "Gift"
  total_amount DECIMAL(10, 2),              -- E.g. calculated as price_per_unit * units
  company_contribution DECIMAL(10,2) NOT NULL, -- E.g +500
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add Data into Schemes
INSERT INTO `schemes` (`scheme_id`, `name`, `price_per_month`, `planLength`, `gift`, `total_amount`, `company_contribution`, `created_at`) VALUES
	(1, '500 x 11', 500.00, 11, 'GIFT', 6000.00, 500.00, '2026-03-03 13:13:36'),
	(2, '1000 x 11', 1000.00, 11, 'GIFT', 12000.00, 1000.00, '2026-03-03 13:13:36'),
	(3, '1500 x 11', 1500.00, 11, 'GIFT', 18000.00, 1500.00, '2026-03-03 13:13:36'),
	(4, '2000 x 11', 2000.00, 11, 'GIFT', 24000.00, 2000.00, '2026-03-03 13:13:36'),
	(5, '2500 x 11', 2500.00, 11, 'GIFT', 30000.00, 2500.00, '2026-03-03 13:13:36'),
	(6, '5000 x 11', 5000.00, 11, 'GIFT', 60000.00, 5000.00, '2026-03-03 13:13:36'),
	(7, '10000 x 11', 10000.00, 11, 'GIFT', 120000.00, 10000.00, '2026-03-03 13:13:36');

-- create user_devices for secure authentication
CREATE TABLE user_devices (
  id CHAR(36) PRIMARY KEY,  -- UUID

  user_id CHAR(36) NOT NULL,

  device_id VARCHAR(255) NOT NULL,
  device_name VARCHAR(255),
  platform VARCHAR(50),          -- android / ios / web
  app_version VARCHAR(50),
  build_number VARCHAR(50),

  refresh_token_hash TEXT NOT NULL,
  refresh_token_expires_at DATETIME NOT NULL,

  is_active BOOLEAN DEFAULT TRUE,

  last_used_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP 
      ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY uniq_user_device (user_id, device_id),
  INDEX idx_user_device_lookup (user_id, device_id),
  INDEX idx_refresh_expiry (refresh_token_expires_at),

  CONSTRAINT fk_user_devices_user
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
);

-- Track User Scheme Subscriptions

CREATE TABLE user_schemes (
  user_scheme_id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  scheme_id INT NOT NULL,

  start_date DATE NOT NULL,
  maturity_date DATE NOT NULL,

  status ENUM('active','completed','cancelled') DEFAULT 'active',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (scheme_id) REFERENCES schemes(scheme_id)
);

-- Track All Installments

CREATE TABLE installments (
  installment_id CHAR(36) PRIMARY KEY,

  user_scheme_id CHAR(36) NOT NULL,

  installment_number INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,

  due_date DATE NOT NULL,
  paid_date DATE,

  status ENUM('pending','paid','failed','skipped') DEFAULT 'pending',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(user_scheme_id, installment_number),

  FOREIGN KEY (user_scheme_id) REFERENCES user_schemes(user_scheme_id)
);

-- Track all Payment

CREATE TABLE payments (
  payment_id CHAR(36) PRIMARY KEY,

  installment_id CHAR(36) ,

  razorpay_order_id VARCHAR(64) UNIQUE,
  razorpay_payment_id VARCHAR(64) UNIQUE,
  razorpay_signature VARCHAR(255),

  amount DECIMAL(10,2) NOT NULL,

  status ENUM('created','success','failed','refunded') DEFAULT 'created',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (installment_id) REFERENCES installments(installment_id)
);

-- Store Payment Logs
CREATE TABLE payment_logs (
  log_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  razorpay_event VARCHAR(50),
  payload JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE metalPrice (
	id CHAR(36) NOT NULL PRIMARY KEY,
	gold24k CHAR(36) NOT NULL,
	gold18k CHAR(36) NOT NULL,
	gold22k CHAR(36) NOT NULL,
	silver CHAR(36) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO metalPrice VALUES(UUID() , "16600" , "13020" , "15210","296" , NOW())

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image VARCHAR(255),
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_date DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  weight_grams DECIMAL(6,2) NOT NULL,
  purity VARCHAR(100) NOT NULL DEFAULT '925 Sterling Silver',
  image VARCHAR(255) NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  stock_quantity INT NOT NULL DEFAULT 0,
  created_date DATE NOT NULL,
  category_id INT,
  FOREIGN KEY (category_id) REFERENCES categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE orders (
  order_id CHAR(36) PRIMARY KEY,

  user_id CHAR(36) NOT NULL,

  total_amount DECIMAL(10,2) NOT NULL,

  status ENUM(
    'pending',
    'paid',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
  ) DEFAULT 'pending',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,

  order_id CHAR(36) NOT NULL,
  product_id INT NOT NULL,

  quantity INT NOT NULL DEFAULT 1,

  price DECIMAL(10,2) NOT NULL,

  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE addresses (
  id CHAR(36) PRIMARY KEY,

  user_id CHAR(36) NOT NULL,

  name VARCHAR(100),
  phone VARCHAR(15),

  line1 VARCHAR(255),
  line2 VARCHAR(255),

  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(10),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(user_id)
);


CREATE TABLE `carts` (
	`id` CHAR(36) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`user_id` CHAR(36) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`created_at` TIMESTAMP NULL DEFAULT (CURRENT_TIMESTAMP),
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;

CREATE TABLE `cart_items` (
	`id` CHAR(36) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`cart_id` CHAR(36) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`product_id` INT NULL DEFAULT NULL,
	`quantity` INT NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `cart_id` (`cart_id`, `product_id`) USING BTREE,
	UNIQUE INDEX `cart_id_2` (`cart_id`, `product_id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;
