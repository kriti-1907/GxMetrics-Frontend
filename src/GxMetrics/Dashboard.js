import React from 'react'
import Header from "../GxMetrics/Header"
import { Link } from 'react-router-dom'
import Footer from '../GxMetrics/Footer'
import { ToastContainer, toast } from 'react-toastify';
const Dashboard = () => {
  return (
    <div>
    <ToastContainer/>
      <Header/>
      <div className='dashboard-btns'>
      <Link to="/logingx" ><button className='login-dashboard'>Login</button></Link>
      <Link to='/registergx'><button className='register-dashboard'>Register</button></Link>
      <br>
      </br>
      <br>
      </br>
      </div>
     <Footer/>
    </div>
  )
}

export default Dashboard
