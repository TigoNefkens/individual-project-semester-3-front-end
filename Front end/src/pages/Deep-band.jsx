import "./Deep-band.css";
import CustomHeader from "../components/Header.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import userAPI from "../apis/userAPI.js";
import applicationAPI from "../apis/applicationAPI.js";
import MemberComponent from "../components/MemberComponent.jsx";

export default function DeepBand() {
    const { state } = useLocation();
    const [members, setMembers] = useState([]);
    const [loadingApply, setLoadingApply] = useState(false);
    const [applyMessage, setApplyMessage] = useState("Write your application now!");
    const [applicationContent, setApplicationContent] = useState("");
    const band = state?.band;
    const navigate = useNavigate();

    const goBack = () => {
        navigate("/Find-bands");
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
    if (typeof band.BandConfig === "string" && band.BandConfig.trim().startsWith("{")) {
        try {
            const config = JSON.parse(band.BandConfig);
            borderColor = config.borderColor ?? borderColor;
            Color1 = config.color1 ?? Color1;
            Color2 = config.color2 ?? Color2;
        } catch {}
    }

    const handleApply = async () => {
    const token = localStorage.getItem("jwtToken"); 
    const userId = Number(localStorage.getItem("userID"));

    if (!token || !userId) {
        setApplyMessage("You must be logged in to apply.");
        return;
    }

    if (!applicationContent.trim()) {
        setApplyMessage("Please write a message before applying.");
        return;
    }

    setLoadingApply(true);
    setApplyMessage("");

    try {
        const applicationModel = {
            bandId: band.Id,
            applicantUserId: userId,
            content: applicationContent
        };

        const response = await applicationAPI.addApplication(applicationModel, token);

        const friendlyMessages = {
            "ILLEGAL_ARGUMENT": "You are the owner of this band.",
            "CONFLICT": "You already applied to this band.",
            "NOT_FOUND": "Band not found.",
            "SERVER_ERROR": "Something went wrong. Please try again later."
        };

        setApplyMessage(
            response.success
                ? "Application successfully sent!"
                : friendlyMessages[response.errorCode] || response.message || "Application failed."
        );

        if (response.success) setApplicationContent("");

    } catch (err) {
        console.error(err);

        const friendlyMessages = {
            "ILLEGAL_ARGUMENT": "You are the owner of this band.",
            "CONFLICT": "You already applied to this band.",
            "NOT_FOUND": "Band not found.",
            "SERVER_ERROR": "Something went wrong. Please try again later."
        };

        // ✅ Let op hier: gebruik err.response.data
        const serverMessage =
            err.response?.data?.errorCode
                ? friendlyMessages[err.response.data.errorCode] || err.response.data.message
                : "Server error. Please try again later.";

        setApplyMessage(serverMessage);
    } finally {
        setLoadingApply(false);
    }
    };
    return (
        <div className="app-background" style={{ flexDirection: "row" }}>
            <CustomHeader />
            <button className="Return-button" onClick={goBack} style={{ marginLeft: "-11%", marginRight: "20px", marginBottom: "25%" }}>
                Go Back
            </button>

            <div
                className="Viewband-container"
                style={{
                    background: `linear-gradient(to bottom, ${Color1}, ${Color2})`,
                    border: `10px solid ${borderColor}`
                }}
            >
                <div className="Top-section">
                    <h1 style={{ color: "white" }}>{band.BandName}</h1>
                    <div className="largeDescription">{band.Largedescription}</div>
                </div>

                <div className="Middle-section">
                    <div className="general-info">
                        <h4>
                            Place of operations: <div style={{ fontWeight: "normal" }}>{band.PlaceOfOperations}</div>
                        </h4>
                        <h4>
                            Genre: <div style={{ fontWeight: "normal" }}>{band.Genre}</div>
                        </h4>
                        <h4>Meet the members:</h4>
                    </div>

                    <div className="apply-section">

                        {applyMessage && (
                            <p className="apply-message">
                                {applyMessage}
                            </p>
                        )}
                        <input
                            type="text"
                            style={{width:"100%", height:"20%"}}
                            className="apply-input"
                            value={applicationContent}
                            onChange={(e) => setApplicationContent(e.target.value)}
                            placeholder="Write your application (max 250 characters)"
                            maxLength={250}
                        />

                        <button
                            className="BandButtons apply-button"
                            style={{ boxShadow: `0 4px 30px ${hexToRgba(Color2, 0.6)}` }}
                            onClick={handleApply}
                            disabled={loadingApply}
                        >
                            {loadingApply ? "Applying..." : "Apply?"}
                        </button>


                    </div>
 
                </div>

                <div className="member-section" style={{ border: `10px solid ${borderColor}`, borderRadius: "10px" }}>
                    <MemberComponent member={band.Creator} isCreator={true} />
                    {members.map(member => (
                        <MemberComponent key={member.userId} member={member} isCreator={false} />
                    ))}
                </div>
            </div>
        </div>
    );
}
