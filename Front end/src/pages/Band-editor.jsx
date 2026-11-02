import './Profile.css';
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import CustomHeader from '../components/Header.jsx';
import ColourDropdown from '../components/ColourDropdown.jsx';
import MemberComponent from '../components/MemberComponent.jsx';
import Modal from '../components/Modal.jsx';
import bandAPI from '../apis/bandAPI.js';
import userAPI from '../apis/userAPI.js';

export default function BandEditor() {
    const navigate = useNavigate();
    const location = useLocation();
    const band = location.state?.band;
    
    const [members, setMembers] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [responseData, setResponseData] = useState("");

   
    const [color1, setColor1] = useState("grey");
    const [color2, setColor2] = useState("grey");
    const [borderColor, setBorderColor] = useState("#F0F0F0");

    
    const [refreshColor1, setRefreshColor1] = useState("grey");
    const [refreshColor2, setRefreshColor2] = useState("grey");
    const [refreshBorderColor, setRefreshBorderColor] = useState("#F0F0F0");

  
    const [description, setDescription] = useState("");
    const [placeOfOperations, setPlaceOfOperations] = useState("");
    const [genre, setGenre] = useState("");

    const [originalData, setOriginalData] = useState(null);

    
    const mainColors = [
        "#FF0000", "#8B0000", "#FF7F00", "#FFB300", "#FFFF00",
        "#ADFF2F", "#00FF00", "#32CD32", "#00FA9A",
        "#00CED1", "#1E90FF", "#0000FF", "#4B0082",
        "#8B00FF", "#FF69B4", "#FF1493", "grey"
    ];
    const borderColors = [...mainColors, "#F0F0F0", "#000000"];

   
    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        const userId = localStorage.getItem("userID");

    
        if (!token || !userId || !band?.Id) {
            navigate("/Login");
            return;
        }

    if (!band?.Id) return;

        userAPI.getBandMembers(band.Id)
        .then(data => setMembers(data))
        .catch(err => console.error(err));
        
    }, [band?.Id]);

    const closeSuccessModalAction = async () => {
        setShowSuccessModal(false)
        
    }

    const closeModal = () => {setShowModal(false)
        goBack();
    };

 
    useEffect(() => {

        const token = localStorage.getItem("jwtToken");
        const userId = localStorage.getItem("userID");

        if (!token || !userId) {
            setResponseData("Please login to access this page.");
            setShowModal(true);
            return;
        }
        if (!band) return;

        setDescription(band.Largedescription || "");
        setPlaceOfOperations(band.PlaceOfOperations || "");
        setGenre(band.Genre || "");

        let parsedConfig = { color1: "grey", color2: "grey", borderColor: "#F0F0F0" };
        if (band.BandConfig) {
            try {
                parsedConfig = JSON.parse(band.BandConfig);
            } catch {}
        }

        setColor1(parsedConfig.color1);
        setColor2(parsedConfig.color2);
        setBorderColor(parsedConfig.borderColor);

        
        setRefreshColor1(parsedConfig.color1);
        setRefreshColor2(parsedConfig.color2);
        setRefreshBorderColor(parsedConfig.borderColor);

        setOriginalData({
            description: band.Largedescription || "",
            placeOfOperations: band.PlaceOfOperations || "",
            genre: band.Genre || "",
            ...parsedConfig
        });
    }, [band]);

    
    const hasChanges = originalData && (
        description !== originalData.description ||
        placeOfOperations !== originalData.placeOfOperations ||
        genre !== originalData.genre ||
        color1 !== originalData.color1 ||
        color2 !== originalData.color2 ||
        borderColor !== originalData.borderColor
    );

  
    const handleSaveChanges = async () => {
    if (!hasChanges) return;

    const token = localStorage.getItem("jwtToken");
    if (!token) {
        setResponseData("You are not logged in!");
        setShowModal(true);
        return;
    }

    const payload = {
        bandId: band.Id,
        largedescription: description,
        placeOfOperations: placeOfOperations,
        genre: genre,
        bandConfig: JSON.stringify({ color1, color2, borderColor })
    };

    try {
        const updatedBand = await bandAPI.updateBand(payload, token);

        if (!updatedBand || !updatedBand.bandId) {
            setResponseData("Update failed: no data returned from backend");
            setShowModal(true);
            return;
        }

        
        setResponseData("Band updated successfully!");
        setShowSuccessModal(true);

        setRefreshColor1(color1);
        setRefreshColor2(color2);
        setRefreshBorderColor(borderColor);
        band.Largedescription = updatedBand.largedescription || description;
        band.PlaceOfOperations = updatedBand.placeOfOperations || placeOfOperations;
        band.Genre = updatedBand.genre || genre;
        band.BandConfig = updatedBand.bandConfig || JSON.stringify({ color1, color2, borderColor });

        setOriginalData({
            description,
            placeOfOperations,
            genre,
            color1,
            color2,
            borderColor
        });

    } catch (err) {
        console.error(err);
        setResponseData(err.message || "Failed to update band.");
        setShowModal(true);
    }
};
    const goBack = () => navigate("/Profile/ownedBands");

    const goToApplications = () => {
        navigate("/Profile/ownedBands/bandEditor/viewApplications", { 
            
            state: { BandId: band.Id, band: band }
        });
    };

    function hexToRgba(hex, alpha) {
        const bigint = parseInt(hex.replace("#", ""), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    if (!band) {
        return (
            <div className="app-background">
                <CustomHeader />
                <p>Band niet gevonden.</p>
            </div>
        );
    }

    return (
        <div className="app-background">
            <CustomHeader />

           
            <Modal open={showModal} onClose={() => navigate("/Login")}>
                <p style={{ color: "red" }}>{responseData}</p>
                <button className="ConfirmPopup" onClick={() => navigate("/Login")}>Confirm</button>
            </Modal>

            
            <Modal open={showSuccessModal} onClose={() => closeSuccessModalAction()}>
                <p style={{ color: "green" }}>{responseData}</p>
                <button className="ConfirmPopup" onClick={() => closeSuccessModalAction()}>Confirm</button>
            </Modal>

            <div className='profilepage-content'>

           
                <div className="Edit-section">
                    <div className='customization-colors'>
                        <div className='color-option'>
                            <h3>Color 1:</h3>
                            <ColourDropdown
                                selectedColour={color1}
                                setColour={(val) => { setColor1(val); setRefreshColor1(val); }}
                                colors={mainColors}
                            />
                        </div>
                        <div className='color-option'>
                            <h3>Color 2:</h3>
                            <ColourDropdown
                                selectedColour={color2}
                                setColour={(val) => { setColor2(val); setRefreshColor2(val); }}
                                colors={mainColors}
                            />
                        </div>
                        <div className='color-option'>
                            <h3>Border Color:</h3>
                            <ColourDropdown
                                selectedColour={borderColor}
                                setColour={(val) => { setBorderColor(val); setRefreshBorderColor(val); }}
                                colors={borderColors}
                            />
                        </div>
                    </div>

                    <div className='Other-edits'>
                        <div className='Description-edit'>
                            <h4>Edit band description:</h4>
                            <input
                                maxLength={240}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                type='text'
                                style={{ width: "50%", height: "40%", fontSize: "small" }}
                            />
                        </div>

                        <div className='PlaceOfResidence-edit'>
                            <h4>Edit place of operations:</h4>
                            <input
                                maxLength={30}
                                value={placeOfOperations}
                                onChange={e => setPlaceOfOperations(e.target.value)}
                                type='text'
                                style={{ width: "50%", height: "40%", fontSize: "small" }}
                            />
                        </div>

                        <div className='Experience-edit'>
                            <h4>Edit genre:</h4>
                            <input
                                maxLength={30}
                                value={genre}
                                onChange={e => setGenre(e.target.value)}
                                type='text'
                                style={{ width: "50%", height: "40%", fontSize: "small" }}
                            />
                        </div>

                        <button
                            disabled={!hasChanges}
                            onClick={handleSaveChanges}
                            className='ProfileButtons' style={{marginTop:"1%"}}
                        >
                            Save changes
                        </button>
                        <button onClick={() => {goBack()}} style={{marginTop:"2%", width:"24.5%"}} className='ProfileButtons'>Go back</button>
                        <button onClick={() => {goToApplications()}} style={{marginTop:"2%", width:"40%", boxShadow:"0 0 10px 2px rgba(0, 255, 98, 0.88)"}} className='ProfileButtons'>View Band-applications</button>
                    </div>
                </div>

                {/* Hier begint de Deep-band */}
                <div className="Viewband-container-edit" style={{
                    background: `linear-gradient(to bottom, ${refreshColor1}, ${refreshColor2})`,
                    border: `10px solid ${refreshBorderColor}`
                }}>
                    <div className="Top-section-edit">
                        <h1 style={{ color: "white" }}>{band.BandName}</h1>
                        <div className="largeDescription">{description}</div>
                    </div>

                    <div className="Middle-section-edit">
                        <div className="general-info">
                            <h4>Place of operations: <div style={{ fontWeight: "normal" }}>{placeOfOperations}</div></h4>
                            <h4>Genre: <div style={{ fontWeight: "normal" }}>{genre}</div></h4>
                            <h4>Meet the members:</h4>
                        </div>
                    </div>

                    <div className="member-section-edit" style={{ border: `10px solid ${refreshBorderColor}`, borderRadius: "10px" }}>
                        <MemberComponent  member={band.Creator} isCreator={true} />
                        {members.map(member => (
                            <MemberComponent key={member.userId || member.id} member={member} isCreator={false} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
