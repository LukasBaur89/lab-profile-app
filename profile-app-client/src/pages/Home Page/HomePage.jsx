import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import uploadImage from '../../api/service';
import axios from 'axios';
import { API_URL } from '../../constants';

function HomePage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  console.log(isLoggedIn, user);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = async (e) => {
    try {
      const uploadData = new FormData();
      uploadData.append('imageUrl', e.target.files[0]);
      const data = await uploadImage(uploadData);
      console.log(data, user);
      const storedToken = localStorage.getItem('authToken');
      await axios.put(
        `${API_URL}/users`,
        // send req.body to backend url
        {
          id: user._id,
          image: data.fileUrl,
        },
        // headers required for protected route
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <h2>Username</h2>
        <p>{user?.username}</p>
        <h2>Campus</h2>
        <p>{user?.campus}</p>
        <h2>Course</h2>
        <p>{user?.course}</p>
      </div>
      <div>
        <input type="file" onChange={(e) => handleImageUpload(e)} />
        <img src={user?.image} alt="" />
      </div>
    </div>
  );
}

export default HomePage;
