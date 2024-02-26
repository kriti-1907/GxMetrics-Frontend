import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    console.log('Login data:', userData);
    // Set user data and token to local storage
    localStorage.setItem('token', userData.token);
    localStorage.setItem('email', userData.email);

    setUser(userData);
  };

  const logout = () => {
    // Clear user data and token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('cart');
    setUser(null);
  };

  useEffect(() => {
    // Check if user data exists in local storage on component mount
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');

    if (storedToken && storedEmail) {
      setUser({ token: storedToken, email: storedEmail });
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <AuthContext.Provider value={{ user, login, logout,setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
