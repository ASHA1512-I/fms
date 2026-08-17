# Farm Manager System - REST API Specification

## Overview
This document defines the REST API endpoints for the Farm Manager System backend that connects to the MySQL database.

## Base URL
```
Development: http://localhost:3000/api
Production: https://api.farmmanager.com/api
```

## Authentication
All endpoints require a valid JWT token in the Authorization header (except login):
```
Authorization: Bearer <jwt_token>
```

---

## Authentication Endpoints

### 1. Login
**POST** `/auth/login`

**Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "admin",
    "name": "Grace Nakato",
    "role": "admin",
    "email": "grace.nakato@farm.local"
  }
}
```

**Error (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 2. Logout
**POST** `/auth/logout`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 3. Reset Password Step 1 - Identify User
**POST** `/auth/reset/step1`

**Request:**
```json
{
  "username": "admin"
}
```

**Response (200):**
```json
{
  "success": true,
  "step": 1,
  "security_question": "Name of the farm's founder?",
  "message": "Security question retrieved"
}
```

---

### 4. Reset Password Step 2 - Answer Security Question
**POST** `/auth/reset/step2`

**Request:**
```json
{
  "username": "admin",
  "answer": "milc"
}
```

**Response (200):**
```json
{
  "success": true,
  "step": 2,
  "message": "Answer verified. Proceed to set new password."
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "Incorrect answer"
}
```

---

### 5. Reset Password Step 3 - Set New Password
**POST** `/auth/reset/step3`

**Request:**
```json
{
  "username": "admin",
  "new_password": "newpassword123",
  "confirm_password": "newpassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

---

## Users Endpoints

### 1. Get Current User
**GET** `/users/me`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "id": 1,
  "username": "admin",
  "name": "Grace Nakato",
  "role": "admin",
  "email": "grace.nakato@farm.local",
  "phone": "+256-700-123456",
  "last_login": "2026-08-17T10:30:00Z",
  "created_at": "2026-01-01T00:00:00Z"
}
```

---

### 2. Get All Users (Admin Only)
**GET** `/users`

**Query Parameters:**
- `role` - Filter by role (optional): admin, manager, accountant, worker
- `status` - Filter by status (optional): active, inactive
- `page` - Page number (optional, default: 1)
- `limit` - Results per page (optional, default: 20)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "username": "admin",
      "name": "Grace Nakato",
      "role": "admin",
      "email": "grace.nakato@farm.local",
      "is_active": true,
      "last_login": "2026-08-17T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 4,
    "pages": 1
  }
}
```

---

### 3. Create User (Admin Only)
**POST** `/users`

**Request:**
```json
{
  "username": "newuser",
  "password": "temppassword123",
  "role": "worker",
  "name": "New Worker",
  "email": "newworker@farm.local",
  "phone": "+256-700-000000",
  "security_question": "What is your favorite color?",
  "security_answer": "blue"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": 5,
    "username": "newuser",
    "name": "New Worker",
    "role": "worker"
  }
}
```

---

### 4. Update User
**PUT** `/users/:id`

**Request:**
```json
{
  "name": "Updated Name",
  "email": "updated@farm.local",
  "phone": "+256-700-999999"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User updated successfully"
}
```

---

### 5. Get Staff Directory
**GET** `/users/staff/directory`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Grace Nakato",
      "username": "admin",
      "email": "grace.nakato@farm.local",
      "role": "admin",
      "department": "Management",
      "position": "Administrator",
      "employment_status": "active",
      "date_hired": "2024-01-01"
    }
  ]
}
```

---

## Jobs Endpoints

### 1. Get All Jobs
**GET** `/jobs`

**Query Parameters:**
- `status` - Filter by status: open, in_progress, done, cancelled
- `priority` - Filter by priority: low, medium, high, urgent
- `assignee_id` - Filter by assignee
- `sort` - Sort field: due_date, priority, created_at
- `order` - Sort order: ASC or DESC
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 20)

**Example:**
```
GET /jobs?status=open&priority=high&sort=due_date&order=ASC
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Move dairy herd to east paddock",
      "description": "Transfer herd from Paddock A to Paddock B",
      "assignee": {
        "id": 4,
        "name": "James Otieno"
      },
      "due_date": "2026-08-17",
      "status": "open",
      "priority": "high",
      "created_by": {
        "id": 2,
        "name": "Peter Okello"
      },
      "created_at": "2026-08-15T08:00:00Z",
      "updated_at": "2026-08-17T10:30:00Z",
      "completed_at": null
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 4,
    "pages": 1
  }
}
```

---

### 2. Get Job by ID
**GET** `/jobs/:id`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Move dairy herd to east paddock",
    "description": "Transfer herd from Paddock A to Paddock B",
    "assignee": {
      "id": 4,
      "name": "James Otieno"
    },
    "due_date": "2026-08-17",
    "status": "open",
    "priority": "high",
    "created_by": {
      "id": 2,
      "name": "Peter Okello"
    },
    "created_at": "2026-08-15T08:00:00Z",
    "updated_at": "2026-08-17T10:30:00Z",
    "completed_at": null
  }
}
```

