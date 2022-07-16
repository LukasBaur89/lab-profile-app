import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    username: '',
    password: '',
    campus: '',
    course: '',
    imageUrl: '',
  });

  const options = [
    'Madrid',
    'Barcelona',
    'Miami',
    'Paris',
    'Berlin',
    'Amsterdam',
    'México',
    'Sao Paulo',
    'Lisbon',
    'Remote',
  ];

  const courseOptions = [
    'Web Dev',
    'UX/UI',
    'Data Analytics',
    'Cyber Security',
  ];

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setSignup({ ...signup, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(signup);
      await axios.post(`${API_URL}/auth/signup`, signup);
      setSignup({
        username: '',
        password: '',
        campus: '',
        course: '',
      });
      navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Signup</h1>
        <div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={signup.username}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="option"
              id="password"
              name="password"
              value={signup.password}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="campus">Campus</label>
            <select
              type="text"
              id="campus"
              name="campus"
              value={signup.campus}
              onChange={handleInput}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="course">Course</label>
            <select
              type="text"
              id="course"
              name="course"
              value={signup.course}
              onChange={handleInput}
            >
              {courseOptions.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h1>Hello</h1>
          <p>Welcome to IronProfile!</p>
        </div>
        <div>
          <p>
            If you signup, agree with all our terms and conditions where we can
            do whatever we want with the data
          </p>
          <button type="submit">Create the Account</button>
        </div>
      </div>
    </form>
  );
}

export default Signup;
