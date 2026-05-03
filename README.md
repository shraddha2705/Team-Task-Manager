# 🚀 Team Task Manager (Full-Stack Web App)

A full-stack web application that allows teams to manage projects, assign tasks, and track progress with role-based access control.

---

## 🌐 Live Demo

- 🔗 Frontend: https://team-task-manager-iota-khaki.vercel.app/
- 🔗 Backend API: https://team-task-manager-production-b76a.up.railway.app

---

## 🧠 Features

### 🔐 Authentication

- User Signup & Login
- Secure password hashing (bcrypt)
- JWT-based authentication

### 👥 Role-Based Access Control

- **Admin**
  - Create, edit, delete projects
  - Manage tasks

- **Member**
  - View projects
  - Create and update tasks

---

### 📁 Project Management

- Create projects (Admin only)
- Edit project names
- Delete projects
- View all projects

---

### 📋 Task Management

- Create tasks
- Edit task titles
- Update task status:
  - Todo
  - In Progress
  - Done

- Live updates without page refresh

---

### 📊 Dashboard

- View all tasks and projects
- Interactive UI with status updates
- Clean and responsive design using Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- Fetch API

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas

### Deployment

- Backend: Railway
- Frontend: Netlify

---

## 📁 Project Structure

```
team-task-manager/
│
├── client/        # React frontend
│   ├── src/
│   └── ...
│
├── server/        # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/shraddha2705/Team-Task-Manager.git
cd team-task-manager
```

---

### 2️⃣ Backend Setup

```
cd server
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
PORT=5000
```

Run server:

```
node index.js
```

---

### 3️⃣ Frontend Setup

```
cd client
npm install
npm run dev
```

---

## 🚀 Deployment

### Backend (Railway)

- Connect GitHub repo
- Set root directory to `/server`
- Add environment variables
- Deploy

### Frontend (Netlify)

- Build project:

```
npm run build
```

- Upload `/dist` folder to Netlify

---

## 🔑 API Endpoints

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`

### Projects

- `GET /api/projects`
- `POST /api/projects` (Admin)
- `PUT /api/projects/:id` (Admin)
- `DELETE /api/projects/:id` (Admin)

### Tasks

- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`

---

## 🧪 Future Improvements

- Assign tasks to specific users
- Due dates & overdue highlighting
- Drag-and-drop Kanban board
- Notifications system
- Dark mode

---

## 📸 Screenshots

(Add screenshots here if needed)

---

## 👨‍💻 Author

- Your Name
- GitHub: https://github.com/shraddha2705

---

## ⭐ Acknowledgements

Built as part of a full-stack development assignment to demonstrate:

- REST API design
- Authentication & authorization
- Full-stack deployment
- Modern UI practices

---

## 💡 Final Note

This project demonstrates a complete full-stack workflow including backend APIs, frontend UI, database integration, and live deployment.

---

> 🚀 From idea → code → deployment → live product.
