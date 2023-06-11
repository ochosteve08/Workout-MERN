import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from './pages/Home.jsx'
import Navbar from "./components/Navbar.jsx"
// import Workout from "./pages/Workout.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import { useAuthContext } from "./Hooks/useAuthContext.jsx";


function App() {
  const {user} = useAuthContext();


  return (
    <div>
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user?<Home />:<Navigate to={"/login"}></Navigate>} />
          </Routes>
          {/* <Routes>
            <Route path="/:_id" element={<Workout />} />
          </Routes> */}
          <Routes>
            <Route path="/signup" element={user?<Navigate to="/"/>:<Signup/>} />
          </Routes>
          <Routes>
            <Route path="/login" element={user?<Navigate to="/"/>:<Login/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App
