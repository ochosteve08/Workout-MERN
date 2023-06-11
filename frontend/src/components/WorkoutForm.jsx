import { useState } from "react";
import { useWorkoutContext } from "../Hooks/useWorkoutContext";
import { useAuthContext } from "../Hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const {user} = useAuthContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [repetition, setRepetition] = useState("");
  const [error, setError] = useState("");
 const [emptyField, setEmptyField] = useState([]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user){
      setError("you must be logged in");
      return;
    }

    const workout = { title, load, repetition };

    const response = await fetch("http://localhost:4000/api/workouts/", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyField(json.emptyField);

      }
    if (response.ok) {
      dispatch({
        type: "CREATE_WORKOUT",
        payload: json,
      });
      setTitle("");
      setLoad("");
      setRepetition("");
      console.log(json);

    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label htmlFor="title">Exercise Title:</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        // className={emptyField.includes("title") ? "error" : ""}
      />

      <label htmlFor="load">Load (in Kg):</label>
      <input
        type="number"
        name="load"
        value={load}
        onChange={(event) => setLoad(event.target.value)}
        // className={emptyField.includes("load") ? "error" : ""}
      />

      <label htmlFor="repetition">Repetition:</label>
      <input
        type="number"
        name="repetition"
        value={repetition}
        onChange={(event) => setRepetition(event.target.value)}
        // className={emptyField.includes("repetition") ? "error" : ""}
      />
      <button type="submit">Add Workout</button>
      <div className="error">{error}</div>
    </form>
  );
};

export default WorkoutForm;
