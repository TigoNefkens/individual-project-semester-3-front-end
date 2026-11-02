import { useState, useEffect } from 'react';
import './Band-selector-owner.css';
import CustomHeader from '../components/Header.jsx';
import bandAPI from '../apis/bandAPI.js';
import { useNavigate } from 'react-router-dom';
import BandSelectorOwnerComponent from "../components/BandSelectorOwnerComponent.jsx";
import Modal from '../components/Modal.jsx';

function BandSelectorOwner() {
    const navigate = useNavigate();
    const [bands, setBands] = useState(null);
    const [responseData, setResponseData] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        const userId = localStorage.getItem("userID");

        if (!token || !userId) {
            setResponseData("Please login to access this page.");
            setShowModal(true);  
        }

        bandAPI.GetOwnedBands(userId)
            .then(data => setBands(data))
            .catch(err => {
                console.error(err);
                setBands([]);
            });
    }, []);

        const goBack = () => navigate("/Profile");
        const goBackToLogin = () => navigate("/Login");

        const closeModal = () => {setShowModal(false)
        goBackToLogin();
    };

    return (
        <div className="app-background-bands">
            <Modal open={showModal} onClose={closeModal}>
                <p style={{ color: "red" }}>{responseData}</p>
                <button className="ConfirmPopup" onClick={closeModal}>Confirm</button>
            </Modal>
            <CustomHeader />
            <div className='page-content'>
                <button
                    className="Return-button"
                    onClick={goBack}
                    style={{ marginLeft:"-11%", marginRight:"20px", marginBottom:"25%" }}
                >
                    Go Back
                </button>
                <div className="scroll-page">
                    
                    {bands && bands.map(band => (
                        <BandSelectorOwnerComponent key={band.Id} band={band} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BandSelectorOwner;
