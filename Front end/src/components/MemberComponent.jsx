import './MemberComponent.css';
import { Link } from "react-router-dom";
import Crown from "../assets/crown.png"
import { useNavigate } from 'react-router-dom';

function MemberComponent({ member, isCreator }) {
    const navigate = useNavigate();

    const goToProfile = () => {
        navigate("/Find-bands/view/view-other-profiles", { 
            
            state: { otherUserModel: member }
        });
    };

    if (!member) {
        return null;
    }

    let config = {};

    if (
        typeof member.profileConfig === "string" &&
        member.profileConfig.trim().startsWith("{")
    ) {
        try {
            config = JSON.parse(member.profileConfig);
        } catch {
            config = {};
        }
    }

    const borderColor = config.borderColor ?? "white";
    const Color1 = config.color1 ?? "grey";
    const Color2 = config.color2 ?? "grey";

    return (
        <>
                <div
                    id="member-square"
                    style={{
                        background: `linear-gradient(to bottom, ${Color1}, ${Color2})`,
                        border: `10px solid ${borderColor}`,
                        borderRadius: "10px"
                    }} onClick={goToProfile}

                >

                    {isCreator && (
                        <img
                            src={Crown}
                            alt="Creator"
                            id='crown'
                        />
                    )}
                    {member?.username}
                </div>
            
        </>
    );
}

export default MemberComponent;
