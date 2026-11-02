import './Profile.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Arrow from "../assets/arrow-right.png"
import Modal from '../components/Modal.jsx';
import CustomHeader from '../components/Header.jsx';
import ProfileComponent from '../components/ProfileComponent.jsx';
import userAPI from '../apis/userAPI.js';
import ColourDropdown from '../components/ColourDropdown.jsx';

function ProfilePage() {
    const navigate = useNavigate();

    const goToViewBandsImIn = () => {
        navigate("/Profile/BandsImIn");
    };

        const goToViewOwnedBands = () => {
        navigate("/Profile/ownedBands");
    };

    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [responseData, setResponseData] = useState("");
    const [user, setUser] = useState(null);
    const [color1, setColor1] = useState("grey");
    const [color2, setColor2] = useState("grey");
    const [borderColor, setBorderColor] = useState("#F0F0F0");
    const [description, setDescription] = useState("");
    const [placeOfResidence, setPlaceOfResidence] = useState("");
    const [experience, setExperience] = useState(1);

    const navigateToLogin = useNavigate();

    const goBack = () => {
        navigate("/Login");
    };

    const [originalData, setOriginalData] = useState(null);

    const mainColors = [
        "#FF0000", "#8B0000", "#FF7F00", "#FFB300", "#FFFF00",
        "#ADFF2F", "#00FF00", "#32CD32", "#00FA9A",
        "#00CED1", "#1E90FF", "#0000FF", "#4B0082",
        "#8B00FF", "#FF69B4", "#FF1493", "grey"
    ];

    const borderColors = [
        ...mainColors,
        "#F0F0F0",
        "#000000"
    ];

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        const userId = localStorage.getItem("userID");

        if (!token || !userId) {
            setResponseData("Please login to access this page.");
            setShowModal(true);
            return;
        }

        userAPI.GetUserById(userId)
            .then(fetchedUser => {
                setUser(fetchedUser);

                setDescription(fetchedUser.description || "");
                setPlaceOfResidence(fetchedUser.placeOfResidence || "");
                setExperience(fetchedUser.experience || 1);

                let parsedConfig = { color1: "grey", color2: "grey", borderColor: "#F0F0F0" };
                if (fetchedUser.profileConfig && fetchedUser.profileConfig !== "Default") {
                    try {
                        parsedConfig = typeof fetchedUser.profileConfig === "string"
                            ? JSON.parse(fetchedUser.profileConfig)
                            : fetchedUser.profileConfig;
                    } catch {}
                }

                setColor1(parsedConfig.color1);
                setColor2(parsedConfig.color2);
                setBorderColor(parsedConfig.borderColor);

                setOriginalData({
                    description: fetchedUser.description || "",
                    placeOfResidence: fetchedUser.placeOfResidence || "",
                    experience: fetchedUser.experience || 1,
                    color1: parsedConfig.color1,
                    color2: parsedConfig.color2,
                    borderColor: parsedConfig.borderColor
                });
            })
            .catch(() => {
                setResponseData("Failed to load user profile.");
                setShowModal(true);
            });
    }, []);

    const closeSuccessModalAction = async () => {
        setShowSuccessModal(false)
        window.location.reload(); 
    }

    const closeModal = () => {setShowModal(false)
        goBack();
    };
    
    const closeSuccessModal = () => closeSuccessModalAction();

    const hasChanges = originalData && (
        color1 !== originalData.color1 ||
        color2 !== originalData.color2 ||
        borderColor !== originalData.borderColor ||
        description !== originalData.description ||
        placeOfResidence !== originalData.placeOfResidence ||
        experience !== originalData.experience
    );

    const handleSaveChanges = async () => {
        if (!hasChanges) return;

        const token = localStorage.getItem("jwtToken");
        const profileConfigString = JSON.stringify({ color1, color2, borderColor });

        const updatePayload = {
            description: description || undefined,
            placeOfResidence: placeOfResidence || undefined,
            experience: experience || undefined,
            profileConfig: profileConfigString
        };

        try {
            await userAPI.updateProfile(updatePayload, token);
            setResponseData("Profile updated successfully!");
            setShowSuccessModal(true);
        } catch (error) {
            setResponseData(error?.message ?? "Something went wrong");
            setShowModal(true);
        }
    };


    return (
        <div className="app-background">
            <CustomHeader />

            <Modal open={showModal} onClose={closeModal}>
                <p style={{ color: "red" }}>{responseData}</p>
                <button className="ConfirmPopup" onClick={closeModal}>Confirm</button>
            </Modal>

            <Modal open={showSuccessModal} onClose={closeSuccessModal}>
                <p style={{ color: "green" }}>{responseData}</p>
                <button className="ConfirmPopup" onClick={closeSuccessModal}>Confirm</button>
            </Modal>

            <div className='profilepage-content'>
                <div className="Edit-section">
                    <div className='customization-colors'>
                        <div className='color-option'>
                            <h3>Color 1:</h3>
                            <ColourDropdown selectedColour={color1} setColour={setColor1} colors={mainColors} />
                        </div>
                        <div className='color-option'>
                            <h3>Color 2:</h3>
                            <ColourDropdown selectedColour={color2} setColour={setColor2} colors={mainColors} />
                        </div>
                        <div className='color-option'>
                            <h3>Border Color:</h3>
                            <ColourDropdown selectedColour={borderColor} setColour={setBorderColor} colors={borderColors} />
                        </div>
                    </div>

                    <div className='Other-edits'>
                        <div className='Description-edit'>
                            <h4>Edit About me:</h4>
                            <input maxLength={240} value={description} onChange={e => setDescription(e.target.value)} type='text' style={{width:"50%", height:"40%", fontSize:"small"}} />
                        </div>
                        <div className='PlaceOfResidence-edit'>
                            <h4>Edit Place of residence:</h4>
                            <input maxLength={15} value={placeOfResidence} onChange={e => setPlaceOfResidence(e.target.value)} type='text' style={{width:"50%", height:"40%", fontSize:"small"}} />
                        </div>
                        <div className='Experience-edit'>
                            <h4>Edit Experience Level:</h4>
                            <div className="experience-input">
                                <button
                                    className='experience-buttons'
                                    onClick={() => setExperience(x => Math.max(1, x - 1))}
                                >
                                    −
                                </button>

                                <input
                                    className='experience-value'
                                    type="number"
                                    value={experience}
                                    readOnly
                                    style={{ outline: "none" }}
                                />

                                <button
                                    className='experience-buttons'
                                    onClick={() => setExperience(x => Math.min(10, x + 1))} // max 10
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <button  onClick={handleSaveChanges} className='ProfileButtons'>
                            Save changes
                        </button>
                    </div>
                    <div className='profile-options'>
                        <button onClick={() => goToViewBandsImIn()} style={{ marginTop: "5%", width:"100%", boxShadow:"0 0 10px 2px rgba(0, 247, 255, 0.88)" }} className='ProfileButtons'>
                            View bands you're in &nbsp; <img src={Arrow} style={{width:"15%", height:"70%"}}></img>
                        </button>
                        <div className='division'></div>
                        <button onClick={() => goToViewOwnedBands()} style={{ marginTop: "5%", width:"100%", boxShadow:"0 0 10px 2px rgba(0, 255, 98, 0.88)" }} className='ProfileButtons'>
                            View bands you own &nbsp; <img src={Arrow} style={{width:"15%", height:"70%"}}></img>
                        </button>
                    </div>
                </div>

                <ProfileComponent
                    userModel={user}
                    RefreshColor1={color1}
                    RefreshColor2={color2}
                    RefreshBorderColor={borderColor}
                />
            </div>
        </div>
    );
}

export default ProfilePage;
