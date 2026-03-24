# Whispr

A full-stack real-time messaging application with authentication, group chats, file uploads, and live updates using **Socket.io**. Built with a modern JavaScript stack and modular architecture.
This project is part of The Odin Project curriculum.

---

### Login
<img src="./src/assets/malogin.png" width="500" />

### Chat View
<img src="./src/assets/malogin2.png" width="500" />

### Bio View
<img src="./src/assets/malogin3.png" width="500" />

---

## Tech Stack

### Frontend
| Tech | Description |
|------|-------------|
| <img src="https://skillicons.dev/icons?i=react" width="32"> | React 19 + Vite |
| <img src="https://skillicons.dev/icons?i=socketio" width="32"> | Socket.io client |

### Backend
| Tech | Description |
|------|-------------|
| <img src="https://skillicons.dev/icons?i=nodejs" width="32"> | Node.js + Express |
| <img src="https://skillicons.dev/icons?i=prisma" width="32"> | Prisma ORM |
| <img src="https://skillicons.dev/icons?i=postgres" width="32"> | PostgreSQL |
| <img src="https://skillicons.dev/icons?i=socketio" width="32"> | Socket.io server |

> **Backend repo:** [https://github.com/ELE-00/messenger-api](https://github.com/ELE-00/messenger-api)

---

## Features

### Authentication
- Register & login
- Secure password hashing
- Unique usernames
- Profile picture upload

### Conversations
- One-to-one and group chats
- Group profile picture upload
- Live updates on new messages

### Real-time
- Typing indicators
- Online/offline presence
- Socket.io live events

---

## Getting Started

### Prerequisites

- Node.js 18+
- [Whispr API](https://github.com/ELE-00/messenger-api) running

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API URL (default: `http://localhost:3000`) |

### Run

```bash
npm run dev
```

---

## Project Structure

```
src/
├── api/
│   ├── auth.js          # Auth API calls (login, signup)
│   └── axiosClient.js   # Axios instance with base URL
├── components/
│   ├── ChatWindow.jsx   # Message thread + typing indicators
│   ├── ErrorBoundary.jsx
│   ├── MessageItem.jsx
│   ├── NewGroupCard.jsx
│   ├── ProfileCard.jsx
│   ├── ProtectedRoute.jsx
│   ├── Sidebar.jsx
│   ├── UserCard.jsx
│   └── sideNav.jsx
├── context/
│   └── AuthContext.jsx  # Auth state + socket lifecycle
├── pages/
│   ├── Login.jsx
│   ├── Messenger.jsx
│   └── Signup.jsx
├── socket.js            # Socket.IO instance (autoConnect: false)
└── main.jsx
```

---

## Testing

```bash
npm test          # watch mode
npm run coverage  # run once with coverage report
```

Tests live in `src/test/` and cover the Login page and ErrorBoundary component.

---

Built with ❤️, ☕, and too many console.log() statements
