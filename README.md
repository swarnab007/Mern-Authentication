

A full-featured authentication system built with the MERN (MongoDB, Express, React, Node.js) stack, offering user registration, login, and secure authentication processes with JWT tokens.

## Features

- **User Registration:** Users can create an account.
- **Login & Logout:** Users can securely log in and log out.
- **JWT Authentication:** JSON Web Tokens (JWT) for secure, stateless authentication.
- **Protected Routes:** Access control to secure pages for authenticated users only.
- **Email Verification:** Verification link sent to user's email to activate the account.
- **Password Reset:** Reset password via email verification.

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT Tokens, Bcrypt for password hashing
- **Email Service:** Mailtrap for email verification

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB database set up
- Mailtrap account for email verification

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/swarnab007/Mern-Authentication.git
   cd Mern-Authentication
   
2. Install dependencies for both client and server:
   ```bash
   npm install
   cd client
   npm install
3. Set up environment variables. Create a .env file in the root directory and add the following:
   ```bash
   MONGO_URI=your_mongo_uri
   PORT=5000
   JWT_SECRET=your_secret_key
   NODE_ENV=development

   MAILTRAP_TOKEN=your_mailtrap_token
   MAILTRAP_ENDPOINT=https://send.api.mailtrap.io/

4. Run this app locally
   ```bash
   npm run dev
