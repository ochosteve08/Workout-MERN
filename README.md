# Fitness and Workout Website

This is a full-stack MERN (MongoDB, Express, React, Node.js) project for a fitness and workout website. The website allows users to register, login, and upon login, authenticated users can create, update, and delete workout plans.

## Features

- User Registration: Users can create an account by providing their details such as username, email, and password.
- User Login: Registered users can log in using their credentials.
- Authentication: Authenticated users can access protected routes to create, update, and delete workout plans.
- Create Workout Plan: Authenticated users can create new workout plans by providing details such as workout name, description, duration, and exercises.
- Update Workout Plan: Authenticated users can update existing workout plans by modifying the details such as workout name, description, duration, and exercises.
- Delete Workout Plan: Authenticated users can delete workout plans from their list of workout plans.

## Technologies Used

- MongoDB: Database for storing user information and workout plans.
- Express: Backend framework for handling HTTP requests and routing.
- React: Frontend library for building the user interface.
- Node.js: JavaScript runtime environment for running the server-side code.
- JSON Web Tokens (JWT): Used for user authentication and authorization.
- bcrypt: Used for hashing user passwords for security.

## Setup Instructions

1. Clone the repository: `git clone https://github.com/ochosteve08/Workout-MERN.git`
2. Navigate to the project directory: `cdWorkout-MERN`
3. Install dependencies for both the server and client:
   - Server: `cd backend && npm install`
   - Client: `cd front && yarn add`
4. Set up environment variables:
   - Create a `.env` file in the `server` directory.
   - Define the following variables:
     - `DB_CONNECTION`: MongoDB connection string.
     - `JWT_SECRET`: Secret key for JSON Web Tokens.
   - Save the file.
5. Start the development server:
   - Server: `cd backend && npm run dev`
   - Client: `cd frontend && yarn run dev`

The server will start on `http://localhost:4000`, and the client will run on `http://localhost:5173`.

## API Routes

The following API routes are available:

### User Routes

- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Log in an existing user.

### Workout Routes

- **GET /api/workouts**: Get all workout plans.
- **GET /api/workouts/:id**: Get a specific workout plan by ID.
- **POST /api/workouts**: Create a new workout plan.
- **PUT /api/workouts/:id**: Update a workout plan by ID.
- **DELETE /api/workouts/:id**: Delete a workout plan by ID.

Feel free to explore the codebase for more details on the project's structure, file organization, and implementation of various features.

## Credits

This project was created by [stephen] as part of a [Personal Project Project].

## License

[ochosteve], [2023]

## Contribution

Contributions are welcome! If you'd like to contribute to this project, please follow the standard GitHub workflow: Fork the repository, make changes, and submit a pull request.
