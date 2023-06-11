import { useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";


const useLogin = () => {
  
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const signin = async (email, password) => {
    //   const user = { email, password };
    
    try {
      setLoading(true);
      setError(null);
       const response = await fetch(
                 "http://localhost:4000/api/users/login",
                 {
                   method: "POST",
                   headers: { "Content-Type": "application/json" },
                   body: JSON.stringify({ email, password }),
                 })
      const json = await response.json();
      console.log(json);

      if (!response.ok) {
        setError(json.error);
        setLoading(false);
      }
      if (response.ok) {
        // save user to local storage
        localStorage.setItem("user", JSON.stringify(json));

        //update the auth context
        dispatch({
          type: "LOGIN_USER",
          payload: json,
        });
        setError(null);
        setLoading(false);
      
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { signin, error, loading };
};

export default useLogin;
