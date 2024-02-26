import React from "react";
import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";

import "../StyleGxMetrics/Header.css";

import { Link, useNavigate } from 'react-router-dom';
import Dropdown from "./Dropdown";
function Header() {
 
  return (
    <>
    <header>
    
      <Navbar
        expand="lg"
        className="navbar1"
      >
        <Container>
          <Navbar.Brand>
            <Link to="/"><img style={{marginTop:"6%", marginBottom:"3%"}} className="logo-img" src="https://galaxe.com/wp-content/uploads/2024/01/galaxe-solutions-color.svg" alt=" "/></Link>
            
          </Navbar.Brand>
          
        
          <div className="dashboard-heading">
      
          <span className="">Dashboard</span>

      </div>
    <span className="profile-icon"><Dropdown/></span>
        </Container>
      </Navbar>
      </header>
      
    </>
  );
}

export default Header;
