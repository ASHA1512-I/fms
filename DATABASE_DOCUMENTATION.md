# Farm Manager System - MySQL Database Documentation

## Overview
This document describes the complete MySQL database schema for the Farm Manager System (FMS) application. The database is designed to support all modules including Jobs, Animals, Time Tracking, Finance, Staff Management, and Chat.

---

## Database Setup Instructions

### 1. Create the Database
```sql
mysql -u root -p < database_schema.sql
```

### 2. Connect to the Database
```bash
mysql -u root -p farm_manager
```

### 3. Verify Installation
```sql
SHOW TABLES;
SHOW DATABASES;
```

---

## Table Structure & Relationships

### Core Tables

#### 1. **users** - User Authentication & Authorization
Stores login credentials and user information for all roles.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| username | VARCHAR(50) | Unique login identifier |
| password | VARCHAR(255) | Encrypted password (use bcrypt in production) |
| role | ENUM | admin, manager, accountant, worker |
| name | VARCHAR(100) | Full name |
| email | VARCHAR(100) | Email address |
| phone | VARCHAR(20) | Contact number |
| security_question | VARCHAR(200) | Password recovery question |
| security_answer | VARCHAR(100) | Password recovery answer |
| is_active | BOOLEAN | Account status |
| last_login | TIMESTAMP | Last login timestamp |
| created_at | TIMESTAMP | Account creation date |
| updated_at | TIMESTAMP | Last update date |

**Relationships:**
- 1:1 with `staff` (one staff record per user)
- 1:N with `jobs` (assignee or creator)
- 1:N with `time_logs` (employee time tracking)
- 1:N with `transactions` (recorded by)
- 1:N with `chat_messages` (message author)

---

#### 2. **staff** - Employee Information
Extended employee details linked to users table.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| user_id | INT | Foreign key to users |
| department | VARCHAR(100) | Department name (Operations, Finance, etc.) |
| position | VARCHAR(100) | Job position |
| employment_status | ENUM | active, on_leave, suspended, terminated |
| date_hired | DATE | Hire date |
| date_terminated | DATE | Termination date (if applicable) |
| salary | DECIMAL(12,2) | Monthly/annual salary |
| emergency_contact | VARCHAR(100) | Emergency contact name |
| emergency_phone | VARCHAR(20) | Emergency contact phone |
| address | TEXT | Home address |

**Notes:**
- One-to-one relationship with users
- Used for workforce management and reporting

---

#### 3. **roles** & **permissions** - Access Control
Defines role-based access control for the application.

**roles table:**
- admin: Full system access
- manager: Operations and reporting
- accountant: Financial management
- worker: Limited field access

**permissions table:**
- Links specific actions to modules
- Supports granular permission control

---

#### 4. **jobs** - Tasks & Job Management
Stores farm operations tasks and job assignments.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| title | VARCHAR(255) | Job title |
| description | TEXT | Detailed description |
| assignee_id | INT | FK to users (assigned worker) |
| due_date | DATE | Task deadline |
| status | ENUM | open, in_progress, done, cancelled |
| priority | ENUM | low, medium, high, urgent |
| created_by_id | INT | FK to users (creator) |
| created_at | TIMESTAMP | Creation date |
| updated_at | TIMESTAMP | Last update |
| completed_at | TIMESTAMP | Completion timestamp |

**Common Queries:**
```sql
-- Get open jobs by priority
SELECT * FROM jobs WHERE status='open' ORDER BY priority DESC;

-- Get jobs assigned to specific employee
SELECT * FROM jobs WHERE assignee_id=4 AND status!='done';

-- Get overdue jobs
SELECT * FROM jobs WHERE due_date < CURDATE() AND status!='done';
```

---

#### 5. **animals** - Livestock Management
Records all animals on the farm with health and location tracking.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| tag | VARCHAR(50) | Unique animal identifier (e.g., UG-0142) |
| type | VARCHAR(100) | Dairy cow, Calf, Bull, etc. |
| breed | VARCHAR(100) | Breed name |
| status | ENUM | healthy, under_watch, sick, recovered, deceased |
| weight_kg | DECIMAL(8,2) | Current weight |
| location | VARCHAR(100) | Current location (Paddock A, Barn 2, etc.) |
| date_of_birth | DATE | Birth date |
| gender | ENUM | male, female, unknown |
| purchased_date | DATE | Purchase date |
| purchase_price | DECIMAL(12,2) | Purchase cost |
| notes | TEXT | Additional notes |

**Relationships:**
- 1:N with `animal_health_records` (health history)
- 1:N with `production_records` (milk/meat production)

**Common Queries:**
```sql
-- Get all healthy dairy cows
SELECT * FROM animals WHERE type='Dairy cow' AND status='healthy';

-- Get animals in specific location
SELECT * FROM animals WHERE location='Barn 2';

-- Get animals under watch requiring attention
SELECT * FROM animals WHERE status='under_watch' ORDER BY tag;
```

