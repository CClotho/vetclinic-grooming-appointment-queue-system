import  axios  from "axios";

// create BaseURL for sign-up request

const baseURL = axios.create({
    baseURL: "http://localhost:3000"
})

export const logout =  async () => {

   
const response = await baseURL.post("/user/logout", {}, {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

    return response;
}

