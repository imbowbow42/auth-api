# Auth API

A robust authentication API built with Express.js and TypeScript, designed to handle user registration, standard email/password login, and third-party Google authentication. It connects to Azure Cosmos DB for data storage and implements modern security practices.

## Features

- **User Authentication:** Registration and standard login using `bcrypt` for secure password hashing.
- **JWT Authentication:** Generates Access Tokens and Refresh Tokens for secure, stateless sessions.
- **Google OAuth Login:** Verifies Google ID tokens on the backend to authenticate frontend users.
- **Input Validation:** Uses `zod` schemas to strictly validate incoming request bodies natively in the controllers.
- **Azure Cosmos DB Integration:** Custom repository pattern mapped to Cosmos DB SQL queries.
- **Security:** Integrated with `helmet` for HTTP headers and `express-rate-limit` for brute-force protection.
- **Error Handling:** Centralized global error handling middleware using a custom `AppError` implementation.
- **CORS Configured:** Setup to accept requests specifically from the frontend application.

## Prerequisites

- Node.js installed
- Microsoft Azure Account (for Cosmos DB details)
- Google Cloud Console Project (for Google Client ID)

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory and configure the following variables:
   ```env
   PORT=3000
   NODE_ENV=development

   # Authentication Secrets
   JWT_SECRET=your_super_secret_key

   # Google Client details for frontend login validation
   GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

   # Azure Cosmos DB Credentials
   COSMOS_ENDPOINT=your_cosmos_endpoint_url
   COSMOS_KEY=your_cosmos_primary_key
   COSMOS_DATABASE=your_database_name
   COSMOS_CONTAINER=your_container_name
   ```

3. **Run the Server in Development Mode**
   ```bash
   npm run dev
   ```
   The server will start, using `tsx watch` to auto-restart on changes.

4. **Build and Run for Production**
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

- `POST /auth/register` - Register a new user with an email, username, and password.
- `POST /auth/login` - Login with an email and password to receive access and refresh tokens.
- `POST /auth/google-login` - Send a Google ID Token (`idToken`) to authenticate or register automatically.
- `GET /health` - Health check endpoint directly on the API.

## Tech Stack
TypeScript, Express.js, Zod, jsonwebtoken, bcrypt, google-auth-library, @azure/cosmos, helmet, cors
