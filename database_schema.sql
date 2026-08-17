-- ============================================================
-- FARM MANAGER SYSTEM - MySQL Database Schema
-- ============================================================
-- Database: farm_manager
-- Created: 2026-08-17
-- Purpose: Complete backend database for the FMS application
-- ============================================================

-- Drop existing database if it exists (for fresh setup)
DROP DATABASE IF EXISTS farm_manager;

-- Create the database
CREATE DATABASE farm_manager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE farm_manager;

-- ============================================================
-- TABLE 1: USERS (Authentication & Authorization)
-- ============================================================
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL, -- In production, use bcrypt/hashing
  role ENUM('admin', 'manager', 'accountant', 'worker') NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  security_question VARCHAR(200),
  security_answer VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_username (username),
  INDEX idx_role (role),
  INDEX idx_is_active (is_active)
);

-- ============================================================
-- TABLE 2: ROLES & PERMISSIONS (Role-Based Access Control)
-- ============================================================
CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  role_name ENUM('admin', 'manager', 'accountant', 'worker') UNIQUE NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE permissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  permission_name VARCHAR(100) UNIQUE NOT NULL,
  description VARCHAR(255),
  module_id VARCHAR(50), -- References module IDs from MODULES array
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE role_permissions (
  role_id INT NOT NULL,
  permission_id INT NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- ============================================================
-- TABLE 3: JOBS & TASKS
-- ============================================================
CREATE TABLE jobs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  assignee_id INT,
  due_date DATE,
  status ENUM('open', 'in_progress', 'done', 'cancelled') DEFAULT 'open',
  priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
  created_by_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  FOREIGN KEY (assignee_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by_id) REFERENCES users(id),
  INDEX idx_status (status),
  INDEX idx_priority (priority),
  INDEX idx_due_date (due_date),
  INDEX idx_assignee (assignee_id)
);

-- ============================================================
-- TABLE 4: ANIMALS (Livestock Management)
-- ============================================================
CREATE TABLE animals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  tag VARCHAR(50) UNIQUE NOT NULL, -- e.g., 'UG-0142'
  type VARCHAR(100) NOT NULL, -- e.g., 'Dairy cow', 'Calf'
  breed VARCHAR(100),
  status ENUM('healthy', 'under_watch', 'sick', 'recovered', 'deceased') DEFAULT 'healthy',
  weight_kg DECIMAL(8, 2),
  location VARCHAR(100), -- Paddock A, Barn 2, etc.
  date_of_birth DATE,
  gender ENUM('male', 'female', 'unknown') DEFAULT 'unknown',
  purchased_date DATE,
  purchase_price DECIMAL(12, 2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_tag (tag),
  INDEX idx_type (type),
  INDEX idx_status (status),
  INDEX idx_location (location)
);

-- ============================================================
-- TABLE 5: ANIMAL HEALTH RECORDS
-- ============================================================
CREATE TABLE animal_health_records (
  id INT PRIMARY KEY AUTO_INCREMENT,
  animal_id INT NOT NULL,
  record_date DATE NOT NULL,
  health_status VARCHAR(100),
  weight_kg DECIMAL(8, 2),
  vaccination_name VARCHAR(100),
  veterinary_notes TEXT,
  recorded_by_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE,
  FOREIGN KEY (recorded_by_id) REFERENCES users(id),
  INDEX idx_animal (animal_id),
  INDEX idx_record_date (record_date)
);

-- ============================================================
-- TABLE 6: FACILITIES (Barn, Paddock, Equipment)
-- ============================================================
CREATE TABLE facilities (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  type ENUM('barn', 'paddock', 'milking_station', 'storage', 'office', 'other') DEFAULT 'other',
  location VARCHAR(255),
  capacity INT, -- Number of animals or storage units
  condition VARCHAR(100),
  last_maintenance_date DATE,
  next_maintenance_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_type (type),
  INDEX idx_name (name)
);

-- ============================================================
-- TABLE 7: FEED INVENTORY
-- ============================================================
CREATE TABLE feed_inventory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  feed_name VARCHAR(100) NOT NULL,
  feed_type ENUM('silage', 'hay', 'grain', 'supplement', 'other') DEFAULT 'other',
  quantity_kg DECIMAL(10, 2) NOT NULL,
  unit_cost DECIMAL(10, 2),
  storage_location VARCHAR(100),
  date_received DATE,
  expiry_date DATE,
  supplier_id INT,
  reorder_level_kg DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_feed_type (feed_type),
  INDEX idx_storage_location (storage_location)
);