---

### 3. Create Job
**POST** `/jobs`

**Request:**
```json
{
  "title": "New task",
  "description": "Task description",
  "assignee_id": 4,
  "due_date": "2026-08-20",
  "priority": "medium"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Job created successfully",
  "job": {
    "id": 5,
    "title": "New task",
    "status": "open",
    "priority": "medium"
  }
}
```

---

### 4. Update Job
**PUT** `/jobs/:id`

**Request:**
```json
{
  "title": "Updated title",
  "status": "in_progress",
  "priority": "high",
  "assignee_id": 4
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Job updated successfully"
}
```

---

### 5. Complete Job
**PATCH** `/jobs/:id/complete`

**Response (200):**
```json
{
  "success": true,
  "message": "Job marked as completed",
  "completed_at": "2026-08-17T15:45:00Z"
}
```

---

### 6. Delete Job (Admin Only)
**DELETE** `/jobs/:id`

**Response (200):**
```json
{
  "success": true,
  "message": "Job deleted successfully"
}
```

---

## Animals Endpoints

### 1. Get All Animals
**GET** `/animals`

**Query Parameters:**
- `status` - Filter by status: healthy, under_watch, sick, recovered, deceased
- `type` - Filter by type: Dairy cow, Calf, Bull, etc.
- `location` - Filter by location
- `sort` - Sort by: tag, weight, created_at
- `page` - Page number
- `limit` - Results per page

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "tag": "UG-0142",
      "type": "Dairy cow",
      "breed": "Friesian",
      "status": "healthy",
      "weight_kg": 480,
      "location": "Paddock A",
      "gender": "female",
      "date_of_birth": "2020-05-10",
      "purchased_date": "2020-06-01",
      "purchase_price": 2500000,
      "notes": "High producer"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 4,
    "pages": 1
  }
}
```

---

### 2. Get Animal by ID
**GET** `/animals/:id`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "tag": "UG-0142",
    "type": "Dairy cow",
    "breed": "Friesian",
    "status": "healthy",
    "weight_kg": 480,
    "location": "Paddock A",
    "gender": "female",
    "date_of_birth": "2020-05-10",
    "purchased_date": "2020-06-01",
    "purchase_price": 2500000,
    "notes": "High producer",
    "created_at": "2024-06-01T00:00:00Z",
    "updated_at": "2026-08-17T10:30:00Z",
    "health_records": [
      {
        "id": 1,
        "record_date": "2026-08-17",
        "health_status": "healthy",
        "weight_kg": 480,
        "vaccination_name": "FMD Vaccine",
        "veterinary_notes": "All good",
        "recorded_by": "Dr. Johnson"
      }
    ]
  }
}
```

---

### 3. Create Animal
**POST** `/animals`

**Request:**
```json
{
  "tag": "UG-0150",
  "type": "Dairy cow",
  "breed": "Friesian",
  "gender": "female",
  "date_of_birth": "2023-06-15",
  "weight_kg": 400,
  "location": "Paddock A",
  "purchased_date": "2023-07-01",
  "purchase_price": 2400000
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Animal created successfully",
  "animal": {
    "id": 5,
    "tag": "UG-0150",
    "type": "Dairy cow"
  }
}
```

---

### 4. Update Animal
**PUT** `/animals/:id`

**Request:**
```json
{
  "status": "under_watch",
  "weight_kg": 475,
  "location": "Barn 2",
  "notes": "Showing signs of illness, monitor closely"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Animal updated successfully"
}
```

---

### 5. Add Health Record
**POST** `/animals/:id/health-records`

**Request:**
```json
{
  "record_date": "2026-08-17",
  "health_status": "under_watch",
  "weight_kg": 475,
  "vaccination_name": "FMD Vaccine",
  "veterinary_notes": "Minor fever detected, recommend monitoring"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Health record added successfully",
  "record": {
    "id": 5,
    "animal_id": 1,
    "record_date": "2026-08-17",
    "health_status": "under_watch"
  }
}
```

---

