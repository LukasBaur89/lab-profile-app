import { useState, useEffect, createContext } from 'react';
import { API_URL } from '../constants';
import axios from 'axios';

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  // state: isLoggedIn, isLoading, user - stores user information and auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // function storeToken, authenticateUser, logOutUser - handling authentication logic

  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  };

  // Get stored token from localStorage
  const authenticateUser = async () => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      console.log('Here', storedToken);
      try {
        const response = await axios.get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        // if server verifies that jwt token is valid
        const user = response.data;
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);
      } catch (error) {
        console.log(error.message);
        // if server sends error response (token is invalid), update state variables
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      }
    } else {
      // if token is not available
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };
  // if user logs out, remove token from localStorage
  const removeToken = () => {
    localStorage.removeItem('authToken');
  };

  // check if the token exists in localStorage
  const logOutUser = () => {
    removeToken();
  };

  useEffect(() => {
    // render
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
