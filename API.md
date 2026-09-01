# Ziptrip - API Documentation

## Base URL

```
http://localhost:8000/api
```

## Authentication

No authentication required for this version.

---

## Endpoints

### 1. Health Check

**GET** `/health`

Check if the API is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-09-01T14:21:24.150Z",
  "uptime": 966.466137125
}
```

---

### 2. Get All Todos

**GET** `/todos`

Retrieve all todos with optional filtering, searching, and sorting.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search by title or description |
| `filter` | string | Filter by status: `completed`, `pending` |
| `sort` | string | Sort by: `created_at`, `updated_at`, `priority` |

**Examples:**
```bash
# Get all todos
curl http://localhost:8000/api/todos

# Search todos
curl http://localhost:8000/api/todos?search=shopping

# Filter completed todos
curl http://localhost:8000/api/todos?filter=completed

# Sort by priority
curl http://localhost:8000/api/todos?sort=priority

# Combined
curl http://localhost:8000/api/todos?search=work&filter=pending&sort=priority
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-string",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "completed": false,
      "priority": "high",
      "category": "Shopping",
      "due_date": "2026-09-05T10:00:00.000Z",
      "created_at": "2026-09-01T14:01:53.170Z",
      "updated_at": "2026-09-01T14:01:53.170Z"
    }
  ]
}
```

---

### 3. Get Todo by ID

**GET** `/todos/:id`

Retrieve a specific todo by its ID.

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Todo ID (UUID) |

**Example:**
```bash
curl http://localhost:8000/api/todos/88e8301b-ba51-4610-9040-b2d72f816176
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "88e8301b-ba51-4610-9040-b2d72f816176",
    "title": "Complete project",
    "description": "Finish the assignment",
    "completed": false,
    "priority": "high",
    "category": "Work",
    "due_date": "2026-09-03T14:01:53.172Z",
    "created_at": "2026-09-01T14:01:53.170Z",
    "updated_at": "2026-09-01T14:01:53.170Z"
  }
}
```

**Error Response (Invalid ID):**
```json
{
  "success": false,
  "error": {
    "message": "Todo not found",
    "code": "NOT_FOUND"
  }
}
```

---

### 4. Create Todo

**POST** `/todos`

Create a new todo.

**Request Body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread, vegetables",
  "priority": "medium",
  "category": "Shopping",
  "due_date": "2026-09-05T10:00:00.000Z"
}
```

**Required Fields:**
- `title` (string): Todo title

**Optional Fields:**
- `description` (string): Detailed description
- `priority` (string): `low`, `medium`, `high` (default: `medium`)
- `category` (string): Category name
- `due_date` (string): ISO 8601 date string
- `completed` (boolean): Completion status (default: `false`)

**Example:**
```bash
curl -X POST http://localhost:8000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "priority": "high",
    "category": "Shopping"
  }'
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "new-uuid-string",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "priority": "high",
    "category": "Shopping",
    "due_date": null,
    "created_at": "2026-09-01T14:21:24.150Z",
    "updated_at": "2026-09-01T14:21:24.150Z"
  }
}
```

**Validation Error:**
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "type": "field",
        "value": "",
        "msg": "Title is required",
        "path": "title",
        "location": "body"
      }
    ]
  }
}
```

---

### 5. Update Todo (Full Update)

**PUT** `/todos/:id`

Update a todo (all fields can be modified).

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Todo ID (UUID) |

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true,
  "priority": "low",
  "category": "Updated Category",
  "due_date": "2026-09-10T10:00:00.000Z"
}
```

**Example:**
```bash
curl -X PUT http://localhost:8000/api/todos/88e8301b-ba51-4610-9040-b2d72f816176 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "completed": true
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "88e8301b-ba51-4610-9040-b2d72f816176",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": true,
    "priority": "high",
    "category": "Shopping",
    "due_date": null,
    "created_at": "2026-09-01T14:01:53.170Z",
    "updated_at": "2026-09-01T14:21:30.895Z"
  }
}
```

---

### 6. Patch Todo (Partial Update)

**PATCH** `/todos/:id`

Partially update a todo (only provided fields are updated).

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Todo ID (UUID) |

**Request Body:**
```json
{
  "completed": true
}
```

**Example:**
```bash
curl -X PATCH http://localhost:8000/api/todos/88e8301b-ba51-4610-9040-b2d72f816176 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "88e8301b-ba51-4610-9040-b2d72f816176",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": true,
    "priority": "high",
    "category": "Shopping",
    "due_date": null,
    "created_at": "2026-09-01T14:01:53.170Z",
    "updated_at": "2026-09-01T14:21:30.895Z"
  }
}
```

---

### 7. Delete Todo

**DELETE** `/todos/:id`

Delete a todo permanently.

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Todo ID (UUID) |

**Example:**
```bash
curl -X DELETE http://localhost:8000/api/todos/88e8301b-ba51-4610-9040-b2d72f816176
```

**Response (204 No Content):**
```
(Empty response body)
```

**Error Response (Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "Todo not found",
    "code": "NOT_FOUND"
  }
}
```

---

## Error Responses

### 400 - Bad Request

```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": [...]
  }
}
```

### 404 - Not Found

```json
{
  "success": false,
  "error": {
    "message": "Todo not found",
    "code": "NOT_FOUND"
  }
}
```

### 500 - Internal Server Error

```json
{
  "success": false,
  "error": {
    "message": "Internal server error",
    "code": "SERVER_ERROR"
  }
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 204 | No Content - Successful deletion |
| 400 | Bad Request - Validation error |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## Example Usage (Frontend)

```javascript
const API_URL = 'http://localhost:8000/api'

// Get all todos
const response = await axios.get(`${API_URL}/todos`)
const todos = response.data.data

// Create todo
const newTodo = await axios.post(`${API_URL}/todos`, {
  title: 'New Todo',
  description: 'Description here'
})

// Update todo
await axios.put(`${API_URL}/todos/${id}`, {
  completed: true
})

// Delete todo
await axios.delete(`${API_URL}/todos/${id}`)

// Search todos
const results = await axios.get(`${API_URL}/todos`, {
  params: {
    search: 'groceries',
    filter: 'pending',
    sort: 'priority'
  }
})
```

---

## CORS

The API allows requests from `http://localhost:5173` (frontend).

To allow other origins, modify the backend `server.js`:
```javascript
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'
app.use(cors({ origin: FRONTEND_URL }))
```

---

## Rate Limiting

No rate limiting is currently implemented.

---

## Pagination

Pagination is not currently implemented. All todos are returned in a single response.

---

For more details, check the backend source code in `/backend/src`.
