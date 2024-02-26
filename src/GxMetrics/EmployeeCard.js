import React, { useEffect, useState } from "react";
import "../StyleGxMetrics/EmployeeCard.css";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

const EmployeeCard = () => {
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
      <div>
        <ul>
          <h2 className="card-heading">Employee Details</h2>
        </ul>
        {(message==='') ? (<>

          <div className="modify-buttons">
            <button className="product-type" onClick={handleUpdate}>
              <strong>Edit Details</strong>
            </button>
            <button className="product-type" onClick={handlePassword}>
              <strong>Change Password</strong>
            </button>
            <button className="product-type" onClick={handleDelete}>
              <strong>Delete</strong>
            </button>
          </div>
     
         <img src={userData?.imageUrl} alt="xc"/>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>Designation</th>
                  <th>Salary</th>
                  <th>Work Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{userData.empId}</td>
                  <td>{userData.fname}</td>
                  <td>{userData.lname}</td>
                  <td>{userData.email}</td>
                  <td>{userData.address}</td>
                  <td>{userData.phoneNumber}</td>
                  <td>{userData.designation}</td>
                  <td>{userData.salary}</td>
                  <td>{userData.workLocation}</td>
                </tr>
              </tbody>
            </table>
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
};

export default EmployeeCard;
