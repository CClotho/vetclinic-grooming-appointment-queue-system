import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;


export const fetchGroomingServices = async () => {
    const response = await axios.get('http://localhost:3000/admin/service/grooming');

    return response.data;
  };