---

#### 6. **animal_health_records** - Health Tracking
Maintains detailed health history for each animal.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| animal_id | INT | FK to animals |
| record_date | DATE | Date of health check |
| health_status | VARCHAR(100) | Current health status |
| weight_kg | DECIMAL(8,2) | Weight at check-in |
| vaccination_name | VARCHAR(100) | Vaccination administered |
| veterinary_notes | TEXT | Veterinary observations |
| recorded_by_id | INT | FK to users (veterinarian) |

**Common Queries:**
```sql
-- Get vaccination history for specific animal
SELECT * FROM animal_health_records WHERE animal_id=1 AND vaccination_name IS NOT NULL;

-- Get recent health checks (last 30 days)
SELECT * FROM animal_health_records WHERE record_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);
```

---

#### 7. **facilities** - Infrastructure Management
Records all farm facilities and their maintenance.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| name | VARCHAR(100) | Facility name |
| type | ENUM | barn, paddock, milking_station, storage, office, other |
| location | VARCHAR(255) | Location on farm |
| capacity | INT | Capacity (animals or units) |
| condition | VARCHAR(100) | Current condition |
| last_maintenance_date | DATE | Last maintenance |
| next_maintenance_date | DATE | Scheduled maintenance |
| notes | TEXT | Additional notes |

---

#### 8. **feed_inventory** - Feed Management
Tracks feed stock and usage.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| feed_name | VARCHAR(100) | Feed name |
| feed_type | ENUM | silage, hay, grain, supplement, other |
| quantity_kg | DECIMAL(10,2) | Current quantity |
| unit_cost | DECIMAL(10,2) | Cost per unit |
| storage_location | VARCHAR(100) | Where stored |
| date_received | DATE | Received date |
| expiry_date | DATE | Expiration date |
| supplier_id | INT | FK to suppliers |
| reorder_level_kg | DECIMAL(10,2) | Minimum reorder quantity |

**Common Queries:**
```sql
-- Get feeds below reorder level
SELECT * FROM feed_inventory WHERE quantity_kg <= reorder_level_kg;

-- Get expired feeds
SELECT * FROM feed_inventory WHERE expiry_date < CURDATE();
```

---

#### 9. **time_logs** - Employee Time Tracking
Records employee clock in/out times and work hours.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| employee_id | INT | FK to users |
| clock_in_time | DATETIME | When clocked in |
| clock_out_time | DATETIME | When clocked out |
| date | DATE | Work date |
| hours_worked | DECIMAL(5,2) | Calculated hours |
| status | ENUM | in_progress, completed, absent |
| notes | TEXT | Additional notes |

**Constraints:**
- Unique combination of employee_id and date (one clock-in per day per employee)

**Common Queries:**
```sql
-- Get current clocked-in employees
SELECT u.name, tl.clock_in_time FROM time_logs tl
JOIN users u ON tl.employee_id = u.id
WHERE tl.date = CURDATE() AND tl.clock_out_time IS NULL;

-- Calculate employee work hours
SELECT employee_id, SUM(hours_worked) as total_hours
FROM time_logs WHERE date BETWEEN '2026-07-01' AND '2026-07-31'
GROUP BY employee_id;
```

---

#### 10. **transactions** - Financial Records
Complete accounting of all farm income and expenses.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| transaction_date | DATE | Transaction date |
| description | VARCHAR(255) | What was the transaction |
| type | ENUM | income or expense |
| amount | DECIMAL(15,2) | Amount (positive for income, negative for expense) |
| category | VARCHAR(100) | Category (Milk sale, Feed, Payroll, etc.) |
| payment_method | ENUM | cash, bank_transfer, cheque, mobile_money, other |
| reference_number | VARCHAR(100) | Invoice/Receipt/Cheque number |
| related_module | VARCHAR(50) | Which module (jobs, animals, etc.) |
| related_id | INT | ID in related module |
| notes | TEXT | Additional notes |
| recorded_by_id | INT | FK to users (accountant) |

**Common Queries:**
```sql
-- Monthly income vs expenses summary
SELECT 
  DATE_FORMAT(transaction_date, '%Y-%m') as month,
  SUM(CASE WHEN type='income' THEN amount ELSE 0 END) as income,
  SUM(CASE WHEN type='expense' THEN ABS(amount) ELSE 0 END) as expenses,
  SUM(amount) as net
FROM transactions
GROUP BY DATE_FORMAT(transaction_date, '%Y-%m');

-- Expense breakdown by category
SELECT category, COUNT(*) as count, SUM(ABS(amount)) as total
FROM transactions WHERE type='expense'
GROUP BY category ORDER BY total DESC;
```

---

