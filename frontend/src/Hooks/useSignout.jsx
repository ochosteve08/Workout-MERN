import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  //remove user from local storage
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({
      type: "LOGOUT_USER",
    });
    toast.success("LogOut successful");
  };
  return { logout };
};
