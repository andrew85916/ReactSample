import { useState } from "react";
import Home from "./pages/home";
import { BrowserRouter, Route, Routes,Navigate  } from "react-router-dom";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Profile from "./pages/profile";
import "./App.css";


export default function App() {
  // check jwt token
  // const token = localStorage.getItem("token");
  // if (token) {
  //   setAuthToken(token);
  // }

  return (
    
    // <AuthContext.Provider value={{ user, setUser }}>
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Navigate to="/home" />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route exact path="/sign_in" element={<SignIn />}></Route>
        <Route exact path="/sign_up" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
    // </AuthContext.Provider>
  );
}
