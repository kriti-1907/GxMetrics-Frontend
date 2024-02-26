import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../StyleGxMetrics/Registrationgx.css';

import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Header from './Header';
import Footer from './Footer';
import swal from 'sweetalert';

import '../StyleGxMetrics/ProfilePage.css';
import ConfirmationModal from "./ConfirmationModal";
import { faAddressCard, faAngleRight, faPenToSquare, faTrash,  faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from '../Context/AuthContext';


const UpdatePassword = () => {
    const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState('');
  const user = useAuth();
 
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);



  const navigate=useNavigate();
  const userId=localStorage.getItem("token")

  
  const handleUpdatePassword = async (e) => {
    
   
    e.preventDefault();
    
    try {
    
      if (newPassword !== confirmPassword) {
        toast.error('Passwords do not match!', { autoClose: 3000 });
        return;
      }
console.log(newPassword)
     
      const response = await axios.patch(`http://localhost:8080/api/Users/change-password/${userId}`, 
      { newPassword: newPassword } 
        
      );
      swal({
        title: "Password Changed",
        text: "Password Changed successfully!",
        icon: "success",
        timer: 3000,
        
      });
    
      if(response.status===200)
      {
        setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
      }
    } catch (error) {
      console.error('Failed to update password:', error);
 
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
      <h2>Update Passowrd</h2>
      <div className="general-info">
      <form onSubmit={handleUpdatePassword}>
      <div className="password">
      
      <p>New Password
      
      </p>
      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></div>
     
  <div className="confirm-password">
      <p className="heading">Confirm Password
    
     
      </p>
      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      <button className="login-button" type="submit" >Change Password</button>
      </form>
     </div>
      
      </div>
      </div>
      <Footer/>
    </div>
  )
}

export default UpdatePassword
