import React, { useState } from 'react';
import axios from 'axios';
import '../StyleGxMetrics/Registrationgx.css';

import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Header from './Header';
import Footer from './Footer';
import swal from 'sweetalert';



const ChangePassword = () => {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

//   const { id } = useParams();
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
            navigate('/accountgx');
          }, 1000);
      }
    } catch (error) {
      console.error('Failed to update password:', error);
 
    }
  };

  return (
    <>
    <ToastContainer/>
   <Header/>
  
    <h1 className='Outer'>Change Password</h1>
    <main className='formbody'>
    <div className='customer-form'>
        <form  className="form-container" onSubmit={handleUpdatePassword}>
      <div>
        <label>New Password:</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </div>
      <br/>
      <div>
        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      <br></br>
      <button style={{backgroundColor:"#00294d"}} className='passwordbutton' type="submit">Reset Password</button> 
    
      </form>
      </div>
      </main>
      <Footer/>
      
    </>
  );
};

export default ChangePassword;
