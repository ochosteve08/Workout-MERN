import { Link } from "react-router-dom"
import { useLogout } from "../Hooks/useSignout";
import { useAuthContext } from "../Hooks/useAuthContext";


const Navbar = () => {

  const {logout} = useLogout();
  const {user} = useAuthContext();
  console.log(user);

  const handleSubmit = () => {
    logout();
   

  }
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>

        <nav>
          {user && (
            <div>
              <span>{user.email}
                {/* Welcome <strong>{user.name.split(" ")[0]}</strong>{" "} */}
              </span>
              <button onClick={handleSubmit}>LOGOUT</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">LOGIN</Link>
              <Link to="/signup">SIGNUP</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar