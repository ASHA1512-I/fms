# Farm Manager System - Database Integration Guide

## Quick Start

### 1. Create Database Locally

#### On Windows (MySQL Workbench or Command Line)
```bash
# Open MySQL command line
mysql -u root -p

# Run the schema file
source C:\Users\hp\Desktop\FMS\database_schema.sql

# Verify tables
USE farm_manager;
SHOW TABLES;
```

#### On Mac/Linux
```bash
mysql -u root -p < /path/to/database_schema.sql
```

### 2. Database Connection Credentials

```
Host: localhost
Port: 3306
Database: farm_manager
User: root
Password: [your MySQL password]
```

### 3. Verify Installation

```sql
-- Check all tables created
SHOW TABLES;

-- Check users table
SELECT * FROM users;

-- Check sample data
SELECT COUNT(*) FROM jobs;
SELECT COUNT(*) FROM animals;
SELECT COUNT(*) FROM transactions;
```

---

## Database Diagram (Entity Relationships)

```
┌─────────────────────────────────────────────────────────────────┐
│                    USERS MANAGEMENT LAYER                        │
│                                                                   │
│   ┌──────────┐        ┌──────────┐      ┌────────────┐          │
│   │  users   │───────→│  staff   │      │  roles     │          │
│   │(auth)    │        │(extended)│      │(access)    │          │
│   └──────────┘        └──────────┘      └────────────┘          │
│        ↓                    ↓                    ↓                │
│      roles              dept              role_                   │
│    & security           & position       permissions             │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴──────────┐
                    │                    │
                    ↓                    ↓
┌─────────────────────────────┐  ┌──────────────────────┐
│    OPERATIONS LAYER         │  │   COMMUNICATION LAYER│
│                             │  │                      │
│  ┌────────────────────┐     │  │ ┌──────────────────┐ │
│  │  jobs              │     │  │ │ chat_channels    │ │
│  │(tasks)             │     │  │ │(messaging)       │ │
│  └────────────────────┘     │  │ └──────────────────┘ │
│           ↓                 │  │        ↓             │
│      assignee,              │  │   channel_members   │
│      priority,              │  │        ↓             │
│      status                 │  │   chat_messages     │
│                             │  │                      │
│  ┌────────────────────┐     │  └──────────────────────┘
│  │  animals           │     │
│  │(livestock)         │     │
│  └────────────────────┘     │
│      ↓        ↓             │
│   health    production       │
│   records   records          │
│                             │
│  ┌────────────────────┐     │
│  │  facilities        │     │
│  │(barns, paddocks)   │     │
│  └────────────────────┘     │
│                             │
│  ┌────────────────────┐     │
│  │  feed_inventory    │     │
│  │(feed management)   │     │
│  └────────────────────┘     │
│                             │
└─────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│            FINANCIAL & TRACKING LAYERS                           │
│                                                                   │
│  ┌────────────────┐    ┌─────────────────┐                      │
│  │ transactions   │    │  time_logs      │                      │
│  │(income/expense)│    │(employee hours) │                      │
│  └────────────────┘    └─────────────────┘                      │
│         ↓                      ↓                                  │
│    category            employee_id, date,                       │
│    type                hours_worked                             │
│    amount                                                         │
│                                                                   │
│  ┌────────────────────────────────────────┐                     │
│  │  farm_profile                          │                     │
│  │(farm info & settings)                  │                     │
│  └────────────────────────────────────────┘                     │
│                                                                   │
│  ┌────────────────────────────────────────┐                     │
│  │  audit_logs                            │                     │
│  │(compliance & tracking)                 │                     │
│  └────────────────────────────────────────┘                     │
│                                                                   │
│  ┌────────────────────────────────────────┐                     │
│  │  suppliers                             │                     │
│  │(vendor management)                     │                     │
│  └────────────────────────────────────────┘                     │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Relationships

### 1. User & Staff Management
```
users (1) ──→ (1) staff
  │
  ├─→ time_logs (1:N)
  ├─→ jobs (1:N) - as assignee or creator
  ├─→ chat_messages (1:N)
  └─→ transactions (1:N) - recorded by
```

### 2. Animals & Health
```
animals (1) ──→ (N) animal_health_records
    │
    ├─→ production_records (1:N)
    └─→ status tracking
```

### 3. Operations
```
jobs ←──── assignee (users)
jobs ←──── created_by (users)

animals ──→ location (facilities)

