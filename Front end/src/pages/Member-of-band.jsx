import "./Member-of-band.css";
import CustomHeader from "../components/Header.jsx";
import { useLocation } from "react-router-dom";
import { useState, useEffect} from "react";
import userAPI from "../apis/userAPI.js";
import { useNavigate } from "react-router-dom";
import MemberComponent from "../components/MemberComponent.jsx";


export default function MemberofBand() {
    const { state } = useLocation();
    const [members, setMembers] = useState([]);
    const band = state?.band;

    const navigate = useNavigate();

    const goBack = () => {
        navigate("/Profile/BandsImIn");
    };

    if (!band) {
        return (
            <div className="app-background">
                <CustomHeader />
                <p>Band niet gevonden.</p>
            </div>
        );
    }

    function hexToRgba(hex, alpha) {
        const bigint = parseInt(hex.replace("#", ""), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }


    useEffect(() => {
    if (!band?.Id) return;

        userAPI.getBandMembers(band.Id)
        .then(data => setMembers(data))
        .catch(err => console.error(err));
        
    }, [band.Id]);

    let borderColor = "#FFFFFF";
    let Color1 = "#575555ff";
    let Color2 = "#d1cdcdff";

    if (
        typeof band.BandConfig === "string" &&
        band.BandConfig.trim().startsWith("{")
    ) {
        try {
            const config = JSON.parse(band.BandConfig);
            borderColor = config.borderColor ?? borderColor;
            Color1 = config.color1 ?? Color1;
            Color2 = config.color2 ?? Color2;
        } catch {
            
        }
    }
    return (
        <div className="app-background" style={{flexDirection:"row"}}>
            <CustomHeader />
            <button className="Return-button" onClick={() => {goBack()}} style={{marginLeft:"-11%",marginRight:"20px", marginBottom:"25%"}}>Go Back</button>
            <div className="Viewband-container" style={{ background: `linear-gradient(to bottom, ${Color1}, ${Color2})`, border: `10px solid ${borderColor}` }}>
                <div className="Top-section">
                    <h1 style={{ color: "white" }}>{band.BandName}</h1>
                    <div className="largeDescription">{band.Largedescription}</div>
                </div>
                <div className="Middle-section">
                    <div className="general-info">

                        <h4>Place of operations: <div style={{fontWeight:"normal"}}>{band.PlaceOfOperations}</div></h4>
                        <h4>Genre: <div style={{fontWeight:"normal"}}>{band.Genre}</div></h4>
                        <h4>Meet the members:</h4>
                    </div>
                   
                </div>
                <div className="member-section" style={{border: `10px solid ${borderColor}`, borderRadius:"10px"}}>
                    
                    <MemberComponent member={band.Creator} isCreator={true}></MemberComponent>
                    {members.map(member => (
                        <MemberComponent key={member.userId} member={member} isCreator={false} />
                    ))}
                    
                </div>
               
            </div>
        </div>
    );
}