#### 11. **chat_channels** - Messaging Infrastructure
Defines communication channels.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| channel_name | VARCHAR(100) | Channel name (General, Livestock team, etc.) |
| description | TEXT | Channel description |
| channel_type | ENUM | general, team, private, announcement |
| created_by_id | INT | FK to users (creator) |
| is_active | BOOLEAN | Active status |

---

#### 12. **chat_channel_members** - Channel Membership
Links users to channels they belong to.

**Purpose:**
- Track who has access to each channel
- Used for channel permission control

---

#### 13. **chat_messages** - Message History
Stores all chat messages.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| channel_id | INT | FK to chat_channels |
| user_id | INT | FK to users (message author) |
| message_text | TEXT | Message content |
| attachment_url | VARCHAR(255) | File attachment URL |
| edited_at | TIMESTAMP | If message was edited |
| created_at | TIMESTAMP | Message timestamp |

---

#### 14. **suppliers** - Vendor Management
Records all suppliers and vendors.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| supplier_name | VARCHAR(100) | Company name |
| contact_person | VARCHAR(100) | Main contact |
| phone | VARCHAR(20) | Contact phone |
| email | VARCHAR(100) | Contact email |
| address | TEXT | Physical address |
| city | VARCHAR(100) | City |
| supplier_type | ENUM | feed, veterinary, equipment, other |
| payment_terms | VARCHAR(100) | Payment terms |
| is_active | BOOLEAN | Active supplier status |

---

#### 15. **farm_profile** - Farm Information
Central farm information and metadata.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| farm_name | VARCHAR(150) | Official farm name |
| founder_name | VARCHAR(100) | Founder name |
| establishment_date | DATE | When farm was established |
| location | VARCHAR(255) | Farm location |
| farm_type | ENUM | dairy, beef, mixed, crop |
| main_crops_livestock | TEXT | List of products |
| logo_url | VARCHAR(255) | Logo image URL |

---

#### 16. **production_records** - Output Tracking
Tracks milk, meat, and other production.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| record_date | DATE | Production date |
| product_type | ENUM | milk, meat, eggs, crop, other |
| quantity | DECIMAL(10,2) | Amount produced |
| unit | VARCHAR(50) | liters, kg, units, etc. |
| animal_id | INT | FK to animals (optional) |
| facility_id | INT | FK to facilities (where produced) |

**Common Queries:**
```sql
-- Daily milk production summary
SELECT record_date, SUM(quantity) as total_liters
FROM production_records
WHERE product_type='milk' AND record_date=CURDATE()
GROUP BY record_date;

-- Production by animal
SELECT a.tag, SUM(pr.quantity) as total_production
FROM production_records pr
JOIN animals a ON pr.animal_id = a.id
WHERE pr.product_type='milk'
GROUP BY a.tag
ORDER BY total_production DESC;
```

---

#### 17. **audit_logs** - Activity Tracking
Tracks all system changes for compliance and debugging.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| user_id | INT | FK to users (who made change) |
| action | VARCHAR(100) | CREATE, UPDATE, DELETE, LOGIN |
| module | VARCHAR(50) | Which module (jobs, animals, etc.) |
| record_id | INT | Record that was changed |
| old_values | JSON | Previous values |
| new_values | JSON | New values |
| ip_address | VARCHAR(45) | IP address of change |
| created_at | TIMESTAMP | When change occurred |

---

## Database Views

### 1. **vw_dashboard_summary**
Quick overview of key metrics for dashboard.

```sql
SELECT * FROM vw_dashboard_summary;
```

Returns:
- healthy_animals
- animals_under_watch
- open_jobs
- completed_jobs
- total_income
- total_expenses
- active_staff

### 2. **vw_staff_directory**
Complete staff listing with user and employment details.

```sql
SELECT * FROM vw_staff_directory ORDER BY name;
```

### 3. **vw_recent_activity**
Last 20 activities across the system.

```sql
SELECT * FROM vw_recent_activity;
```

---

## Stored Procedures

### 1. **sp_calculate_employee_hours**
Calculate total hours worked by an employee during a period.

```sql
CALL sp_calculate_employee_hours(4, '2026-07-01', '2026-07-31', @hours);
SELECT @hours as total_hours;
```

### 2. **sp_monthly_financial_summary**
Generate monthly financial report by category.

```sql
CALL sp_monthly_financial_summary(2026, 7);
```

---

## Common Operations

### Authentication
```sql
-- Login verification
SELECT * FROM users 
WHERE username = 'admin' AND password = 'hashed_password' AND is_active = TRUE;

-- Update last login
UPDATE users SET last_login = NOW() WHERE id = 1;
```

### Dashboard Queries

