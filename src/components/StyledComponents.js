// src/components/StyledComponents.js
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { NavLink as RouterNavLink } from 'react-router-dom';

// Define keyframes for transitions
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Color palette
const colors = {
  background: '#F0F8FF', // AliceBlue
  primary: '#5DADE2', // Medium Aquamarine
  primaryHover: '#4a9bce', 
  primaryActive: '#3881b2',
  text: '#34495E', // Dark Slate Gray
  inputBorder: '#ddd',
  inputFocusBorder: '#82E0AA', // Medium Aquamarine
  buttonText: '#fff',
  googleButton: '#de5246',
  googleButtonHover: '#c74236',
  googleButtonActive: '#b63126',
  error: 'red',
  dropdownBackground: '#fff',
  dropdownHover: '#f0f0f0',
  tableEvenRow: '#f9f9f9',
  tableHover: '#f1f1f1',
};

// Styled container for forms
export const FormContainer = styled.div`
  max-width: 80%;
  margin: 50px auto;
  padding: 30px;
  background: ${colors.background};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 20px;
  }

  @media (max-width: 480px) {
    max-width: 95%;
    padding: 15px;
  }
`;

// Styled headings
export const Heading = styled.h2`
  color: ${colors.primary};
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

// Styled labels
export const Label = styled.label`
  display: block;
  margin-bottom: 15px;
  color: ${colors.text};
  font-weight: 500;
`;

// Styled input fields
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${colors.inputBorder};
  border-radius: 5px;
  margin-bottom: 15px;
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: ${colors.inputFocusBorder};
    box-shadow: 0 0 5px rgba(130, 224, 170, 0.5);
    outline: none;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

// Styled button
export const Button = styled.button`
  background: ${colors.primary};
  color: ${colors.buttonText};
  padding: 10px 15px;
  margin: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: ${colors.primaryHover};
    transform: scale(1.05);
  }
  
  &:active {
    background: ${colors.primaryActive};
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

// Google sign-in button
export const GoogleButton = styled(Button)`
  background: ${colors.googleButton};
  margin-top: 20px;
  margin: 0.5rem;
  &:hover {
    background: ${colors.googleButtonHover};
  }

  &:active {
    background: ${colors.googleButtonActive};
  }
`;

// Error message
export const ErrorMsg = styled.div`
  color: ${colors.error};
  margin-top: -10px;
  margin-bottom: 10px;
  font-size: 14px;
`;

// Form transition wrapper
export const TransitionWrapper = styled.div`
  animation: ${slideUp} 0.5s ease-in-out;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${colors.background};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

export const NavLink = styled(RouterNavLink)`
  text-decoration: none;
  color: ${colors.text};
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    display: block;
    margin-top: 5px;
    right: 0;
    background: ${colors.primary};
    transition: width 0.3s ease;
    -webkit-transition: width 0.3s ease;
  }

  &:hover {
    color: ${colors.primary};

    &::after {
      width: 100%;
      left: 0;
      background: ${colors.primary};
    }
  }

  &.active {
    color: ${colors.primary};

    &::after {
      width: 100%;
      left: 0;
      background: ${colors.primary};
    }
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0;
  }
`;

export const UserIcon = styled.div`
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.3s ease;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${colors.dropdownBackground};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

export const DropdownItem = styled.div`
  padding: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${colors.dropdownHover};
  }
`;

export const Select = styled.select`
  padding: 0.5rem;
  margin-top:1rem;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid ${colors.inputBorder};
  background-color: ${colors.dropdownBackground};
  font-size: 1rem;
  color: ${colors.text};
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: ${colors.primary};
  }

  @media (max-width: 480px) {
    padding: 0.4rem;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

export const Th = styled.th`
  padding: 0.5rem;
  border-bottom: 1px solid ${colors.inputBorder};
  text-align: left;
`;

export const Td = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid ${colors.inputBorder};
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: ${colors.tableEvenRow};
  }

  &:hover {
    background-color: ${colors.tableHover};
  }
`;