-- ============================================================
-- TABLE 8: EMPLOYEE TIME TRACKING
-- ============================================================
CREATE TABLE time_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id INT NOT NULL,
  clock_in_time DATETIME NOT NULL,
  clock_out_time DATETIME,
  date DATE NOT NULL,
  hours_worked DECIMAL(5, 2),
  status ENUM('in_progress', 'completed', 'absent') DEFAULT 'in_progress',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_employee (employee_id),
  INDEX idx_date (date),
  INDEX idx_status (status),
  UNIQUE KEY unique_daily_clock_in (employee_id, date)
);

-- ============================================================
-- TABLE 9: FINANCIAL TRANSACTIONS
-- ============================================================
CREATE TABLE transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  transaction_date DATE NOT NULL,
  description VARCHAR(255) NOT NULL,
  type ENUM('income', 'expense') NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  category VARCHAR(100), -- e.g., 'Milk sale', 'Feed', 'Veterinary', 'Payroll'
  payment_method ENUM('cash', 'bank_transfer', 'cheque', 'mobile_money', 'other') DEFAULT 'cash',
  reference_number VARCHAR(100), -- Invoice #, Receipt #, etc.
  related_module VARCHAR(50), -- 'animal', 'jobs', 'people', etc.
  related_id INT, -- ID in the related module
  notes TEXT,
  recorded_by_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (recorded_by_id) REFERENCES users(id),
  INDEX idx_type (type),
  INDEX idx_date (transaction_date),
  INDEX idx_category (category),
  INDEX idx_payment_method (payment_method)
);

-- ============================================================
-- TABLE 10: STAFF INFORMATION
-- ============================================================
CREATE TABLE staff (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL UNIQUE,
  department VARCHAR(100),
  position VARCHAR(100),
  employment_status ENUM('active', 'on_leave', 'suspended', 'terminated') DEFAULT 'active',
  date_hired DATE,
  date_terminated DATE,
  salary DECIMAL(12, 2),
  emergency_contact VARCHAR(100),
  emergency_phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_status (employment_status),
  INDEX idx_department (department)
);

-- ============================================================
-- TABLE 11: CHAT CHANNELS
-- ============================================================
CREATE TABLE chat_channels (
  id INT PRIMARY KEY AUTO_INCREMENT,
  channel_name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  channel_type ENUM('general', 'team', 'private', 'announcement') DEFAULT 'general',
  created_by_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by_id) REFERENCES users(id),
  INDEX idx_channel_type (channel_type)
);

-- ============================================================
-- TABLE 12: CHAT CHANNEL MEMBERS
-- ============================================================
CREATE TABLE chat_channel_members (
  id INT PRIMARY KEY AUTO_INCREMENT,
  channel_id INT NOT NULL,
  user_id INT NOT NULL,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (channel_id, user_id),
  FOREIGN KEY (channel_id) REFERENCES chat_channels(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_channel (channel_id),
  INDEX idx_user (user_id)
);

-- ============================================================
-- TABLE 13: CHAT MESSAGES
-- ============================================================
CREATE TABLE chat_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  channel_id INT NOT NULL,
  user_id INT NOT NULL,
  message_text TEXT NOT NULL,
  attachment_url VARCHAR(255),
  edited_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (channel_id) REFERENCES chat_channels(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_channel (channel_id),
  INDEX idx_user (user_id),
  INDEX idx_created_at (created_at)
);

-- ============================================================
-- TABLE 14: SUPPLIERS (for Feed and other supplies)
-- ============================================================
CREATE TABLE suppliers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  supplier_name VARCHAR(100) NOT NULL,
  contact_person VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100),
  address TEXT,
  city VARCHAR(100),
  supplier_type ENUM('feed', 'veterinary', 'equipment', 'other') DEFAULT 'other',
  payment_terms VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_supplier_type (supplier_type),
  INDEX idx_name (supplier_name)
);

