# AGENTS.md

## Build & Verification

### Client (React + Vite)
```bash
cd client
npm run dev          # Development server
npm run build        # Production build
npm run lint         # ESLint (if configured)
```

### Server (Node.js + Express)
```bash
cd server
npm run dev          # Development server with nodemon
npm start            # Production server
```

## Project Structure
- `client/` - React frontend (Vite + Tailwind CSS)
- `server/` - Node.js/Express backend (MongoDB/Mongoose)

## Key Notes
- Frontend uses Tailwind CSS v3 with custom color palette
- Framer Motion for animations
- React Router v6 for routing
- Authentication via JWT + localStorage
