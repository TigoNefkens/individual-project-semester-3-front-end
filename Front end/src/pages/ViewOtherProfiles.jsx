import "./ViewOtherProfiles.css";
import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import CustomHeader from "../components/Header.jsx"
import ProfileComponent from '../components/ProfileComponent.jsx';

function ViewOtherProfiles() {
    const { state } = useLocation();
    const user = state?.otherUserModel;

    useEffect(() => {
        
    }, [])
    return (
        <div className="app-background">
            <CustomHeader />
            <div className='other-profilepage-content'>
                <ProfileComponent userModel={user} />
            </div>
        </div>
    );
}

export default ViewOtherProfiles;
