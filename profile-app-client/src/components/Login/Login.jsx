import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { API_URL } from '../../constants';

function Login(props) {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });
  const { storeToken } = useContext(AuthContext);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  /*   console.log(API_URL); */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, login);
      setLogin({
        username: '',
        password: '',
      });
      const token = response.data.authToken;
      console.log('JWT token', response.data.authToken);
      storeToken(token);
      navigate('/users');
      /* props.history.push('/users'); */
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Login</h1>
        <div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={login.username}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="option"
              id="password"
              name="password"
              value={login.password}
              onChange={handleInput}
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <h1>Hello</h1>
          <p>Awesome to have you at IronProfile!</p>
        </div>
        <div>
          <p>If you login, you'll see your profile</p>
          <button type="submit">Login</button>
        </div>
      </div>
    </form>
  );
}

export default Login;
