import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const UpdateProfilegx = () => {
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
    const [address,setAddress]=useState('');
      const navigate = useNavigate(); 
      const [updatedUser,setUpdatedUser]=useState({});
    const userId=localStorage.getItem('token');
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
                salary:response.data.salary,
                email:response.data.email,
                phoneNumber:response.data.phoneNumber ,
                address:response.data.address ,
                workLocation:response.data.workLocation ,
                designation:response.data.designation,
                password:response.data.password 
              });
              setPhoneNumber(response.data.phoneNumber)
              setAddress(response.data.address)
    
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
            salary: user.salary,
            email: user.email,
            phoneNumber: phoneNumber,
            address: address,
            workLocation: user.workLocation,
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
      
          toast.success('Profile updated', { autoClose: 3000 });
         
          navigate(`/dashboard`);
        } catch (error) {
          console.error('Error updating details:', error);
        }
      };
    

    
        
              
        
     
     
    
      return (
        <>
        <Header/>
        <ToastContainer/>
        <h1 className='Outer'>Update Details</h1>
        <main className='formbody'>
        <div className='customer-form'>
        <form className='from-container' onSubmit={handleUpdateUser}>
          <div >
            <label>First Name:</label>
            <p style={{textAlign:"left"}}><strong>{user.fname}</strong></p>
          
          </div>
    
          <div>
            <label>Last Name:</label>
            <p style={{textAlign:"left"}}><strong>{user.lname}</strong></p>
        
          </div>
    
          <div>
            <label>Email Address:</label>
            <p  style={{textAlign:"left"}}><strong>{user.email}</strong></p>
           
          </div>
          <div>
         
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              required
            />
          
          </div>
          
          <div>
            <label>Designation:</label>
            <p style={{textAlign:"left"}}><strong>{user.designation}</strong></p>
          
          </div>
          
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e)=>setPhoneNumber(e.target.value)}
              required
            />
           
          </div>
          
          <div>
            <label>Employee Id:</label>
            <p style={{textAlign:"left"}}><strong>{user.empId}</strong></p>
            
          </div>
          <div>
            <label>Salary:</label>
            <p style={{textAlign:"left"}}><strong>{user.salary}</strong></p>
          </div>
          <div>
            <label>Work Location:</label>
            <p style={{textAlign:"left"}}><strong>{user.workLocation}</strong></p>
         
          </div>
          
    
    
          <input className="button button--primary button--filled  button--primary__filled button--submit" type="submit" value="Update"/>
        </form>
        <br></br>
       
        </div>
        </main>
        <Footer/>
        </>
      );
}

export default UpdateProfilegx
