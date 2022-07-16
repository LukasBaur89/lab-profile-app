import axios from 'axios';
import { API_URL } from '../constants';

const api = axios.create({ baseURL: API_URL });

const errorHandling = (err) => {
  throw err;
};

const uploadImage = async (image) => {
  try {
    const response = await api.post('/upload', image);
    console.log(response.data);
    return response.data;
  } catch (error) {
    errorHandling();
  }
};

export default uploadImage;
