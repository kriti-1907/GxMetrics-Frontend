import React, { useState } from "react";
import axios from "axios";
import "../StyleGxMetrics/Registrationgx.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from "./Footer";
import swal from "sweetalert";

const Registrationgx = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    empId: 0,
    salary: 0,
    email: "",
    phoneNumber: 0,
    address: "",
    workLocation: "Bangalore",
    designation: "Associate Developer",
    password: "",
    imageFile: null, // Add a property for the image file
    dob: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "dob") {
      // Handle date format conversion
      const selectedDate = new Date(e.target.value);
      const formattedDate = selectedDate.toISOString().split("T")[0];

      setUser({
        ...user,
        dob: formattedDate,
      });
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleFileChange = (e) => {
    setUser({
      ...user,
      imageFile: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(user);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }

    try {
      const formData = new FormData();
      formData.append("fname", user.fname);
      formData.append("lname", user.lname);
      formData.append("empId", user.empId);
      formData.append("salary", user.salary);
      formData.append("email", user.email);
      formData.append("phoneNumber", user.phoneNumber);
      formData.append("address", user.address);
      formData.append("workLocation", user.workLocation);
      formData.append("designation", user.designation);
      formData.append("password", user.password);
      formData.append("dob", user.dob);
      formData.append("image", user.imageFile);

      const response = await axios.post(
        "http://localhost:8080/api/Users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Account created successfully", { autoClose: 3000 });
        setUser({
          fname: "",
          lname: "",
          empId: 0,
          email: "",
          phoneNumber: 9140003211,
          workLocation: "Bangalore",
          designation: "Associate Developer",
          password: "",
          dob: "",

          imageFile: null,
        });
        setErrors({});
        swal({
          icon: "success",
          title: "Account Created",
          text: "You have successfully created a new account!",
          showConfirmButton: true,
          timer: 3000,
        });
        navigate("/logingx");
      }
    } catch (error) {
      console.error("Registration failed", error);
      if (error.response && error.response.status === 409) {
        toast.error("Account already exists. Please use a different email.", {
          autoClose: 3000,
        });
      }
    }
  };

  const validateForm = (userData) => {
    const errors = {};

    // Validate firstname
    if (!userData.fname.trim()) {
      errors.fname = "First name is required";
    } else if (!isValidAlphabets(userData.fname)) {
      errors.fname = "First name must contain only alphabets";
    }

    // Validate lastname
    if (!userData.lname.trim()) {
      errors.lname = "Last name is required";
    } else if (!isValidAlphabets(userData.lname)) {
      errors.lname = "Last name must contain only alphabets";
    }

    // Validate email
    if (!userData.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(userData.email)) {
      errors.email = "Invalid email format";
    }

    // Validate password
    if (!userData.password.trim()) {
      errors.password = "Password is required";
    } else if (!isValidPassword(userData.password)) {
      errors.password =
        "Password must be at least 8 characters and contain at least one digit, one lowercase letter, one uppercase letter, one special character, and no whitespace";
    }
    // Validate phone number
    const phoneNumberRegex = /^[6-9]\d{9}$/;
    if (!userData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!phoneNumberRegex.test(userData.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number format";
    }
    const currentDate = new Date();
    const dob = new Date(userData.dob);
    const ageDiff = currentDate.getFullYear() - dob.getFullYear();

    if (ageDiff < 18) {
      errors.dob = "You must be at least 18 years old to register";
    }

    return errors;
  };

  const isValidAlphabets = (value) => {
    const alphabetsRegex = /^[a-zA-Z]+$/;
    return alphabetsRegex.test(value);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <>
      <Header />
      <ToastContainer />

      <div className="loginbody">
        <div className="">
          <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div className="input-box">
              <span className="icons"></span>

              <input
                type="text"
                name="fname"
                value={user.fname}
                onChange={handleChange}
                required
              />
              <label>First Name:</label>
              {errors.fname && <span className="error">{errors.fname}</span>}
            </div>

            <div className="input-box">
              <span className="icons"></span>

              <input
                type="text"
                name="lname"
                value={user.lname}
                onChange={handleChange}
                required
              />
              <label>Last Name:</label>
              {errors.lname && <span className="error">{errors.lname}</span>}
            </div>
            <div className="input-box">
              <span className="icons"></span>

              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
              <label>Email:</label>
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
              />
              <label>Password:</label>
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="image-input">
              <span className="icons"></span>
              <label>Profile Image:</label>
              <input
                style={{
                  background: "white",
                  marginLeft: "-11px !important",
                  fontSize: "14px !important",
                  marginTop: "-8px !important",
                }}
                type="file"
                accept="image/*"
                name="imageFile"
                onChange={handleFileChange}
              />
            </div>
            <div className="dob-input">
              <label>Date of Birth:</label>
              <span className="icons"></span>
              <input
               
                type="date"
                name="dob"
                value={user.dob}
                onChange={handleChange}
                required
              />{" "}
              {errors.dob && <span className="error">{errors.dob}</span>}
            </div>
            <div className="input-box">
              <span className="icons"></span>

              <input
                type="text"
                name="workLocation"
                value={user.workLocation}
                onChange={handleChange}
                required
              />
              <label>Work Location:</label>
              
            </div>

            <div className="input-box">
              <span className="icons"></span>

              <input
                type="text"
                name="empId"
                value={user.empId}
                onChange={handleChange}
                required
              />
              <label>Employee Id:</label>
            </div>
            <div className="input-box">
              <span className="icons"></span>

              <input
                type="text"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                required
              />
              <label>Phone Number:</label>
              {errors.phoneNumber && (
                <span className="error">{errors.phoneNumber}</span>
              )}
            </div>

            <button className="login-button" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Registrationgx;
