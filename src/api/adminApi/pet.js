import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'; //changed this to multipart b4 was application/json due to uploading photo
axios.defaults.headers.post['Content-Type'] = 'application/json';
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
  
export const editPet = async (petData) => {
    try {
      const response = await axios.put(`http://localhost:3000/admin/pets/pet/edit`, petData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
export const deletePet = async (id) => {
    try {
      const response = await axios.post(`http://localhost:3000/admin/pets/pet/delete`, {id});
      return response.data;
    } catch (error) {
      console.error(error);
    }
};