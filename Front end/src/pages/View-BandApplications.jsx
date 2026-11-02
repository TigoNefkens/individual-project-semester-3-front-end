import "./View-BandApplications.css";
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import CustomHeader from "../components/Header.jsx";
import ApplicationComponent from "../components/ApplicationComponent.jsx";
import applicationAPI from "../apis/applicationAPI.js";

function ViewBandApplications() {
    const location = useLocation();
    const token = localStorage.getItem("jwtToken");
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const bandId = location.state?.BandId;
    const band = location.state?.band;
    const [responseData, setResponseData] = useState("");
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const goBack = () => {
    navigate("/Profile/ownedBands/bandEditor", {
        state: { band }
    });
    };

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        const userId = localStorage.getItem("userID");

    
        if (!token || !userId || !band?.Id) {
            navigate("/Login");
            return;
        }
        
        applicationAPI.getApplicationsByBand(bandId, token)
            .then(data => setApplications(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [bandId, token]);

    return (
        <div className="app-background">
            <CustomHeader />
            <button className="Return-button-application" onClick={goBack} style={{ }}>
                Go Back
            </button>
            <div className='Applications-content'>
                <div className="scroll-page-applications">
                    {applications.map(app => (
                        <ApplicationComponent key={app.Id} application={app} />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default ViewBandApplications;