feed_inventory ──→ supplier
feed_inventory ──→ storage_location (facilities)
```

### 4. Financial
```
transactions ←──── recorded_by (users)
transactions ←──── related to jobs/animals/etc
```

### 5. Communication
```
chat_channels (1) ──→ (N) chat_channel_members
chat_channels (1) ──→ (N) chat_messages
chat_messages ←──── author (users)
```

---

## Sample Queries for Common Operations

### Dashboard Statistics

#### Get Farm Overview (Admin Dashboard)
```sql
SELECT 
  (SELECT COUNT(*) FROM animals WHERE status='healthy') as healthy_animals,
  (SELECT COUNT(*) FROM animals WHERE status='under_watch') as animals_needing_attention,
  (SELECT COUNT(*) FROM jobs WHERE status='open') as pending_jobs,
  (SELECT COUNT(*) FROM staff WHERE employment_status='active') as active_staff,
  (SELECT SUM(amount) FROM transactions WHERE type='income' AND MONTH(transaction_date)=MONTH(NOW())) as monthly_income,
  (SELECT ABS(SUM(amount)) FROM transactions WHERE type='expense' AND MONTH(transaction_date)=MONTH(NOW())) as monthly_expenses;
```

### Jobs Management

#### Get All Pending Jobs for Farm Manager
```sql
SELECT 
  j.id,
  j.title,
  u.name as assigned_to,
  j.due_date,
  j.priority,
  CASE 
    WHEN j.due_date < CURDATE() THEN 'OVERDUE'
    WHEN j.due_date = CURDATE() THEN 'TODAY'
    WHEN j.due_date = CURDATE()+1 THEN 'TOMORROW'
    ELSE DATE_FORMAT(j.due_date, '%a, %b %d')
  END as due
FROM jobs j
LEFT JOIN users u ON j.assignee_id = u.id
WHERE j.status = 'open'
ORDER BY j.priority DESC, j.due_date ASC;
```

### Animals Management

#### Get Animals Requiring Health Attention
```sql
SELECT 
  a.tag,
  a.type,
  a.breed,
  a.status,
  a.weight_kg,
  a.location,
  MAX(ahr.record_date) as last_health_check
FROM animals a
LEFT JOIN animal_health_records ahr ON a.id = ahr.animal_id
WHERE a.status IN ('under_watch', 'sick')
GROUP BY a.id
ORDER BY a.status DESC, last_health_check ASC;
```

### Financial Reports

#### Monthly Income vs Expense
```sql
SELECT 
  DATE_FORMAT(transaction_date, '%Y-%m') as month,
  category,
  SUM(CASE WHEN type='income' THEN amount ELSE 0 END) as income,
  SUM(CASE WHEN type='expense' THEN ABS(amount) ELSE 0 END) as expense,
  SUM(amount) as net_amount
FROM transactions
WHERE YEAR(transaction_date) = YEAR(NOW())
GROUP BY DATE_FORMAT(transaction_date, '%Y-%m'), category
ORDER BY DATE_FORMAT(transaction_date, '%Y-%m') DESC, category;
```

### Employee Management

#### Employee Hours Report
```sql
SELECT 
  u.name,
  COUNT(*) as days_worked,
  SUM(tl.hours_worked) as total_hours,
  AVG(tl.hours_worked) as avg_daily_hours,
  MAX(tl.clock_in_time) as last_clockin
FROM time_logs tl
JOIN users u ON tl.employee_id = u.id
WHERE MONTH(tl.date) = MONTH(NOW())
  AND YEAR(tl.date) = YEAR(NOW())
  AND tl.status = 'completed'
GROUP BY u.id
ORDER BY total_hours DESC;
```

### Production Tracking

#### Daily Production Summary
```sql
SELECT 
  DATE_FORMAT(record_date, '%Y-%m-%d') as date,
  product_type,
  SUM(quantity) as total_quantity,
  unit,
  COUNT(*) as num_records
FROM production_records
WHERE record_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
GROUP BY DATE_FORMAT(record_date, '%Y-%m-%d'), product_type, unit
ORDER BY record_date DESC;
```

---

## Connecting with Node.js Backend

### Installation
```bash
npm install mysql2/promise express dotenv
```

### Environment File (.env)
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=fms_app
DB_PASSWORD=your_password
DB_NAME=farm_manager
```

### Database Service (services/database.js)
```javascript
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
```

### Sample API Routes (routes/jobs.js)
```javascript
const express = require('express');
const router = express.Router();
const pool = require('../services/database');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT j.*, u.name as assignee_name FROM jobs j LEFT JOIN users u ON j.assignee_id = u.id ORDER BY j.due_date ASC'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM jobs WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new job
router.post('/', async (req, res) => {
  const { title, description, assignee_id, due_date, priority, created_by_id } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO jobs (title, description, assignee_id, due_date, priority, created_by_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, assignee_id, due_date, priority, created_by_id]
    );
    res.status(201).json({ id: result.insertId, message: 'Job created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update job
router.put('/:id', async (req, res) => {
  const { title, status, priority, assignee_id } = req.body;
  try {
    await pool.query(
      'UPDATE jobs SET title = ?, status = ?, priority = ?, assignee_id = ?, updated_at = NOW() WHERE id = ?',
      [title, status, priority, assignee_id, req.params.id]
    );
    res.json({ message: 'Job updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

---

## Frontend Integration (JavaScript)

### Authentication API
```javascript
// services/auth.js
async function login(username, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return response.json();
}

