import userAPI from '../apis/userAPI';
import './RegisterForm.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Modal from './Modal';


function RegisterForm() {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [por, setPor] = useState("");
    const [nationality, setNationality] = useState("")

    const [responseData, setResponseData] = useState("ERROR : No info available")
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const navigate = useNavigate();

    const closeModal = async (e) => {
        setShowModal(false)
        if (registerSuccess) navigate("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await WriteUserRegistration();
    };

    const WriteUserRegistration = async () => {
        const userData = {
            username: username,         
            email: email,
            password: password,
            phoneNumber: phonenumber,
            placeOfResidence: por,
            nationality: nationality,
            profileConfig: "Default",
            experience: 1,
            description: ""
        };

        try {
            const responseMessage = await userAPI.registerUser(userData);
            setResponseData(responseMessage); 
            setRegisterSuccess(true);
            setShowModal(true);

        } catch (error) {
            setResponseData(error.message);
            setShowModal(true);
        }
    };


  return (
    <>
        <div className='Rform-container'>
            <Modal open={showModal} onClose={closeModal}>
                    {
                        responseData === "Your account has been created" ? <p style={{ color: "green" }}>{responseData}</p> : <p style={{ color: "red" }}>{responseData}</p>
                    }
                    <button className="ConfirmPopup" onClick={closeModal}>Confirm</button>
            </Modal>
            <div className='Rform-titel'>Sign up</div>
            <div className='Rform-subtitel'>Enter your credentials to Sign up:</div>
            <form className='Rform' onSubmit={handleSubmit}>
                <div className='section-container'>
                    <div className='section1'>
                        <h2 style={{color:"white"}}>Your credentials :</h2>
                        <div className='section-square'>
                            <div className='Rinput-container'>
                                <input type="email" id="email" name="Email" placeholder="E-mail" required value={email} maxLength={35} onChange={e => setEmail(e.target.value)}></input>
                            </div>
                            <div className='Rinput-container'>
                                <input type="password" id="password" name="Password" placeholder="Password" maxLength={15} minLength={7} required value={password} onChange={e => setPassword(e.target.value)}></input>
                            </div>

                            <div className='Rinput-container'>
                                <input type="text" id="username" name="username" placeholder="Username" maxLength={8} minLength={5} required value={username} onChange={e => setUsername(e.target.value)}></input>
                            </div>
                            
                        </div>
                    </div>
                    
                    <div className='section2'>
                        <h2 style={{color:"white"}}>Your general info :</h2>
                        <div className='section-square'>
                            <div className='Rinput-container'>
                                <input type="tel" id="phonenumber" name="Phonenumber" pattern="\d{10,}" placeholder="Phonenumber" required value={phonenumber} onChange={e => setPhonenumber(e.target.value)}></input>
                            </div>

                            <div className='Rinput-container'>
                                <input type="text" id="residence" name="Residence" placeholder="City" required value={por} onChange={e => setPor(e.target.value)}></input>
                            </div>

                            <div className='Rinput-container'>
                                    <select value={nationality} onChange={(e) => setNationality(e.target.value)} required style={{msOverflowY: 'auto', display:"block"}}>
                                            <option value="">-- select your nationality --</option>
                                            <option value="american">American</option>
                                            <option value="british">British</option>
                                            <option value="canadian">Canadian</option>
                                            <option value="australian">Australian</option>
                                            <option value="german">German</option>
                                            <option value="french">French</option>
                                            <option value="dutch">Dutch</option>
                                            <option value="spanish">Spanish</option>
                                            <option value="italian">Italian</option>
                                            <option value="belgian">Belgian</option>
                                            <option value="polish">Polish</option>
                                            <option value="chinese">Chinese</option>
                                            <option value="indian">Indian</option>
                                            <option value="japanese">Japanese</option>
                                            <option value="korean">Korean</option>
                                            <option value="mexican">Mexican</option>
                                    </select>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="submit" className='confirmbtr'>Confirm</button>
            </form>
        </div>
    </>
  );
}

export default RegisterForm;