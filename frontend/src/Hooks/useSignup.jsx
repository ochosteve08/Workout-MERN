import { useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import { toast } from "react-toastify";

const useSignup = () => {

        const { dispatch } = useAuthContext();
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(null); 

           const signup = async (name,email, password) => {
              
             try {
              setLoading(true);
              setError(null);
               const response = await fetch(
                 "http://localhost:4000/api/users/register",
                 {
                   method: "POST",
                   headers: { "Content-Type": "application/json" },
                   body: JSON.stringify({ name,email, password }),
                 }
               );
               const json = await response.json();
            

               if (!response.ok) {
                 setError(json.error);
                 setLoading(false);
                 toast.error(json.error);
               }
               if (response.ok) {
                 toast.success("Signup successful");
                // save user to local storage
                localStorage.setItem("user",JSON.stringify(json))
               
                
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

  return {signup, error, loading}
}

export default useSignup