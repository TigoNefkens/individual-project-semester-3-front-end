import './Create-bands.css';
import CustomHeader from "../components/Header.jsx";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Modal from '../components/Modal.jsx';
import bandAPI from '../apis/bandAPI.js';

function CreateBands() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [responseData, setResponseData] = useState("ERROR: No info available");
    const [createSuccess, setCreateSuccess] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    const [bandName, setBandName] = useState("");
    const [placeOfOperations, setPlaceOfOperations] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");

    
    useEffect(() => {
        const checkAccess = async () => {
            const token = localStorage.getItem("jwtToken");
            if (!token) {
                setResponseData("To access this page, please login");
                setShowModal(true);
                return;
            }

            try {
                const response = await fetch("http://localhost:8080/bands/permissions", {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}` },
                });

                if (response.ok) {
                    setIsAuthorized(true);
                } else {
                    setResponseData("To access this page, please login");
                    setShowModal(true);
                }
            } catch (error) {
                setResponseData("To access this page, please login");
                setShowModal(true);
            }
        };

        checkAccess();
    }, []);

    const closeModal = () => {
        setShowModal(false);
        if (createSuccess) navigate("/");
        if (!isAuthorized) navigate("/login"); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createBand();
    };

    const createBand = async () => {
        const userId = Number(localStorage.getItem("userID"));
        const bandData = {
            bandName,
            creatorUserId: userId,
            placeOfOperations,
            genre,
            description
        };

        try {
            const responseMessage = await bandAPI.Createband(bandData);
            setResponseData(responseMessage); 
            setCreateSuccess(true);
            setShowModal(true);
        } catch (error) {
            setResponseData(error.message); 
            setShowModal(true);
        }
    };

    return (
        <div className="app-background">
            <CustomHeader />

            <Modal open={showModal} onClose={closeModal}>
                <p style={{ color: createSuccess ? "green" : "red" }}>{responseData}</p>
                <button className="ConfirmPopup" onClick={closeModal}>Confirm</button>
            </Modal>

            {isAuthorized && (
                <div className="create-band-container">
                    <h2>Create a Band!</h2>
                    <form onSubmit={handleSubmit} className="band-form">

                        <div className="form-group">
                            <label htmlFor="bandName">Band Name:</label>
                            <input
                                type="text"
                                id="bandName"
                                name="bandName"
                                placeholder="Enter your band’s name"
                                value={bandName}
                                onChange={e => setBandName(e.target.value)}
                                required
                                maxLength={20}
                                style={{width:"50%"}}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="placeOfOperations">Based in: </label>
                            <input
                                type="text"
                                id="placeOfOperations"
                                name="placeOfOperations"
                                placeholder="e.g. Amsterdam, NL"
                                value={placeOfOperations}
                                onChange={e => setPlaceOfOperations(e.target.value)}
                                required
                                maxLength={15}
                                style={{width:"50%"}}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="genre">Genre:</label>
                            <input
                                type="text"
                                id="genre"
                                name="genre"
                                placeholder="e.g. Rock, Jazz, Pop"
                                value={genre}
                                onChange={e => setGenre(e.target.value)}
                                required
                                style={{width:"50%"}}
                                maxLength={15}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Short Description:</label>
                            <input
                                id="description"
                                type='text'
                                name="description"
                                placeholder="Tell us about your band..."
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                                maxLength={46}
                                style={{width:"50%"}}
                            />
                        </div>

                        <button type="submit" id="confirmbtrband">Create Band</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default CreateBands;
