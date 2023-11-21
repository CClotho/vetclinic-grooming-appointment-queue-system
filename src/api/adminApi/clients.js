import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
// POST create pet


// for form in creating an appointment
export const fetchClientsInfo = async () => {
    const response = await axios.get('http://localhost:3000/admin/clients/summary');
    return response.data;
  }
  

  
// get clients id
export const getClientIds= async (clientId) => {
    const response = await axios.get(`http://localhost:3000/admin/clients/profile/${clientId}`);
    return response.data;
  }
  