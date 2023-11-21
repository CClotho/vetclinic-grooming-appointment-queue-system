import  axios  from "axios";

// create BaseURL for sign-up request

const baseURL = axios.create({
    baseURL: "http://localhost:3000"
})


export const signup =  async (userData) => {

  try {
    const response = await baseURL.post("/user/sign-up", userData);
    return response;
  }
  catch(err) {
    console.log("Error adding new client:", err)
  }

}


