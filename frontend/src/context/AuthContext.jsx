/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { user: action.payload };

    case "LOGOUT_USER":
      return { user: null };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, { user: null });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({
        type: "LOGIN_USER",
        payload: user,
      });
    }
  }, []);
  console.log("AuthContext state:", state.user);
 

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
