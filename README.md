# Auth API

This service provides authentication APIs for an application. It supports two authentication methods:

1. Username and password login
2. Google Sign-In

The API follows common backend best practices, can be tested with Postman, and is designed to be deployable to Microsoft Azure.

---

# Overview

The Auth API is responsible for:

* User registration
* User login using username and password
* Login using Google OAuth
* Generating and validating JWT tokens
* Protecting API endpoints using authentication

The API is **stateless**, meaning it does not store sessions. Authentication is handled using **JWT tokens**.

---

# Tech Stack

Example stack used for this service:

* Node.js
* Express.js
* TypeScript (recommended)
* JWT (JSON Web Token)
* bcrypt (password hashing)
* Google OAuth 2.0
* Azure App Service (deployment)
* Azure SQL / PostgreSQL / CosmosDB (database)

---

# Project Structure

Example structure:

```
auth-api
│
├── src
│   ├── controllers
│   │   └── auth.controller.ts
│   │
│   ├── services
│   │   └── auth.service.ts
│   │
│   ├── routes
│   │   │── auth.routes.ts
│   │
│   ├── middleware
│   │   └── auth.middleware.ts
│   │
│   ├── models
│   │   └── user.model.ts
│   │
│   ├── config
│   │   └── google-oauth.ts
│   │
│   └── app.ts
│
├── .env
├── package.json
└── README.md
```

Responsibilities:

* **controllers** – handle request and response
* **services** – business logic
* **routes** – API endpoints
* **middleware** – authentication and validation
* **models** – database schema
* **config** – external service configuration

---

# Authentication Flow

## Username and Password

1. User registers with email and password
2. Password is hashed using bcrypt
3. Hashed password is stored in the database
4. User logs in using credentials
5. Server verifies the password hash
6. Server generates a JWT token
7. Token is returned to the client
8. Client sends JWT in future requests

Example request header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## Google Sign-In

1. Client authenticates with Google
2. Google returns an ID token
3. Client sends the token to the Auth API
4. Server verifies the token with Google
5. If the user does not exist, the server creates a new user
6. Server generates a JWT token
7. JWT is returned to the client

---

# API Endpoints

## Register

POST `/auth/register`

Request body

```
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

Response

```
{
  "message": "User created"
}
```

---

## Login

POST `/auth/login`

Request

```
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

Response

```
{
  "accessToken": "JWT_TOKEN"
}
```

---

## Google Login

POST `/auth/google`

Request

```
{
  "idToken": "GOOGLE_ID_TOKEN"
}
```

Response

```
{
  "accessToken": "JWT_TOKEN"
}
```

---

## Protected Endpoint Example

GET `/auth/profile`

Header

```
Authorization: Bearer JWT_TOKEN
```

Response

```
{
  "userId": "123",
  "email": "user@example.com"
}
```

---

# Security Practices

Important security practices implemented:

* Passwords are hashed using **bcrypt**
* JWT tokens have an **expiration time**
* Tokens are **not stored in the database**
* Sensitive keys are stored in **environment variables**
* Google tokens are **verified using Google's public keys**

Example environment variables:

```
JWT_SECRET=
GOOGLE_CLIENT_ID=
DATABASE_URL=
```

---

# Testing with Postman

You can test the API using Postman.

Recommended flow:

1. Register a user

```
POST /auth/register
```

2. Login

```
POST /auth/login
```

3. Copy the returned JWT token

4. Call a protected API

```
GET /auth/profile
```

Add header:

```
Authorization: Bearer <token>
```

---

# Running Locally

Install dependencies

```
npm install
```

Run development server

```
npm run dev
```

Default server

```
http://localhost:3000
```

---

# Deployment to Azure

Typical deployment options:

* Azure App Service 

Basic deployment flow:

1. Push project to GitHub
2. Create an Azure App Service
3. Connect the GitHub repository
4. Configure environment variables
5. Deploy using CI/CD

---

# Future Improvements

Possible improvements for this API:

* Refresh token implementation
* Email verification
* Password reset flow
* Rate limiting
* Account lock after multiple failed attempts
* Audit logging
