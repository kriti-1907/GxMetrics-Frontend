import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { faUser, faUserPlus, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../StyleGxMetrics/DropDown.css';
import { useAuth } from '../Context/AuthContext';

const Dropdown = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    setDropdownOpen(false);
  }, [user]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
    
  };
  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faUser} size='lg'/>
      </button>

      {isDropdownOpen && (
        <>
          <div className="overlay" onClick={() => setDropdownOpen(false)}></div>
          <div className="dropdown-content">
            {(user) ? (
              <>
              {(user.role==='ADMIN')?( <Link to="/admin"> 
              <button>
              <FontAwesomeIcon icon={faUser} />&nbsp; Admin
              </button>
            </Link>):(
                <Link to="/accountgx">
                  <button>
                    <FontAwesomeIcon icon={faUser} />&nbsp;Account
                  </button>
                </Link>)}
                <Link to='/'>
                  <button onClick={logout}>
                    <FontAwesomeIcon icon={faArrowRightToBracket} />&nbsp;Logout
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/logingx">
                  <button>
                    <FontAwesomeIcon icon={faArrowRightToBracket} />&nbsp;Login
                  </button>
                </Link>
                <Link to="/registergx">
                  <button>
                    <FontAwesomeIcon icon={faUserPlus} />&nbsp;Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;
