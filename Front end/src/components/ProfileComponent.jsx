import { useEffect, useState } from 'react';
import './ProfileComponent.css';
import Crown from "../assets/crown.png";
import userAPI from "../apis/userAPI.js";
import Number1 from "../assets/number-1.png";
import Number2 from "../assets/number-2.png";
import Number3 from "../assets/number-3.png";
import Number4 from "../assets/number-4.png";
import Number5 from "../assets/number-5.png";
import Number6 from "../assets/number-6.png";
import Number7 from "../assets/number-7.png";
import Number8 from "../assets/number-8.png";
import Number9 from "../assets/number-9.png";
import Number10 from "../assets/number-10.png";

function ProfileComponent({ userModel, RefreshColor1, RefreshColor2, RefreshBorderColor }) {
    const [config, setConfig] = useState({});
    

    useEffect(() => {
        if (userModel) {
            let userConfig = {};

            if (typeof userModel.profileConfig === "string" && userModel.profileConfig.trim().startsWith("{")) {
                try {
                    userConfig = JSON.parse(userModel.profileConfig);
                } catch (err) {
                    console.error("Invalid profileConfig JSON:", err);
                }
            }
            
            setConfig(userConfig);
        }
    }, [userModel]);


    const borderColor = RefreshBorderColor || config.borderColor || "white";
    const Color1 = RefreshColor1 || config.color1 || "grey";
    const Color2 = RefreshColor2 || config.color2 || "grey";

    let experienceImage;

    if (userModel?.experience === 1) {
        experienceImage = Number1;
    } else if (userModel?.experience === 2) {
        experienceImage = Number2;
    } else if (userModel?.experience === 3) {
        experienceImage = Number3;
    } else if (userModel?.experience === 4) {
        experienceImage = Number4;
    } else if (userModel?.experience === 5) {
        experienceImage = Number5;
    } else if (userModel?.experience === 6) {
        experienceImage = Number6;
    } else if (userModel?.experience === 7) {
        experienceImage = Number7;
    } else if (userModel?.experience === 8) {
        experienceImage = Number8;
    } else if (userModel?.experience === 9) {
        experienceImage = Number9;
    } else if (userModel?.experience === 10) {
        experienceImage = Number10;
    }

    return (
        <>
            <div className="profile-square-section" style={{background: `linear-gradient(to bottom, ${Color1}, ${Color2})`,border: `10px solid ${borderColor}`}}>
                <h1 className='profile-username' style={{margin:"2%"}}>{userModel?.username}</h1>
                <div className='profile-inner-container'>
                    <div className='left-container'>
                        <h2>General Info: </h2>
                        <div className='info-container'>
                            <h3>&nbsp; &nbsp; Nationality:&nbsp; {userModel?.nationality}</h3>
                            <h3>&nbsp; &nbsp; Place of residence:&nbsp; {userModel?.placeOfResidence}</h3>
                            <h3>&nbsp; &nbsp; Experience level:&nbsp; <img style={{width:"10%", height:"110%", marginBottom:"-3%"}} src={experienceImage}/></h3>
                        </div>
                    </div>
                    {/* division */}
                    <div className='right-container'>
                        <h2>About me: </h2>
                        <div className='aboutme-container' style={{background: `linear-gradient(to bottom, ${Color1}, ${Color2})`,border: `10px solid ${borderColor}`}}>
                            <div id='aboutme-content'>{userModel?.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ProfileComponent;
