import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'

const Account = () => {
  return (
    <div>
      <Header/>
      <div className='dashboard-btns'>
      <Link to="/updategx" ><button className='login-dashboard'>Edit Details</button></Link>
      <Link to='/change-password'><button className='register-dashboard'>Change Password</button></Link>
      <br>
      </br>
      <br></br>
      </div>
      <Footer/>
    </div>
  )
}

export default Account;