### 6. Get Health Records
**GET** `/animals/:id/health-records`

**Query Parameters:**
- `from_date` - Start date filter
- `to_date` - End date filter
- `sort` - Sort by date

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "animal_tag": "UG-0142",
      "record_date": "2026-08-17",
      "health_status": "healthy",
      "weight_kg": 480,
      "vaccination_name": "FMD Vaccine",
      "veterinary_notes": "All good",
      "recorded_by": "Dr. Johnson",
      "created_at": "2026-08-17T10:30:00Z"
    }
  ]
}
```

---

## Time Tracking Endpoints

### 1. Clock In
**POST** `/time/clock-in`

**Request:**
```json
{
  "employee_id": 4
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Clocked in successfully",
  "time_log": {
    "id": 15,
    "employee_id": 4,
    "clock_in_time": "2026-08-17T06:02:00Z",
    "date": "2026-08-17",
    "status": "in_progress"
  }
}
```

---

### 2. Clock Out
**POST** `/time/clock-out`

**Request:**
```json
{
  "employee_id": 4
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Clocked out successfully",
  "time_log": {
    "id": 15,
    "employee_id": 4,
    "clock_in_time": "2026-08-17T06:02:00Z",
    "clock_out_time": "2026-08-17T16:45:00Z",
    "date": "2026-08-17",
    "hours_worked": 10.72,
    "status": "completed"
  }
}
```

---

### 3. Get Time Logs
**GET** `/time/logs`

**Query Parameters:**
- `employee_id` - Filter by employee
- `from_date` - Start date
- `to_date` - End date
- `status` - Filter by status
- `page` - Page number
- `limit` - Results per page

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 15,
      "employee": {
        "id": 4,
        "name": "James Otieno"
      },
      "date": "2026-08-17",
      "clock_in_time": "2026-08-17T06:02:00Z",
      "clock_out_time": "2026-08-17T16:45:00Z",
      "hours_worked": 10.72,
      "status": "in_progress"
    }
  ]
}
```

---

### 4. Get Employee Hours Summary
**GET** `/time/summary`

**Query Parameters:**
- `employee_id` - Required
- `from_date` - Start date
- `to_date` - End date

**Response (200):**
```json
{
  "success": true,
  "data": {
    "employee": {
      "id": 4,
      "name": "James Otieno"
    },
    "period": {
      "from_date": "2026-07-01",
      "to_date": "2026-07-31"
    },
    "summary": {
      "days_worked": 22,
      "total_hours": 231.5,
      "average_daily_hours": 10.52,
      "earliest_clockin": "06:02",
      "latest_clockout": "17:00"
    }
  }
}
```

---

## Finance Endpoints

### 1. Get All Transactions
**GET** `/finance/transactions`

**Query Parameters:**
- `type` - Filter by type: income, expense
- `category` - Filter by category
- `from_date` - Start date
- `to_date` - End date
- `sort` - Sort by: date, amount
- `page` - Page number
- `limit` - Results per page

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "transaction_date": "2026-07-12",
      "description": "Milk sale — Mukono Dairy Co-op",
      "type": "income",
      "amount": 2450000,
      "category": "Milk sale",
      "payment_method": "bank_transfer",
      "reference_number": "MUK-001",
      "recorded_by": "Sarah Namuli",
      "notes": "Quality grade A"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "pages": 1
  }
}
```

---

### 2. Create Transaction
**POST** `/finance/transactions`

**Request:**
```json
{
  "transaction_date": "2026-08-17",
  "description": "Milk sale — Mukono Dairy Co-op",
  "type": "income",
  "amount": 2450000,
  "category": "Milk sale",
  "payment_method": "bank_transfer",
  "reference_number": "MUK-002",
  "notes": "Grade A milk"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Transaction created successfully",
  "transaction": {
    "id": 6,
    "transaction_date": "2026-08-17",
    "amount": 2450000
  }
}
```

---

### 3. Get Financial Summary
**GET** `/finance/summary`

**Query Parameters:**
- `period` - Period: daily, weekly, monthly, yearly
- `from_date` - Start date
- `to_date` - End date

**Response (200):**
```json
{
  "success": true,
  "data": {
    "period": "2026-07",
    "income": {
      "total": 4250000,
      "transaction_count": 2,
      "categories": {
        "Milk sale": 2450000,
        "Livestock sale": 1800000
      }
    },
    "expense": {
      "total": 2410000,
      "transaction_count": 3,
      "categories": {
        "Feed": 860000,
        "Veterinary": 210000,
        "Payroll": 1340000
      }
    },
    "net": 1840000
  }
}
```

---

### 4. Get Expense Report
**GET** `/finance/expenses`

**Query Parameters:**
- `category` - Filter by category
- `from_date` - Start date
- `to_date` - End date

**Response (200):**
```json
{
  "success": true,
  "data": {
    "total_expenses": 2410000,
    "by_category": [
      {
        "category": "Payroll",
        "amount": 1340000,
        "percentage": 55.6,
        "count": 1
      },
      {
        "category": "Feed",
        "amount": 860000,
        "percentage": 35.7,
        "count": 1
      },
      {
        "category": "Veterinary",
        "amount": 210000,
        "percentage": 8.7,
        "count": 1
      }
    ]
  }
}
```

---

## Chat Endpoints

### 1. Get Channels
**GET** `/chat/channels`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "channel_name": "General",
      "description": "General farm announcements",
      "channel_type": "general",
      "member_count": 4,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ]
}
```

