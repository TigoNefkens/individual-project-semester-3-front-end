import React, { useEffect, useState } from "react";
import "./ApplicationComponent.css";
import userAPI from "../apis/userAPI";
import applicationAPI from "../apis/applicationAPI";
import AcceptIcon from "../assets/accept.png";
import DenyIcon from "../assets/denie.png";
import ApplicationModal from "./ApplicationModal";
import ApplicationMemberComponent from "./ApplicationMemberComponent";

export default function ApplicationComponent({ application, onUpdate }) {
    const [user, setUser] = useState(null);
    const [loadingAction, setLoadingAction] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [responseData, setResponseData] = useState("");
    const [actionType, setActionType] = useState(""); // Keep track of whether the user wants to accept or deny

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
        window.location.reload(); // Reload to reflect changes
    }

    const closeModal = () => setShowModal(false);

    const handleConfirmAction = async () => {
        setLoadingAction(true);

        try {
            if (actionType === "accept") {
                await applicationAPI.acceptApplication({ applicationId: application.applicationId }, localStorage.getItem("jwtToken"));
                setResponseData("Application successfully accepted.");
            } else if (actionType === "deny") {
                await applicationAPI.denyApplication(application.applicationId, localStorage.getItem("jwtToken"));
                setResponseData("Application successfully denied.");
            }
            if (onUpdate) onUpdate(application.applicationId);
            setShowSuccessModal(true); 
        } catch (err) {
            setResponseData(`Failed to ${actionType} application: ${err.message}`);
        } finally {
            setLoadingAction(false);
            closeModal(); 
        }
    };

    const handleAccept = () => {
        setActionType("accept");
        setResponseData("Are you sure you want to accept this application?");
        setShowModal(true);
    };

    const handleDeny = () => {
        setActionType("deny");
        setResponseData("Are you sure you want to deny this application?");
        setShowModal(true);
    };

    useEffect(() => {
        if (!application?.applicantUserId) return;

        userAPI.GetUserById(application.applicantUserId)
            .then(fetchedUser => setUser(fetchedUser))
            .catch(err => console.error("Failed to load user", err));
    }, [application.applicantUserId]);

    return (
        <div className="Application-component">
            {/* Confirm action modal */}
            <ApplicationModal open={showModal} onClose={closeModal}>
                <p style={{ color: "red" }}>{responseData}</p>
                <div className="option-buttons">
                    <button className="ConfirmPopup" onClick={handleConfirmAction}>Confirm</button>
                    <div className="button-divider"></div>
                    <button className="ConfirmPopup" onClick={closeModal}>Cancel</button>
                </div>

            </ApplicationModal>

            {/* Success modal */}
            <ApplicationModal open={showSuccessModal} onClose={closeSuccessModal}>
                <p style={{ color: "green" }}>{responseData}</p>
                <button className="ConfirmPopup" onClick={closeSuccessModal}>Close</button>
            </ApplicationModal>

            {/* Member info */}
            <div className="Application-member">
                {user && <ApplicationMemberComponent member={user} isCreator={false} />}
            </div>

            {/* Application content */}
            <div className="Application-content">
                <p><strong>Phone number:</strong> {user?.phoneNumber}</p>
                <p><strong>Email address:</strong> {user?.email}</p>
                <p><strong>Place of residence:</strong> {user?.placeOfResidence}</p>
                <p className="Application-message">{application.content}</p>

                <div className="Application-options">
                    <button className="icon-button" onClick={handleAccept} disabled={loadingAction}>
                        <img src={AcceptIcon} alt="Accept" />
                    </button>
                    <button className="icon-button" onClick={handleDeny} disabled={loadingAction}>
                        <img src={DenyIcon} alt="Deny" />
                    </button>
                </div>
            </div>
        </div>
    );
}
