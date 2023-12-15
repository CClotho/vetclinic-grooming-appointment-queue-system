import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;


export const fetchClientPet = async() => {

    const response = await axios.get('http://localhost:3000/client/pets');
    return response.data;
}

