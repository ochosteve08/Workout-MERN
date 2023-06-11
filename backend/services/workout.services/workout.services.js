const {workoutModel} = require('../../model');

const addWorkout = async ({ title, load, repetition, user_id }) => {
  return await workoutModel.create({ title, load, repetition, user_id });
};
const fetchAllWorkout = async () => await workoutModel.find().sort({createdAt: -1});
const fetchWorkout = async ({ id }) => await workoutModel.findOne({ _id: id });
const removeWorkout = async ({ id }) =>
  await workoutModel.findByIdAndDelete({ _id: id });
const updateWorkout = async ({ title, load, repetition, id }) =>
  await workoutModel.findByIdAndUpdate(
    { title, load, repetition, _id: id },
    { returnedDocument: "after" }
  );

  module.exports = {
    addWorkout,
    fetchAllWorkout,
    fetchWorkout,
    removeWorkout,
    updateWorkout,
  };