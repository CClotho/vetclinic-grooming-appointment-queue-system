import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;


export const fetchTreatments = async () => {
    const response = await axios.get('http://localhost:3000/service/treatments')
    
    return response.data
  };
  