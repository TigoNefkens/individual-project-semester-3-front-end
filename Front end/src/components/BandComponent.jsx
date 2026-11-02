import './BandComponent.css';
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

function BandComponent({ band }) {

    const navigate = useNavigate();

    const colors = [
        "#84E291", "#2ECC71", "#F5A623", "#F39C12", "#F1C40F", "#D35400",
        "#50E3C2", "#1ABC9C", "#FF6B6B", "#E74C3C", "#FFB6C1", "#C0392B",
        "#9B59B6", "#8E44AD", "#DA70D6", "#3498DB", "#2980B9", "#B0E0E6",
        "#39FF14", "#FF00FF", "#00FFFF", "#FFFFFF", "#F0F0F0", "#000000", "#1C1C1C"
    ];
    const lightColors = ["#FFFFFF", "#F0F0F0", "#FFB6C1", "#B0E0E6", "#DA70D6", "#F5A623", "#84E291", "#50E3C2"];

    const goToView = () => {
        navigate("/Find-bands/view", { state: { band } });
    };

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
    
    function hexToRgba(hex, alpha) {
        const bigint = parseInt(hex.replace("#", ""), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    return (
        <>
            <div 
                className="square"
                style={{ 
                    background: `linear-gradient(to bottom, ${Color1}, ${Color2})`,
                    border: `10px solid ${borderColor}` 
                }}
            >
                <div className='inner-container'>
                    <div className='Bandname'>{band.BandName}</div>
                    <div className='Band-content'>
                        <div className='image-container'>
                            <img 
                                src={selectedImage} 
                                id='band-image' 
                                style={{border: `10px solid ${borderColor}`}}
                            />
                        </div>
                        <div className='itemDivider'></div>
                        <div className='transparant-section'>
                            <div id='genre-title' style={{color: borderColor}}>
                                Genre:   {band.Genre}
                            </div>
                            <div className='Bio'>
                                {band.Description}
                            </div>
                            <div id='button-section'>
                                <button onClick={() => goToView()} className='BandButtons' style={{ boxShadow: `0 4px 30px ${hexToRgba(Color2, 0.6)}` }}>View Band</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{height:"10%", width:"100%", marginTop:"4%"}}></div>
        </>
 
    );
}

export default BandComponent;