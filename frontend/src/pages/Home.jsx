/* eslint-disable no-unused-vars */

import { useEffect } from "react";
import WorkoutDetail from "../components/WorkoutDetail";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../Hooks/useWorkoutContext";
import { useAuthContext } from "../Hooks/useAuthContext";

const Home = () => {
  const {workouts, dispatch} = useWorkoutContext();
  const {user} = useAuthContext();
  
  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch("http://localhost:4000/api/workouts",{
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      });
      const result = await response.json();
     
      if (response.ok) {
           dispatch({
           type: "SET_WORKOUT",
           payload: result,
         });
      }
    };
    if (user){
       fetchWorkout();
    }
   
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => <WorkoutDetail workout={workout} key={workout._id}/>)}
      </div>
      <WorkoutForm/>
    </div>
  );
};

export default Home;
