import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;


export const createTreatment = async (data) => {
  const response = await axios.post('http://localhost:3000/admin/service/create/treatment', data);
  return response.data;
};


export const editTreatment = async ( updatedData) => {
  const response = await axios.put(`http://localhost:3000/admin/service/edit/treatment`, updatedData);
  return response.data;
};

// ... other CRUD operations for treatments if needed ...