---

### 2. Get Channel Messages
**GET** `/chat/channels/:id/messages`

**Query Parameters:**
- `limit` - Number of recent messages (default: 50)
- `before_id` - Message ID for pagination

**Response (200):**
```json
{
  "success": true,
  "data": {
    "channel_id": 1,
    "channel_name": "General",
    "messages": [
      {
        "id": 1,
        "user": {
          "id": 2,
          "name": "Peter Okello"
        },
        "message_text": "Morning all — vet visit confirmed for 2pm today.",
        "created_at": "2026-08-17T07:12:00Z",
        "edited_at": null
      }
    ]
  }
}
```

---

### 3. Send Message
**POST** `/chat/channels/:id/messages`

**Request:**
```json
{
  "message_text": "Vaccination completed for batch 12",
  "attachment_url": null
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "id": 5,
    "channel_id": 1,
    "user_id": 4,
    "message_text": "Vaccination completed for batch 12",
    "created_at": "2026-08-17T15:45:00Z"
  }
}
```

---

### 4. Edit Message
**PUT** `/chat/messages/:id`

**Request:**
```json
{
  "message_text": "Updated message text"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Message updated successfully",
  "edited_at": "2026-08-17T15:46:00Z"
}
```

---

## Dashboard Endpoints

### 1. Get Dashboard Data (Role-Based)
**GET** `/dashboard`

**Response (200) - Admin:**
```json
{
  "success": true,
  "role": "admin",
  "data": {
    "stats": [
      {
        "icon": "animal",
        "label": "Healthy Animals",
        "value": "4",
        "delta": "+1 this week",
        "direction": "up"
      },
      {
        "icon": "jobs",
        "label": "Pending Jobs",
        "value": "3",
        "delta": "-1 from yesterday",
        "direction": "down"
      }
    ],
    "charts": {
      "label": "Jobs completed — last 7 days",
      "data": [
        { "label": "M", "value": 4 },
        { "label": "T", "value": 6 },
        { "label": "W", "value": 3 }
      ]
    },
    "recent_activity": [
      {
        "icon": "animal",
        "title": "Weight recorded — UG-0142",
        "subtitle": "Logged by James Otieno · 2h ago",
        "tag": "Animal",
        "tag_style": "green"
      }
    ]
  }
}
```

---

## Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "username": "Username is required",
      "email": "Invalid email format"
    }
  }
}
```

### Error Codes
- `VALIDATION_ERROR` (400) - Invalid request data
- `UNAUTHORIZED` (401) - Missing or invalid token
- `FORBIDDEN` (403) - User lacks permission
- `NOT_FOUND` (404) - Resource not found
- `CONFLICT` (409) - Resource already exists
- `INTERNAL_ERROR` (500) - Server error

---

## Rate Limiting
- 100 requests per minute for authenticated users
- 10 requests per minute for login endpoint
- Headers returned:
  - `X-RateLimit-Limit`: 100
  - `X-RateLimit-Remaining`: 95
  - `X-RateLimit-Reset`: 1629193500

---

## Pagination
All list endpoints support pagination with:
- `page` - Current page (default: 1)
- `limit` - Results per page (default: 20, max: 100)

Response includes:
```json
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8,
    "has_next": true,
    "has_prev": false
  }
}
```

---

## CORS Headers
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 3600
```

---

## Webhooks (Future Enhancement)
- Job status changes
- Animal health alerts
- Financial thresholds
- Employee clocking events
- Message notifications

---

**API Version:** 1.0  
**Last Updated:** 2026-08-17  
**Documentation:** For detailed implementation guides, see DATABASE_INTEGRATION_GUIDE.md
