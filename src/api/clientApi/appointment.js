import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

export const requestAppointment = async (data) => {
    const response = await axios.post('http://localhost:3000/client/appointment/create', data);
    return response.data;
  };
  