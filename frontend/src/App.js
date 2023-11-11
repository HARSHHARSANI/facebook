import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login.js";
import Profile from "./pages/profile/Profile.js";
import Home from "./pages/home/Home.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
