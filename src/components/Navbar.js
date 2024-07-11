import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
    Nav,
    UserIcon,
    Dropdown,
    DropdownItem,
    NavLinks,
  } from './StyledComponents';
import logo from '../assets/userIcon.png';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Nav>
      <NavLinks>
        <Link to="/expenses">Dashboard</Link>
        <Link to="/add-expense">Add Expenses</Link>
      </NavLinks>
      {currentUser && (
        <UserIcon onClick={() => setDropdownOpen(!dropdownOpen)}>
          <img src={logo} alt="User Icon" width={40} height={40} />
          {dropdownOpen && (
            <Dropdown>
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </Dropdown>
          )}
        </UserIcon>
      )}
    </Nav>
  );
};

export default Navbar;
