import  axios  from "axios";

// create BaseURL for sign-up request

export const baseURL = axios.create({
    baseURL: "http://localhost:3000"
})

export const login = async (userData) => {
    const response = await baseURL.post("/user/login", userData, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
    return response;
};