-- ============================================================
-- TABLE 15: FARM PROFILE
-- ============================================================
CREATE TABLE farm_profile (
  id INT PRIMARY KEY AUTO_INCREMENT,
  farm_name VARCHAR(150) NOT NULL,
  founder_name VARCHAR(100),
  establishment_date DATE,
  location VARCHAR(255),
  city VARCHAR(100),
  country VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100),
  farm_size_acres DECIMAL(8, 2),
  farm_type ENUM('dairy', 'beef', 'mixed', 'crop') DEFAULT 'mixed',
  main_crops_livestock TEXT, -- JSON or comma-separated
  logo_url VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLE 16: PRODUCTION RECORDS
-- ============================================================
CREATE TABLE production_records (
  id INT PRIMARY KEY AUTO_INCREMENT,
  record_date DATE NOT NULL,
  product_type ENUM('milk', 'meat', 'eggs', 'crop', 'other') DEFAULT 'milk',
  quantity DECIMAL(10, 2),
  unit VARCHAR(50), -- liters, kg, units
  animal_id INT,
  facility_id INT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE SET NULL,
  FOREIGN KEY (facility_id) REFERENCES facilities(id) ON DELETE SET NULL,
  INDEX idx_record_date (record_date),
  INDEX idx_product_type (product_type)
);

-- ============================================================
-- TABLE 17: AUDIT LOG (for tracking changes)
-- ============================================================
CREATE TABLE audit_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  action VARCHAR(100), -- 'CREATE', 'UPDATE', 'DELETE', 'LOGIN'
  module VARCHAR(50), -- 'jobs', 'animals', 'finance', etc.
  record_id INT,
  old_values JSON,
  new_values JSON,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user (user_id),
  INDEX idx_action (action),
  INDEX idx_created_at (created_at)
);

-- ============================================================
-- INITIAL DATA INSERTION
-- ============================================================

-- Insert Roles
INSERT INTO roles (role_name, description) VALUES
('admin', 'Full system access and administrative privileges'),
('manager', 'Farm operations management and reporting'),
('accountant', 'Financial records and reporting'),
('worker', 'Farm worker with limited access');

-- Insert Default Users
INSERT INTO users (username, password, role, name, email, security_question, security_answer) VALUES
('admin', 'admin123', 'admin', 'Grace Nakato', 'grace.nakato@farm.local', 'Name of the farm\'s founder?', 'milc'),
('manager', 'manager123', 'manager', 'Peter Okello', 'peter.okello@farm.local', 'First crop grown on the farm?', 'maize'),
('accountant', 'acc123', 'accountant', 'Sarah Namuli', 'sarah.namuli@farm.local', 'Farm\'s nearest town?', 'mukono'),
('worker', 'worker123', 'worker', 'James Otieno', 'james.otieno@farm.local', 'Name of your first animal?', 'bella');

-- Insert Staff Information
INSERT INTO staff (user_id, department, position, employment_status, date_hired) VALUES
(1, 'Management', 'Administrator', 'active', '2024-01-01'),
(2, 'Operations', 'Farm Manager', 'active', '2024-01-05'),
(3, 'Finance', 'Accountant', 'active', '2024-01-10'),
(4, 'Livestock', 'Farm Worker', 'active', '2024-02-01');

-- Insert Farm Profile
INSERT INTO farm_profile (farm_name, founder_name, location, city, country, farm_type) VALUES
('MILC Farm', 'MILC Founder', 'Rural District', 'Mukono', 'Uganda', 'dairy');

-- Insert Chat Channels
INSERT INTO chat_channels (channel_name, description, channel_type, created_by_id) VALUES
('General', 'General farm announcements and discussions', 'general', 1),
('Livestock team', 'Livestock management team channel', 'team', 2),
('Maintenance', 'Maintenance and facility issues', 'team', 2),
('Management', 'Management discussions', 'private', 1);

-- Insert Chat Channel Members
INSERT INTO chat_channel_members (channel_id, user_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4),
(2, 2), (2, 4),
(3, 1), (3, 2),
(4, 1), (4, 2), (4, 3);

-- Insert Animals
INSERT INTO animals (tag, type, breed, status, weight_kg, location, gender) VALUES
('UG-0142', 'Dairy cow', 'Friesian', 'healthy', 480.00, 'Paddock A', 'female'),
('UG-0143', 'Dairy cow', 'Ankole', 'under_watch', 410.00, 'Barn 2', 'female'),
('UG-0144', 'Calf', 'Friesian', 'healthy', 92.00, 'Nursery', 'female'),
('UG-0145', 'Dairy cow', 'Jersey', 'healthy', 395.00, 'Paddock A', 'female');