async function getUser(userId) {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}
```

### Data Fetching
```javascript
// services/api.js
const API_BASE = '/api';

// Jobs
export const jobsAPI = {
  getAll: () => fetch(`${API_BASE}/jobs`).then(r => r.json()),
  getById: (id) => fetch(`${API_BASE}/jobs/${id}`).then(r => r.json()),
  create: (job) => fetch(`${API_BASE}/jobs`, { method: 'POST', body: JSON.stringify(job), headers: { 'Content-Type': 'application/json' } }).then(r => r.json()),
  update: (id, job) => fetch(`${API_BASE}/jobs/${id}`, { method: 'PUT', body: JSON.stringify(job), headers: { 'Content-Type': 'application/json' } }).then(r => r.json())
};

// Animals
export const animalsAPI = {
  getAll: () => fetch(`${API_BASE}/animals`).then(r => r.json()),
  getById: (id) => fetch(`${API_BASE}/animals/${id}`).then(r => r.json()),
  addHealthRecord: (id, record) => fetch(`${API_BASE}/animals/${id}/health`, { method: 'POST', body: JSON.stringify(record) }).then(r => r.json())
};

// Finance
export const financeAPI = {
  getTransactions: () => fetch(`${API_BASE}/transactions`).then(r => r.json()),
  addTransaction: (transaction) => fetch(`${API_BASE}/transactions`, { method: 'POST', body: JSON.stringify(transaction) }).then(r => r.json()),
  getSummary: () => fetch(`${API_BASE}/finance/summary`).then(r => r.json())
};
```

---

## Deployment Considerations

### 1. Hosting MySQL Database

#### Cloud Options:
- **Amazon RDS**: AWS managed MySQL service
- **DigitalOcean**: Managed databases
- **Google Cloud SQL**: Google's managed service
- **Azure Database**: Microsoft's managed service
- **Heroku**: Dev/staging databases

### 2. Backup Strategy
```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/farm_manager"
mkdir -p $BACKUP_DIR

mysqldump -u fms_app -p$DB_PASSWORD farm_manager > $BACKUP_DIR/farm_manager_$DATE.sql

# Keep only last 30 days
find $BACKUP_DIR -name "*.sql" -mtime +30 -delete
```

### 3. Database Optimization for Production
```sql
-- Set proper limits
SET GLOBAL max_connections = 1000;
SET GLOBAL max_allowed_packet = 256M;

-- Configure for performance
SET SESSION sql_mode='STRICT_TRANS_TABLES';

-- Enable query cache (if using MySQL < 8.0)
SET GLOBAL query_cache_size = 268435456;
```

### 4. SSL/TLS Connection (Production)
```javascript
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
    key: fs.readFileSync('./path/to/client-key.pem'),
    cert: fs.readFileSync('./path/to/client-cert.pem'),
    ca: fs.readFileSync('./path/to/ca-cert.pem')
  }
});
```

---

## Testing the Database

### Unit Test Example
```javascript
// tests/database.test.js
const pool = require('../services/database');

describe('Jobs Table', () => {
  test('should create a job', async () => {
    const result = await pool.query(
      'INSERT INTO jobs (title, created_by_id) VALUES (?, ?)',
      ['Test Job', 1]
    );
    expect(result[0].insertId).toBeGreaterThan(0);
  });

  test('should fetch jobs', async () => {
    const [rows] = await pool.query('SELECT * FROM jobs');
    expect(Array.isArray(rows)).toBe(true);
  });
});
```

---

## Monitoring & Maintenance

### Check Database Status
```sql
-- Database size
SELECT 
  SUM(data_length + index_length) / (1024 * 1024) as size_mb
FROM information_schema.tables
WHERE table_schema = 'farm_manager';

-- Table sizes
SELECT 
  table_name,
  ROUND(((data_length + index_length) / 1024 / 1024), 2) as size_mb
FROM information_schema.tables
WHERE table_schema = 'farm_manager'
ORDER BY size_mb DESC;

-- Running processes
SHOW PROCESSLIST;
```

### Regular Maintenance
```sql
-- Analyze tables for optimization
ANALYZE TABLE users, jobs, animals, transactions;

-- Optimize table structure
OPTIMIZE TABLE jobs, animals;

-- Repair corrupted table (if needed)
REPAIR TABLE time_logs;
```

---

## Support & Next Steps

1. ✅ Database created
2. ✅ Schema with 17 tables
3. ✅ Views and stored procedures
4. ✅ Sample data inserted
5. Next: Create Node.js backend API
6. Then: Update frontend to use real database
7. Finally: Deploy to production

---

**Last Updated:** 2026-08-17
