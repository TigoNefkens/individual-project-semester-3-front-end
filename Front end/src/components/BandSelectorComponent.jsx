import './BandSelectorComponent.css';
import React from 'react';
import bandImage1 from "../assets/Band-image1.jpg"
import bandImage2 from "../assets/Band-image2.jpg"
import bandImage3 from "../assets/Band-image3.jpg"
import bandImage4 from "../assets/Band-image4.jpg"
import bandImage5 from "../assets/Band-image5.jpg"
import bandImage6 from "../assets/Band-image6.jpg"
import bandImage7 from "../assets/Band-image7.png"
import AcousticOut from "../assets/acousticOut.png"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function BandSelectorComponent({ band }) {

    const navigate = useNavigate();
    const images = [bandImage1, bandImage2, bandImage3, bandImage4, bandImage5, bandImage6, bandImage7, AcousticOut];

    const selectedImage = images[Math.floor(Math.random() * images.length)];

    let borderColor = "#FFFFFF";
    let Color1 = "#575555ff";
    let Color2 = "#d1cdcdff";

    if (band.BandConfig) {
        try {
            const config = JSON.parse(band.BandConfig);
            borderColor = config.borderColor;
            Color1 = config.color1;
            Color2 = config.color2;
        } catch (err) {
            console.error("Invalid JSON in ProfileConfig for band:", band.BandName);
        }
    }

    const goToView = () => {
        navigate("/Profile/BandsImIn/MemberOfBand", { state: { band } });
    };

    return (
        <div onClick={() => goToView()} className="square-selector" onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} style={{  background: `linear-gradient(to bottom, ${Color1}, ${Color2})`, border: `10px solid ${borderColor}`, borderRadius: "16px",  }}>
            
            <div className='Bandname-selector'>{band.BandName}</div>
        </div>
    );
}

export default BandSelectorComponent;