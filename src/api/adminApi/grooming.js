import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;


export const createGrooming = async (data) => {
    const response = await axios.post('http://localhost:3000/admin/service/create/grooming', data);
    return response.data;
  };
  


export const editGrooming = async ( updatedData) => {
   try {
    const response = await axios.put(`http://localhost:3000/admin/service/edit/grooming`, updatedData);
    return response.data;
   }catch(err) {
    console.log("Error in editing grooming service:", err);
   }
};

export const deleteGrooming = async (id) => {
  try {
    const response = await axios.post(`http://localhost:3000/admin/service/delete/grooming`, {id});
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

