import  axios  from "axios";

// create BaseURL for sign-up request

const baseURL = axios.create({
    baseURL: "http://localhost:3000"
})


export const signup =  async (userData) => {

    const response = await baseURL.post("/user/sign-up", userData);
    return response;

}