-- Insert Facilities
INSERT INTO facilities (name, type, location, capacity) VALUES
('Barn 1', 'barn', 'North Wing', 20),
('Barn 2', 'barn', 'East Wing', 15),
('Paddock A', 'paddock', 'South Field', 50),
('Milking Station', 'milking_station', 'Central', 10);

-- Insert Jobs
INSERT INTO jobs (title, description, assignee_id, due_date, status, priority, created_by_id) VALUES
('Move dairy herd to east paddock', 'Transfer herd from Paddock A to Paddock B', 4, CURDATE(), 'open', 'high', 2),
('Repair fence — north boundary', 'Fix damaged fence on north boundary', 4, DATE_ADD(CURDATE(), INTERVAL 1 DAY), 'open', 'medium', 2),
('Restock mineral licks, barn 2', 'Replenish mineral licks in Barn 2', NULL, DATE_ADD(CURDATE(), INTERVAL 5 DAY), 'open', 'low', 2),
('Vaccinate calves (batch 12)', 'Vaccinate calf batch 12', 4, DATE_ADD(CURDATE(), INTERVAL 3 DAY), 'done', 'high', 2);

-- Insert Time Logs
INSERT INTO time_logs (employee_id, clock_in_time, clock_out_time, date, hours_worked, status) VALUES
(4, DATE_ADD(CURDATE(), INTERVAL '6:02' HOUR_MINUTE), NULL, CURDATE(), NULL, 'in_progress'),
(4, DATE_SUB(CURDATE(), INTERVAL 1 DAY) + INTERVAL '6:10' HOUR_MINUTE, DATE_SUB(CURDATE(), INTERVAL 1 DAY) + INTERVAL '16:45' HOUR_MINUTE, DATE_SUB(CURDATE(), INTERVAL 1 DAY), 10.58, 'completed'),
(2, DATE_SUB(CURDATE(), INTERVAL 1 DAY) + INTERVAL '7:00' HOUR_MINUTE, DATE_SUB(CURDATE(), INTERVAL 1 DAY) + INTERVAL '17:30' HOUR_MINUTE, DATE_SUB(CURDATE(), INTERVAL 1 DAY), 10.50, 'completed');

-- Insert Transactions
INSERT INTO transactions (transaction_date, description, type, amount, category, reference_number, recorded_by_id) VALUES
('2026-07-12', 'Milk sale — Mukono Dairy Co-op', 'income', 2450000, 'Milk sale', 'MUK-001', 3),
('2026-07-10', 'Feed supplier invoice #2291', 'expense', -860000, 'Feed', 'FLI-2291', 3),
('2026-07-09', 'Veterinary services', 'expense', -210000, 'Veterinary', 'VET-001', 3),
('2026-07-07', 'Livestock sale — 2 head', 'income', 1800000, 'Livestock sale', 'LS-001', 3),
('2026-07-03', 'Worker payroll — June', 'expense', -1340000, 'Payroll', 'PAY-0626', 3);

-- Insert Feed Inventory
INSERT INTO feed_inventory (feed_name, feed_type, quantity_kg, unit_cost, storage_location, date_received) VALUES
('Dairy Concentrate Mix', 'grain', 500.00, 1200, 'Feed Store 1', '2026-07-01'),
('Timothy Hay', 'hay', 2000.00, 800, 'Hay Shed', '2026-07-05'),
('Mineral Supplement', 'supplement', 150.00, 3500, 'Storage Room', '2026-07-08');

-- Insert Suppliers
INSERT INTO suppliers (supplier_name, contact_person, phone, email, supplier_type, city) VALUES
('Mukono Feed Co.', 'Joseph Kabuye', '+256-700-123456', 'supply@mukonofeed.ug', 'feed', 'Mukono'),
('Kampala Veterinary', 'Dr. Mutesi', '+256-701-234567', 'contact@kampvet.ug', 'veterinary', 'Kampala'),
('Farm Equipment Ltd', 'David Nkosi', '+256-702-345678', 'sales@farmequip.ug', 'equipment', 'Kampala');

