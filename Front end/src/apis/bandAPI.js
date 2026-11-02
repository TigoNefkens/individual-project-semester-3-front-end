import axios from "axios";
import BandModel from "../models/BandModel";
import userAPI from "./userAPI";

const BASE_URL = "http://localhost:8080";

const bandAPI = {

        getAllBands: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/bands`, {
                headers: { "Content-Type": "application/json" }
            });

            const bands = await Promise.all(
                
                response.data.map(async band => {

                    
                    const creator = await userAPI.GetUserById(band.creatorUserId);

                    return new BandModel(
                        band.bandId,
                        band.bandName,
                        creator,
                        band.bandConfig,
                        band.placeOfOperations,
                        band.genre,
                        band.description,
                        band.largedescription
                    );
                })
            );
            
            return bands;

        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data);
            } else {
                throw new Error("Something went wrong, please try again later.");
            }
        }
    },
    Createband: (bandData) =>
    axios.post(`${BASE_URL}/bands`, bandData, {
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        }
    })
    .then(response => response.data) 
    .catch(error => {
        if (error.response?.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error("Something went wrong, please try again later.");
        }
    }),

    GetOwnedBands: async (userId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/bands/owned`,
                { userId },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
                    }
                }
            );
            
            const bands = await Promise.all(
                response.data.map(async (band) => {
                    const creator = await userAPI.GetUserById(band.creatorUserId);
                    return new BandModel(
                        band.bandId,
                        band.bandName,
                        creator,
                        band.bandConfig,
                        band.placeOfOperations,
                        band.genre,
                        band.description,
                        band.largedescription
                    );
                })
            );
         
            return bands;
        } catch (error) {
            if (error.response?.data) {
                throw new Error(error.response.data);
            }
            throw new Error("Something went wrong, please try again later.");
        }
    },

    GetUserBands: async (userId) => {
    try {
            const response = await axios.post(
                `${BASE_URL}/bands/member-of`, 
                { userId },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
                    }
                }
            );


            const bands = await Promise.all(
                response.data.map(async (band) => {
                    
                    const creator = await userAPI.GetUserById(band.creatorUserId);
                    return new BandModel(
                        band.bandId,
                        band.bandName,
                        creator,
                        band.bandConfig,
                        band.placeOfOperations,
                        band.genre,
                        band.description,
                        band.largedescription
                    );
                })
            );

            return bands;

        } catch (error) {
            if (error.response?.data) {
                throw new Error(error.response.data);
            }
            throw new Error("Something went wrong, please try again later.");
        }
    },

   updateBand: async (updateDTO, token) => {
    try {
        console.log(updateDTO)
        const res = await axios.put(`${BASE_URL}`, updateDTO, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

       console.log(res.data)
        if (!res.data || !res.data.bandId) {
            throw new Error("Update failed: backend returned invalid data");
        }

        return res.data; // dit is het geüpdatete band object

    } catch (error) {
        if (error.response?.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error("Something went wrong, please try again later.");
        }
    }
}
};

export default bandAPI;
