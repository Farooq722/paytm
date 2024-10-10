
# Paytm Application

This project is a Paytm-like application that replicates key features of a payment platform, allowing users to sign up, sign in, transfer money between accounts, and view their account details via a dashboard. It showcases a simple yet functional wallet system, with authentication and transactional capabilities built using modern web technologies.

# Features

## User Authentication:

- Sign Up: Users can create a new account by providing an email, first name, last name, and password. On successful signup, an account is created with an initial random balance.

- Sign In: Users can securely log into their account using their email and password. JWT (JSON Web Token) is used to maintain session authentication.

- Dashboard: After logging in, users are redirected to a dashboard that displays their current account balance and other personal details. This provides a quick summary of their financial information.

- Money Transfer: Users can transfer money between accounts, ensuring that sufficient funds are available. Transactions are handled using MongoDB sessions to ensure atomicity and consistency.

- Account Management: Users can update their profile information such as their first name, last name, or password after authentication.

- Search Users: The application allows searching for users based on their first or last name using a simple search filter.

# Technologies Used
- Backend: Node.js with Express.js

- Frontend: React.js & Tailwind for styling

- Database: MongoDB

- Authentication: JWT (JSON Web Token)

- Validation: Zod schema validation for input validation

- Session Management: MongoDB sessions for transactional consistency



## Contributing

Contributions are always welcome!



## Setup Instructions
To run locally, clone it locally
```bash
  git clone https://github.com/Farooq722/paytm.git
  cd paytm
```
In backend folder download the dependencies (Same with frontend folder)
```bash
  npm install
```
In config.js file 
```bash
  JWT_SECRET=your_jwt_secret
```
In db file
```bash
  MONGO_URI=your_mongodb_uri
```
To run frontend 
```bash
  npm run dev
```
To run backend
```bash
  node index.js
```
## Access the application: 
Open your browser and navigate 
- /signin
- /signup
- /dashboard
- /send