-- Insert Chat Messages
INSERT INTO chat_messages (channel_id, user_id, message_text) VALUES
(1, 2, 'Morning all — vet visit confirmed for 2pm today.'),
(1, 4, 'Noted, herd will be in barn 2 by then.'),
(2, 3, 'Feed invoice looks higher than last month, can someone confirm quantities?');

-- ============================================================
-- CREATE VIEWS FOR COMMON QUERIES
-- ============================================================

-- Dashboard Summary View (Admin)
CREATE VIEW vw_dashboard_summary AS
SELECT 
  (SELECT COUNT(*) FROM animals WHERE status = 'healthy') as healthy_animals,
  (SELECT COUNT(*) FROM animals WHERE status = 'under_watch') as animals_under_watch,
  (SELECT COUNT(*) FROM jobs WHERE status = 'open') as open_jobs,
  (SELECT COUNT(*) FROM jobs WHERE status = 'done') as completed_jobs,
  (SELECT SUM(amount) FROM transactions WHERE type = 'income') as total_income,
  (SELECT SUM(ABS(amount)) FROM transactions WHERE type = 'expense') as total_expenses,
  (SELECT COUNT(*) FROM staff WHERE employment_status = 'active') as active_staff;

-- Staff Directory View
CREATE VIEW vw_staff_directory AS
SELECT 
  u.id,
  u.name,
  u.username,
  u.email,
  u.role,
  s.department,
  s.position,
  s.employment_status,
  s.date_hired
FROM users u
LEFT JOIN staff s ON u.id = s.user_id
WHERE u.is_active = TRUE
ORDER BY u.name;

-- Recent Activity View
CREATE VIEW vw_recent_activity AS
SELECT 
  'Job Update' as activity_type,
  j.title as description,
  j.updated_at,
  j.status as activity_status,
  u.name as user_name
FROM jobs j
LEFT JOIN users u ON j.created_by_id = u.id
UNION ALL
SELECT 
  'Health Record',
  CONCAT('Animal ', a.tag, ' - ', ahr.health_status),
  ahr.created_at,
  ahr.health_status,
  u.name
FROM animal_health_records ahr
JOIN animals a ON ahr.animal_id = a.id
JOIN users u ON ahr.recorded_by_id = u.id
UNION ALL
SELECT 
  'Transaction',
  t.description,
  t.created_at,
  t.type,
  u.name
FROM transactions t
JOIN users u ON t.recorded_by_id = u.id
ORDER BY updated_at DESC
LIMIT 20;

-- ============================================================
-- STORED PROCEDURES
-- ============================================================

-- Procedure to calculate hours worked by employee
DELIMITER $$
CREATE PROCEDURE sp_calculate_employee_hours (
  IN p_employee_id INT,
  IN p_start_date DATE,
  IN p_end_date DATE,
  OUT p_total_hours DECIMAL(8, 2)
)
BEGIN
  SELECT COALESCE(SUM(hours_worked), 0)
  INTO p_total_hours
  FROM time_logs
  WHERE employee_id = p_employee_id
    AND date BETWEEN p_start_date AND p_end_date
    AND status = 'completed';
END$$
DELIMITER ;

-- Procedure to get monthly financial summary
DELIMITER $$
CREATE PROCEDURE sp_monthly_financial_summary (
  IN p_year INT,
  IN p_month INT
)
BEGIN
  SELECT 
    DATE_FORMAT(DATE(transaction_date), '%Y-%m') as period,
    category,
    type,
    COUNT(*) as transaction_count,
    SUM(amount) as total_amount
  FROM transactions
  WHERE YEAR(transaction_date) = p_year
    AND MONTH(transaction_date) = p_month
  GROUP BY category, type
  ORDER BY type DESC, total_amount DESC;
END$$
DELIMITER ;

-- ============================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================

-- Additional composite indexes for common queries
CREATE INDEX idx_time_logs_employee_date ON time_logs(employee_id, date);
CREATE INDEX idx_transactions_date_category ON transactions(transaction_date, category);
CREATE INDEX idx_jobs_assignee_status ON jobs(assignee_id, status);
CREATE INDEX idx_chat_messages_channel_date ON chat_messages(channel_id, created_at);
CREATE INDEX idx_animals_type_status ON animals(type, status);
CREATE INDEX idx_animal_health_records_animal_date ON animal_health_records(animal_id, record_date);

-- ============================================================
-- END OF DATABASE SCHEMA
-- ============================================================
