import axios from "axios";
import UserModel from "../models/UserModel";
const BASE_URL = "http://localhost:8080";

const userAPI = {

    registerUser: (userData) =>
    axios
      .post(`${BASE_URL}/users`, userData, { headers: { "Content-Type": "application/json" } })
      .then(response => response.data)
      .catch(error => {
        if (error.response && error.response.data) {
          throw new Error(error.response.data);
        } else {
          throw new Error("Something went wrong, please try again later.");
        }
      }),

    getBandMembers: (bandId) =>
    axios
      .post(`${BASE_URL}/users/band-members`, { bandId }, { headers: { "Content-Type": "application/json" } })
      .then(response => {
          return response.data.map(user => new UserModel(user));
      })
      .catch(error => {
          if (error.response && error.response.data) {
              throw new Error(error.response.data);
          } else {
              throw new Error("Something went wrong, please try again later.");
          }
      }),

    loginUser: (userData) =>
    axios
      .post(`${BASE_URL}/users/authentication`, userData, { headers: { "Content-Type": "application/json" } })
      .then(response => response.data)
      .catch(error => {
        if (error.response && error.response.data) {
          throw new Error(error.response.data);
        } else {
          throw new Error("Something went wrong, please try again later.");
        }
      }),

    GetUserById: async (userId) => {

      const response = await axios.get(`${BASE_URL}/users/details`, {
          params: { userId },
          headers: { "Content-Type": "application/json" }
      });

      return new UserModel(response.data);
    },

    updateProfile: (updateDTO, token) =>
      
      axios.put(
        `${BASE_URL}/users/profile`,
        updateDTO,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      )
      .then(res => res.data)
      .catch(error => {
        if (error.response && error.response.data) {
          throw new Error(error.response.data);
        } else {
          throw new Error("Something went wrong, please try again later.");
        }
    })

};

export default userAPI;
