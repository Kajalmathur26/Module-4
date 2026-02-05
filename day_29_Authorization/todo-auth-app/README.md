# Authorization-Based TODO App

## Tech Stack
- Node.js
- Express
- Supabase
- JWT Authentication
- bcrypt

## Setup
1. Create folder.
2. Run `npm install`
3. Create `.env` using `.env.example`
4. Run `npm run dev`

## APIs

### Auth
- POST /signup
- POST /login

### Todos (Protected)
- POST /todos
- GET /todos
- PUT /todos/:id
- DELETE /todos/:id

## Authorization
- JWT token required in header:
Authorization: Bearer <token>
