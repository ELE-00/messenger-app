# Whispr

A real-time messaging app built with React and Socket.IO.

## Tech Stack

- **Framework:** React 19 + Vite
- **Routing:** React Router
- **HTTP:** Axios
- **Real-time:** Socket.IO client
- **Testing:** Vitest + Testing Library

## Features

- User registration and login with JWT auth
- Direct messages and group conversations
- Real-time messaging via Socket.IO
- Typing indicators
- Online/offline presence
- Profile picture and bio editing
- Image upload for group chats

## Getting Started

### Prerequisites

- Node.js 18+
- [Whispr API](../messenger-api) running

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

## Testing

```bash
npm test          # watch mode
npm run coverage  # run once with coverage report
```

Tests live in `src/test/` and cover the Login page and ErrorBoundary component.
