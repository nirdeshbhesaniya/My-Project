import { Routes, Route } from "react-router-dom";
import Login from "../component/Login";
import Home from "../component/Home";
import Profile from "../component/Profile";
import RegistrationForm from "../component/RegistrationForm";
import FeedbackForm from "../component/FeedbackForm";
import Dashboard from "../component/Dashboard ";

const routers = () => {
    return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/feedback" element={<FeedbackForm/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/register" element={<RegistrationForm/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    );
  }
  
  export default routers