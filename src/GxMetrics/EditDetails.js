
import React, { useEffect, useState } from "react";
import "../StyleGxMetrics/Profile.css";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import '../StyleGxMetrics/ProfilePage.css';
import ConfirmationModal from "./ConfirmationModal";
import { faAddressCard, faAngleRight, faPenToSquare, faTrash,  faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const EditDetails = () => {
    const [userData, setUserData] = useState({});
    const [message, setMessage] = useState('');
    
    const userId = localStorage.getItem("token");
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const navigate = useNavigate();
  
    const [user, setUser] = useState({fname:'' ,
    lname:'' ,
    empId:0,
    salary:0,
    email:'',
    phoneNumber:0,
    address:'',
    workLocation:'' ,
    designation:'',
    password:'' });
const [phoneNumber,setPhoneNumber]=useState();

const [workLocation,setWorkLocation]=useState();


  const [errors, setErrors] = useState({});
  useEffect(() => {
    fetchProductDetails();
  }, [userId]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/Users/getuser/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Origin': '*', 
        }, });
        const data =response.data;
        setUser({
            fname:response.data.fname ,
            lname:response.data.lname ,
            empId:response.data.empId,
           
            email:response.data.email,
            phoneNumber:response.data.phoneNumber ,
            
            workLocation:response.data.workLocation ,
            designation:response.data.designation,
            password:response.data.password 
          });
          setPhoneNumber(response.data.phoneNumber)
          setWorkLocation(response.data.workLocation)
        

      console.log(user)
       
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };
  
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        fname: user.fname,
        lname: user.lname,
        empId: user.empId,
       
        email: user.email,
        phoneNumber: phoneNumber,
      
        workLocation: workLocation,
        designation: user.designation,
        password: user.password,
      };
  
      await axios.put(`http://localhost:8080/api/Users/update-user/${userId}`, updatedUser, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Origin': '*',
        },
      });
  
    //   toast.success('Profile updated', { autoClose: 3000 });
     
      navigate(`/dashboard`);
    } catch (error) {
      console.error('Error updating details:', error);
    }
  };



    
          
    
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/Users/getuser/${userId}`
        );
        const data = response.data;
  
        setUserData(data);
  
        // Check userData.status and set message accordingly
        
      } catch (error) {
        console.error("Error fetching details");
      }
    };
  
    useEffect(() => {
      fetchUserDetails();
    }, [user?.token]);
  
    const handleInfo=()=>{
        navigate('/dashboard');
    }
    const handlePassword = () => {
      navigate('/change-password');
    };
  
    const handleUpdate = () => {
      navigate('/updategx');
    };
  
    const handleDelete = () => {
      setShowConfirmationModal(true);
    };
  
    const confirmDelete = async () => {
      try {
        await axios.delete(`http://localhost:8080/api/Users/delete-user/${userId}`);
        setMessage('Record deleted successfully');
      } catch (error) {
        console.error('Error deleting record:', error.message);
      } finally {
        setShowConfirmationModal(false);
      }
    };
  
  return (
    <div>
      <Header/>
      <div className="profile">
      <div className="profile-card">
      <div className="profile-img">
      <img src={userData.imageUrl} alt=""/>
      <p>Hi {userData.fname}{' '}{userData.lname}!</p>
      </div>
      <div className="buttons-modify">
      <hr></hr>
      <FontAwesomeIcon icon={faAddressCard} /> <button onClick={handleInfo}>Account</button><FontAwesomeIcon icon={faAngleRight} />
      <hr></hr>
      <FontAwesomeIcon icon={faUserPen} /> <button onClick={handleUpdate}>Edit Details</button><FontAwesomeIcon icon={faAngleRight} />
      <hr></hr>
      <FontAwesomeIcon icon={faPenToSquare} />  <button onClick={handlePassword}>Change Password</button><FontAwesomeIcon icon={faAngleRight} />
      <hr></hr>
      <FontAwesomeIcon icon={faTrash} />{' ' }<button onClick={handleDelete}>Delete Account</button><FontAwesomeIcon icon={faAngleRight} />
      <hr></hr>
      
      </div>

      </div>
      <div className="account">
      <h2>Account Settings</h2>
      <form onSubmit={handleUpdateUser}>
      <div className="general-info">
     <div className="general-info-heading"> <p>General Info</p></div>
      <div className="name">
      <p className="heading">Name</p>
      
      <p className="info-detail">{userData.fname}{' '}{userData.lname}
      </p></div>
      <div className="empId">
      <p className="heading">Employee Id</p>
      
      <p className="info-detail">{userData.empId}
      </p></div>
  <div className="name">
      <p className="heading">Designation</p>
      
      <p className="info-detail">{userData.designation}
     
      </p></div>
      <div className="empId"><p className="heading">Work Location</p>
      
      <input
              type="text"
              name="workLocation"
              value={workLocation}
              onChange={(e)=>setWorkLocation(e.target.value)}
              required
            />
      </div>
      
    
      </div>
      <div className="general-info">
     <div className="general-info-heading"> <p>Contact Details</p></div>
      <div className="name">
      <p className="heading">Email</p>
      
      <p className="info-detail">{userData.email}
      </p></div>
      <div className="empId">
      <p className="heading">Mobile</p>
      
      <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e)=>setPhoneNumber(e.target.value)}
              required
            /></div>
  
      
    </div><button className="login-button" type="submit" >Update Account</button>
    </form></div>
    
      </div>
      <Footer/>
    </div>
    
  )
}

export default EditDetails;
