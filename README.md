# Ziptrip - Full-Stack Todo Application

A modern, full-stack todo application built with React, Node.js, and SQLite. Features a beautiful UI, real-time CRUD operations, filtering, searching, and sorting capabilities.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ 
- npm or yarn

### Installation & Setup

```bash
# Clone the repository
git clone <repo-url>
cd ziptrip

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Create backend environment file
cd ../backend
cp .env.example .env
# Edit .env if needed (default settings work fine)
```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Server will run on http://localhost:8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App will run on http://localhost:5173
```

Then open your browser to: **http://localhost:5173/**

---

## 📋 Features

✅ **Todo List Management**
- View all todos with real-time updates
- Add new todos
- Edit todo details (title, description, priority, category)
- Mark todos as complete/incomplete
- Delete todos permanently

✅ **Advanced Filtering & Search**
- Search todos by title/description
- Filter by status (All, Completed, Pending)
- Sort by (Newest, Recently Updated, Priority)

✅ **Todo Details Page**
- Click on any todo to view full details
- Separate detail page with `?id=...` query parameter
- Edit todo from detail page
- See creation and update timestamps

✅ **Persistent Storage**
- SQLite database
- All data persists across server restarts
- Automatic database initialization and seeding

✅ **Error Handling**
- Graceful error messages with toast notifications
- Validation on both frontend and backend
- Handles network failures and invalid IDs
- Proper HTTP status codes and error responses

✅ **User Experience**
- Beautiful Tailwind CSS UI
- Loading states
- Empty states with helpful messages
- Responsive design (mobile-friendly)
- Real-time toast notifications

---

## 📁 Project Structure

```
ziptrip/
├── backend/
│   ├── src/
│   │   ├── server.js              # Express server entry point
│   │   ├── controllers/           # Request handlers
│   │   ├── routes/                # API routes
│   │   ├── services/              # Business logic
│   │   ├── models/                # Database models
│   │   ├── middleware/            # Express middleware
│   │   └── data/                  # SQLite database
│   ├── .env                       # Environment variables
│   ├── package.json               # Backend dependencies
│   └── README.md                  # Backend documentation
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx               # React entry point
│   │   ├── App.jsx                # App component with routing
│   │   ├── pages/
│   │   │   ├── TodoList.jsx       # List page with filters
│   │   │   └── TodoDetail.jsx     # Detail page
│   │   ├── index.css              # Global styles
│   │   └── services/              # API services
│   ├── .env                       # Environment variables
│   ├── vite.config.js             # Vite configuration
│   ├── tailwind.config.js         # Tailwind CSS configuration
│   ├── package.json               # Frontend dependencies
│   └── index.html                 # HTML template
│
└── README.md                      # This file
```

---

## 🔌 API Documentation

See [API.md](./API.md) for detailed API endpoints documentation.

### Quick API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos (supports search, filter, sort) |
| GET | `/api/todos/:id` | Get specific todo |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update todo |
| PATCH | `/api/todos/:id` | Partial update todo |
| DELETE | `/api/todos/:id` | Delete todo |
| GET | `/api/health` | Health check |

---

## 🎨 UI/UX Highlights

- **Gradient Background**: Modern blue-to-indigo gradient
- **Card-based Design**: Clean, organized layout
- **Icon Integration**: Lucide React icons for visual clarity
- **Responsive Grid**: Works on desktop, tablet, and mobile
- **Toast Notifications**: Real-time feedback for all actions
- **Loading States**: Spinners and skeleton states
- **Empty States**: Helpful messages when no data exists
- **Hover Effects**: Interactive feedback on buttons and items

---

## 🧪 Testing Checklist

- [ ] Add a new todo
- [ ] Edit todo title and description
- [ ] Mark todo as complete/incomplete
- [ ] Delete a todo
- [ ] Search for todos
- [ ] Filter by status
- [ ] Sort by different options
- [ ] Click on todo to view details
- [ ] Edit from detail page
- [ ] Refresh page (data persists)
- [ ] Restart backend (data persists)
- [ ] Visit invalid todo ID
- [ ] Test on mobile device

---

## 🛠️ Environment Variables

### Backend (.env)
```
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000/api
```

---

## 📦 Dependencies

### Backend
- **express**: Web framework
- **better-sqlite3**: SQLite database
- **cors**: Cross-origin requests
- **dotenv**: Environment variables
- **express-validator**: Input validation
- **uuid**: Unique ID generation

### Frontend
- **react**: UI library
- **react-router-dom**: Client-side routing
- **axios**: HTTP client
- **tailwindcss**: CSS framework
- **lucide-react**: Icon library
- **react-hot-toast**: Toast notifications

---

## 🚨 Troubleshooting

### Backend won't start on port 8000
```bash
# Kill process using port 8000
lsof -i :8000  # Find process ID
kill -9 <PID>

# Or use different port
PORT=3000 npm start
```

### Frontend can't connect to backend
- Check if backend is running on `http://localhost:8000`
- Verify `.env` has correct `VITE_API_URL`
- Check browser console for CORS errors
- Restart both servers

### Database issues
- Database file is at `backend/data/todos.db`
- Delete it to reset with fresh seed data
- Database is recreated automatically on server start

---

## 📝 Additional Documentation

- [FEATURES.md](./FEATURES.md) - Detailed feature documentation
- [API.md](./API.md) - Complete API documentation
- [Backend README](./backend/README.md) - Backend-specific documentation

---

## 👨‍💻 Development

For development with hot reload:

**Backend:**
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

**Frontend:**
```bash
cd frontend
npm run dev  # Vite with HMR
```

---

## 📄 License

MIT License - Feel free to use this project for learning and development.

---

## ✨ Features for Future Enhancement

- User authentication and accounts
- Due dates with notifications
- Todo categories/tags
- Recurring todos
- Todo sharing and collaboration
- Dark mode
- Offline support (PWA)
- Export todos (CSV, PDF)
- Todo templates

---


# ZIPTRRIP-
