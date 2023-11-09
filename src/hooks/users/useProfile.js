import  axios  from "axios";

// create BaseURL for sign-up request

const baseURL = axios.create({
    baseURL: "http://localhost:3000"
})


export const profile =  async () => {

    const response = await baseURL.get("/user/me/profile", {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
    
        return response;
}
    
