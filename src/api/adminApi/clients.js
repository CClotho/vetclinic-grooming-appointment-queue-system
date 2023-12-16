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
  
  // edit client's information by id
export const editClientInformation= async (clientData) => {
    const response = await axios.put(`http://localhost:3000/admin/clients/client/edit`, clientData);
    return response.data;
}

export const resetClientPassword= async (clientData) => {
  const response = await axios.put(`http://localhost:3000/admin/clients/client/reset-password`, clientData);
  return response.data;
}

  