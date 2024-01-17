import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Nav from "./components/Navbar";
import Login from "./components/Login/Login";
import Home from "./components/Home";
import Register from "./components/Login/Register";
import ProductList from "./components/ProductList";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (user) => {
    try {
      // Your login logic here

      // Assuming successful login, set the user
      setUsername(user);
      setLoggedIn(true);

      navigate("/Home");
    } catch (error) {
      console.error("Error during login:", error);
      // setLoginError("Login failed. Please check your credentials.");
    }
  };

  const handleLogout = () => {
    // Add logic for handling logout, e.g., clearing the user session
    setLoggedIn(false);
    setUsername("");

    // Redirect to the login page after logout
  };

  return (
    <BrowserRouter>
      <ToastContainer />
      <Nav loggedIn={loggedIn} username={username} onLogout={handleLogout} />
      <Routes>
       
        <Route
          path="/Login"
          element={
            loggedIn ? (
              <Navigate to="/Home" />
            ) : (
              <Login onLogin={handleLogin} loginError={loginError} />
            )
          }
        ></Route>
      
        <Route
          path="/Home"
          element={
            loggedIn ? <Home username={username} /> : <Navigate to="/Login" />
          }
        ></Route>

        {/* Add other routes as needed */}
        <Route path="/" element={<Home />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/Register" element={<Register />}/>

     

        
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;