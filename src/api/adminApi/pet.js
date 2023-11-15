import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'; //changed this to multipart b4 was application/json due to uploading photo
axios.defaults.withCredentials = true;
// POST create pet

export const createPet = async (data) => {
  const response = await axios.post('http://localhost:3000/admin/pet/create', data);
  return response.data;
};

export const fetchPet = async (id) => {
    const response = await axios.get(`/api/pet/${id}`);
    return response.data;
};
  
export const editPet = async (id, data) => {
    const response = await axios.put(`/api/pet/${id}`, data);
    return response.data;
};

export const deletePet = async (id) => {
    const response = await axios.delete(`/api/pet/${id}`);
    return response.data;
};