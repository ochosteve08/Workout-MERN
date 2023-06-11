import {useState} from 'react'
import useSignup from '../Hooks/useSignup';


const Signup = () => {
   
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signup, error, loading} = useSignup();
  

  const handleSubmit = async(event)=>{
        event.preventDefault();
        await signup(name,email, password);
        console.log(error)
   
    }


  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>SIGN UP</h3>
      <label htmlFor="name">Full Name:</label>
      <input
        name="name"
        type="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="surname lastname"
      />
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
      <button type="submit" disabled={loading}>
        REGISTER
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Signup