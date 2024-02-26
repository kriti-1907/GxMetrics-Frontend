import React, { useEffect, useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import '../StyleGxMetrics/ProfilePage.css';
import ConfirmationModal from "./ConfirmationModal";
const ProfilePAge = () => {
    const [userData, setUserData] = useState({});
    const [message, setMessage] = useState('');
    const user = useAuth();
    const userId = localStorage.getItem("token");
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const navigate = useNavigate();
  
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
        navigate('/personal-info');
    }
    const handlePassword = () => {
      navigate('/change-password');
    };
  
    const handleUpdate = () => {
      navigate('updategx');
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
      <>
        <Header />
        
        <div className="employee-data">
        <div className="profile-image"> <div className="account-buttons"><img style={{     borderRadius: "50%",
        width:"91px"}} src={userData?.imageUrl} alt=""/>
       <p>Welcome, {userData.fname} {' '} {userData.lname}</p></div>
        <div className="modify-buttons">
        <button className="personal-info" onClick={handleInfo}>
             <strong>Personal Info</strong>
           </button>
           <hr></hr>
           <button className="update-details" onClick={handleUpdate}>
             <strong>Edit Details</strong>
           </button>
           <hr></hr>
           <button className="change-pass" onClick={handlePassword}>
             <strong>Change Password</strong>
           </button>
           <hr></hr>
           <button  className="delete-account" onClick={handleDelete}>
             <strong>Delete Account</strong>
           </button>
           </div>
         </div>
          {(message==='') ? (<>
  
            
       <div className="employee-image">
           <img style={{     borderRadius: "50%",
            width:"216px"}} src={userData?.imageUrl} alt=""/>
           <h1>Welcome, {userData.fname} {' '} {userData.lname}</h1>
           </div>
              
              </>):(<p>{message}</p>)}
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
          
        </div>
        <Footer />
        {<ConfirmationModal
          show={showConfirmationModal}
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={confirmDelete}
        />}
  
      </>
    );
}

export default ProfilePAge