#### For Admin/Manager:
```sql
-- Jobs by status
SELECT status, COUNT(*) as count FROM jobs GROUP BY status;

-- Animals requiring attention
SELECT * FROM animals WHERE status != 'healthy' ORDER BY tag;

-- Recent transactions
SELECT * FROM transactions ORDER BY transaction_date DESC LIMIT 10;
```

#### For Accountant:
```sql
-- Daily cash flow
SELECT 
  DATE(transaction_date) as date,
  SUM(CASE WHEN type='income' THEN amount ELSE 0 END) as income,
  SUM(CASE WHEN type='expense' THEN ABS(amount) ELSE 0 END) as expenses,
  SUM(amount) as net
FROM transactions
WHERE transaction_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
GROUP BY DATE(transaction_date)
ORDER BY date DESC;
```

#### For Worker:
```sql
-- My active jobs
SELECT * FROM jobs 
WHERE assignee_id = 4 AND status != 'done';

-- Clock in/out status
SELECT * FROM time_logs 
WHERE employee_id = 4 AND date = CURDATE();
```

---

## Performance Optimization

### Key Indexes
The schema includes the following performance indexes:
- `idx_username` - Fast user lookup
- `idx_time_logs_employee_date` - Employee time queries
- `idx_transactions_date_category` - Financial reporting
- `idx_jobs_assignee_status` - Job assignments
- `idx_animals_type_status` - Animal queries
- `idx_chat_messages_channel_date` - Message retrieval

### Query Optimization Tips
1. Always use indexes on WHERE clauses
2. Use DATE_FORMAT() for date grouping
3. Prefer JOINs over subqueries
4. Use LIMIT for large result sets
5. Archive old transactions annually

---

## Security Recommendations

### Password Security
```sql
-- IMPORTANT: In production, use bcrypt or Argon2
-- DO NOT store plain text passwords
UPDATE users SET password = SHA2(password, 256);
```

### User Permissions
```sql
-- Create database user for application
CREATE USER 'fms_app'@'localhost' IDENTIFIED BY 'strong_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON farm_manager.* TO 'fms_app'@'localhost';

-- Create read-only user for reporting
CREATE USER 'fms_reader'@'localhost' IDENTIFIED BY 'strong_password';
GRANT SELECT ON farm_manager.* TO 'fms_reader'@'localhost';
```

### Regular Backups
```bash
# Daily backup
mysqldump -u root -p farm_manager > farm_manager_backup_$(date +%Y%m%d).sql

# Restore from backup
mysql -u root -p farm_manager < farm_manager_backup_20260817.sql
```

---

## Backup & Recovery

### Full Database Backup
```bash
mysqldump -u root -p farm_manager > backup.sql
```

### Backup Specific Table
```bash
mysqldump -u root -p farm_manager jobs time_logs > jobs_backup.sql
```

### Schedule Regular Backups
```bash
# Add to crontab for daily backup at 2 AM
0 2 * * * mysqldump -u root -p farm_manager > /backups/farm_manager_$(date +\%Y\%m\%d).sql
```

---

## Integration with Node.js/Express

### MySQL Connection Example
```javascript
const mysql = require('mysql2/promise');

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'fms_app',
  password: 'strong_password',
  database: 'farm_manager'
});

// Example query
const [rows] = await connection.execute(
  'SELECT * FROM jobs WHERE status = ?',
  ['open']
);
```

### Sample API Endpoints
```javascript
// GET /api/dashboard - Dashboard metrics
// GET /api/jobs - List jobs
// POST /api/jobs - Create job
// GET /api/animals - List animals
// POST /api/animals/health - Add health record
// GET /api/finance/summary - Financial report
// GET /api/time-logs - Employee time data
// POST /api/chat/messages - Send message
```

---

## Troubleshooting

### Check Database Size
```sql
SELECT 
  table_name,
  ROUND(((data_length + index_length) / 1024 / 1024), 2) as size_mb
FROM information_schema.tables
WHERE table_schema = 'farm_manager'
ORDER BY size_mb DESC;
```

### Find Slow Queries
```sql
-- Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;

-- View slow queries
SHOW PROCESSLIST;
```

### Optimize Table
```sql
OPTIMIZE TABLE jobs, animals, transactions;
REPAIR TABLE time_logs;
```

---

## Future Enhancements

1. **Multi-farm Support** - Add farm_id to tables for enterprise use
2. **Role-based Row Security** - Limit data by role and farm
3. **API Audit Trail** - Track all API calls
4. **Data Archiving** - Move old records to archive tables
5. **Replication** - Set up master-slave replication
6. **Full-text Search** - Add full-text indexes for searching jobs/messages

---

## Support & Documentation

For more information:
- MySQL Documentation: https://dev.mysql.com/doc/
- Design Patterns: See this database for normalization examples
- Questions: Refer to the code comments in database_schema.sql

---

**Last Updated:** 2026-08-17  
**Version:** 1.0  
**Author:** Farm Manager Development Team
