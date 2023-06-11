const express = require("express");
const {
  getAllWorkout,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkouts,
} = require("../controllers/workout.controllers");
const requireAuth =require('../middleware/requireAuth')

const workoutRoutes = express.Router();

// require Auth for all routes
workoutRoutes.use(requireAuth);

//GET all workout
workoutRoutes.get("/", getAllWorkout);

//GET a single workout
workoutRoutes.get("/:id", getWorkout);

//POST a new workout
workoutRoutes.post("/", createWorkout);

//DELETE a single workout
workoutRoutes.delete("/:id", deleteWorkout);

//UPDATE a single workout
workoutRoutes.patch("/:id", updateWorkouts);

module.exports = workoutRoutes;
