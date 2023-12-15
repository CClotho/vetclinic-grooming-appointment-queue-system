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


export const deleteTreatment = async (id) => {
  try {
    const response = await axios.post(`http://localhost:3000/admin/service/delete/treatment`, {id});
    return response.data;
  } catch (error) {
    console.error(error);
  }
};