const {workoutServices} = require("../../services")
const mongoose = require("mongoose");

// create a new workout
const createWorkout = async (req, res) => {
  try {
    const { title, load, repetition } = req.body;
    const user_id = req.user._id;
    console.log("from client", title, load, repetition, user_id);
    let emptyField = [];
    if (!title) {
      emptyField.push("title");
    }
    if (!load) {
      emptyField.push("load");
    }
    if (!repetition) {
      emptyField.push("repetition");
    }

    if (emptyField.length > 0) {
      return res.status(400).json({ error: "please fill in all fields", emptyField });
    }

    const workout = await workoutServices.addWorkout({
      title,
      load,
      repetition,
      user_id,
    });
    
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single workout
const getWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.params.id) {
      return res.status(404).json({ message: "id not found" });
    }
    if (!mongoose.Types.ObjectId.isValid({ id })) {
      return res.status(404).json({ message: "no workout with such id" });
    }
    const workout = await workoutServices.fetchWorkout({ id });
    if (!workout) {
      return res.status(404).json({ message: "workout not found" });
    }
    return res.status(200).json(workout);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//get all workouts
const getAllWorkout = async (req, res) => {
  try {
     const user_id = req.user._id;
    const workouts = await workoutServices.fetchAllWorkout({ user_id });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update workout

const updateWorkouts = async (req, res) => {
  try {
    const { title, load, repetition } = req.body;
    const { id } = req.params;
    const updatedWorkout = await workoutServices.updateWorkout({
      title,
      load,
      repetition,
      id,
    });
    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete workout

const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.params.id) {
      return res.status(404).json({ message: "id not found" });
    }
    if (!mongoose.Types.ObjectId.isValid({ id })) {
      return res.status(404).json({ message: "no workout with such id" });
    }

    const workout = await workoutServices.removeWorkout({ id });
    if (!workout) {
      return res.status(404).json({ message: "workout not found" });
    }
   
    return res.status(200).json(workout);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createWorkout,
  getAllWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkouts,
};
