import axios from "axios";
import ApplicationModel from "../models/ApplicationModel.js";
const BASE_URL = "http://localhost:8080";

const applicationAPI = {

    addApplication: (applicationData, token) => {
    return axios.post(`${BASE_URL}/applications`, applicationData, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.data);
    },

    acceptApplication: (applicationActionDTO, token) =>
    axios.post(`${BASE_URL}/applications/accept`, applicationActionDTO, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }),

    getApplicationsByBand: (bandId, token) => {
    return axios.post(
        `${BASE_URL}/applications/byBand?bandId=${bandId}`,
        null,
        {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        }
    )
    .then(response => response.data.map(app => new ApplicationModel(app)));
    },

    denyApplication: (applicationId, token) => 
    axios.delete(`${BASE_URL}/applications/${applicationId}`, {
        headers: { "Authorization": `Bearer ${token}` }
    }),
};

export default applicationAPI;