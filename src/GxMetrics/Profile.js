
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

const Profile = () => {
    const [userData, setUserData] = useState({});
    const [message, setMessage] = useState('');
    const {user,setUser} = useAuth();
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
    }, [user]);
  
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
        setMessage('No record Found');
        localStorage.removeItem('token');
    localStorage.removeItem('email');
    
    setUser(null);
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
      {(user) ? (<>
      <div className="profile-card">
      <div className="profile-img">
      <img src={`data:image/jpeg;base64,${userData.image}`} alt=""/>
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
      <h2>Account </h2>
     
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
      
      <p className="info-detail">{userData.workLocation}

      </p>
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
      
      <p className="info-detail">{userData.phoneNumber}
      </p></div>
  
      
    </div></div>
      </>):<><p style={{marginLeft: "31rem",
        fontSize: "36px"}}>No record found</p><img style={{marginLeft:"-22rem",marginTop:"4rem"}} src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7265556.png?f=webp" alt=''/></>} </div>
     
      <Footer/>
      {<ConfirmationModal
        show={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={confirmDelete}
      />}
    </div>
    
  )
}

export default Profile
