/* eslint-disable react/prop-types */

import { useWorkoutContext } from "../Hooks/useWorkoutContext";
import { useAuthContext } from "../Hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { toast } from "react-toastify";

const WorkoutDetail = ({workout}) => {

    const {dispatch} = useWorkoutContext();
    const {user} = useAuthContext();
    const {_id: id} = workout;
    const { title, load, repetition, createdAt } = workout;
    // const dateAndTime = new Date(createdAt);
    // const date = dateAndTime.toDateString();
    // const time = dateAndTime.toLocaleTimeString();

    const handleDelete = async () => {
      console.log(user)
      if (!user) {
        return;
      }
      else{
        const response = await fetch(
          "http://localhost:4000/api/workouts/" + id,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await response.json();

        if (response.ok) {
          dispatch({
            type: "DELETE_WORKOUT",
            payload: json,
          });
          toast.success("workout deleted");
          console.log("item is deleted successfully");
        }
      }
    };
    
       
 

  return (
    <div className="workout-details">
      <h3>{title}</h3>
      <p>
        <strong>Load(kg): </strong> {load}
      </p>
      <p>
        <strong>Repetition: </strong>
        {repetition}
      </p>
      <p>{formatDistanceToNow(new Date(createdAt), {addSuffix: true})}</p>
      <span onClick={handleDelete}>Delete</span>
    </div>
  );
}

export default WorkoutDetail