import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";
import { useWorkoutContext } from "./useWorkoutContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const {dispatch :  workoutDispatch} = useWorkoutContext();
  //remove user from local storage
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({
      type: "LOGOUT_USER",
    });
    toast.success("LogOut successful");
    workoutDispatch({
       type: "SET_WORKOUT",
       payload: null,
     });
  };
  return { logout };
};
