import React, { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import "../StyleGxMetrics/Logingx.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuth } from "../Context/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import swal from "sweetalert";
import Header from "./Header";
import Footer from "./Footer";
import { faEnvelope,  faLock } from "@fortawesome/free-solid-svg-icons";

const Logingx = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/Users/login",
        credentials
      );
      console.log(response.data);
        const { userId, email} = response.data;
        login({ token: userId, email: email });

        swal({
          title: "Login successful",
          text: "You are successfully logged in!",
          icon: "success",
          timer: 3000,
          
        });
      
    
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      toast.success("Incorrect Credentials", { autoClose: 3000 });
    }
  };
 


     
  return (
    <>
      <Header/>
      <ToastContainer />
      
      <div className="loginbody">
        <div className="wrapper">
          <form  onSubmit={handleSubmit}>
          <h2 >Login</h2>
            <div className="input-box">
            <span className="icons"><FontAwesomeIcon icon={faEnvelope} /></span>
              
              <input
                type="text"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
              <label>Email Address:</label>
            </div>
            
            <div className="input-box">
            <span className="icons"><FontAwesomeIcon icon={faLock} /></span>
            
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
              <label>Password:</label>
            </div>
            <p className="forgot-your-pass">
            Forgot your password?
          </p>
          <button className="login-button" type="submit" >Sign In</button>
          </form>
          
          
          <Link to="/register" >
            <p className="register-link">Not a member? Register here.</p>
          </Link>
          
            
        </div>
      </div>
      <Footer/>

      
   
    </>
  );
};

export default Logingx;
