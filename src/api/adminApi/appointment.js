import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
// POST create pet

export const createAppointment = async (data) => {
  const response = await axios.post('http://localhost:3000/admin/appointment/create', data);
  return response.data;
};
