import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;


export const fetchGroomingServices = async () => {
    const response = await axios.get('http://localhost:3000/service/grooming');

    return response.data;
  };

export const fetchPetSizes = async() => {
  const response = await axios.get('http://localhost:3000/service/grooming/pet-sizes')
  return response.data;
}