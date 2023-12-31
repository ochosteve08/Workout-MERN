import { Link } from "react-router-dom"
import { useLogout } from "../Hooks/useSignout";
import { useAuthContext } from "../Hooks/useAuthContext";


const Navbar = () => {

  const {logout} = useLogout();
  const {user} = useAuthContext();


  const handleSubmit = () => {
    logout();
   
  }

  const  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
              <span>
                Welcome <strong>
                  {user.user.name
                    ? capitalizeFirstLetter(user.user.name.split(" ")[0])
                    : user.user.email}
                </strong>
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