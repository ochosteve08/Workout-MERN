import { useState } from "react";
import useLogin from "../Hooks/useLogin";

const Login = () => {

  const { signin, loading} = useLogin();
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
  await signin(email, password);
   setEmail("");
   setPassword("");
   
  
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>LOG IN</h3>
      <label htmlFor="email">Email:</label>
      <input
        name="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="ochosteve@yahoo.com"
      />
      <label htmlFor="password">Password:</label>
      <input
        name="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="password"
      />
      <button disabled={loading} type="submit"> LOGIN </button>
    
    </form>
  );
};

export default Login;
