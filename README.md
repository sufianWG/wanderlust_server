# Wanderlust Server

This is the backend server for my Wanderlust travel destination practice project.

The server was built with Express.js and MongoDB to practice REST APIs, CRUD operations, booking functionality, and JWT-based API protection.

Frontend repository:

[Wanderlust Frontend](https://github.com/sufianWG/wanderlust)

## Project Purpose

I created this backend mainly to practice how a frontend application communicates with a separate server and database.

Through this project, I practiced:

- Creating REST APIs with Express.js
- Connecting a Node.js server with MongoDB
- CRUD operations
- Working with MongoDB ObjectId
- Creating booking APIs
- Protecting APIs with JWT
- Verifying Better Auth JWT tokens using JWKS
- Using environment variables
- Deploying an Express server

## Features

- MongoDB database connection
- Destination CRUD APIs
- Featured destination API
- Booking creation
- User-specific booking retrieval
- Booking cancellation
- JWT-protected API endpoints
- Better Auth JWKS-based token verification
- CORS support
- JSON request handling
- Vercel deployment configuration

## Technologies Used

- Node.js
- Express.js
- MongoDB
- CORS
- dotenv
- jose
- Better Auth JWT / JWKS
- Vercel

## Database

The server uses MongoDB.

Database name:

```text
wanderlust
```

Main collections:

```text
destinations
bookings
```

Better Auth also stores authentication-related data in MongoDB from the frontend application.

## API Security

Most APIs are protected with JWT authentication.

The frontend generates a JWT token using Better Auth and sends it with the request:

```text
Authorization: Bearer <token>
```

The backend gets Better Auth's public signing keys from:

```text
/api/auth/jwks
```

and verifies the received token before allowing access to protected APIs.

Requests without a valid token return an unauthorized or forbidden response.

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/` | Server health/home route |
| GET | `/api/featured` | Get featured destinations |

### Protected Destination Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/destinations` | Get all destinations |
| GET | `/api/destinations/:id` | Get a destination by ID |
| POST | `/destination` | Add a new destination |
| PATCH | `/destination/:id` | Update a destination |
| DELETE | `/destination/:id` | Delete a destination |

### Protected Booking Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/booking` | Create a booking |
| GET | `/booking/:userId` | Get bookings for a specific user |
| DELETE | `/booking/:bookingId` | Cancel/delete a booking |

## Environment Variables

Create a `.env` file in the root directory.

Example:

```env
MONGODB_URI=your_mongodb_connection_string

FRONTEND_URL=http://localhost:3000

PORT=5260
```

For production:

```env
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

The `FRONTEND_URL` is used to access the Better Auth JWKS endpoint for JWT verification.

> Never commit the real `.env` file or secret values to GitHub.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sufianWG/wanderlust_server.git
```

### 2. Go to the project directory

```bash
cd wanderlust_server
```

### 3. Install dependencies

```bash
npm install
```

### 4. Add environment variables

Create a `.env` file and add the required variables.

### 5. Run the server locally

The project uses Nodemon during local development.

```bash
npm run dev
```

The local server can run at:

```text
http://localhost:5260
```

## Example API Flow

A protected request follows this flow:

```text
User signs in
        ↓
Better Auth creates a session
        ↓
Frontend requests a JWT
        ↓
JWT is sent in Authorization header
        ↓
Express verifyToken middleware
        ↓
JWKS verifies the token
        ↓
Request reaches the API handler
        ↓
MongoDB operation
        ↓
Response returned to frontend
```

## CRUD Operations

| Operation | HTTP Method | Example |
| --- | --- | --- |
| Create | POST | Add destination or booking |
| Read | GET | Get destinations or bookings |
| Update | PATCH | Update destination |
| Delete | DELETE | Delete destination or booking |

## Vercel Deployment

The backend includes a `vercel.json` configuration for deploying the Express application to Vercel.

The Express application is exported with:

```js
module.exports = app;
```

instead of relying on a continuously running local server in the deployed environment.

For local development, the server can still be run using the development setup.

## What I Practiced

Through this backend project, I practiced:

- Creating an Express server
- Creating REST API endpoints
- Connecting MongoDB with Node.js
- Working with MongoDB collections
- Using `find()`, `findOne()`, `insertOne()`, `updateOne()`, and `deleteOne()`
- Working with MongoDB `ObjectId`
- Creating CRUD APIs
- Creating booking-related APIs
- Creating Express middleware
- Reading the Authorization header
- Extracting Bearer tokens
- Verifying JWT tokens
- Working with remote JWKS
- Protecting backend APIs
- Using environment variables
- Handling CORS
- Connecting a Next.js frontend with an Express backend
- Preparing an Express application for Vercel deployment

## Frontend Repository

[Wanderlust Frontend](https://github.com/sufianWG/wanderlust)

## Author

**Md. Abu Sufian**

This server was created as part of my full-stack web development practice.