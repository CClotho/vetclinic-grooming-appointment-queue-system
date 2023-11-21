import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

const baseURL = axios.create({
    baseURL: "http://localhost:3000"
})


export const getProfile =  async () => {

    const response = await baseURL.get("/client/profile");
        return response.data;
}
    
