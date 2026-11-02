
import './LoginForm.css';
import { Link } from "react-router-dom";
import Modal from './Modal';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import userAPI from '../apis/userAPI';

function LoginForm() {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);

    const navigate = useNavigate();

    const [responseData, setResponseData] = useState("ERROR : No info available")

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        await writeUserLogin();
    }

    const closeModal = async (e) => {
        setShowModal(false)
        if (loginSuccess) navigate("/");
    }

    const writeUserLogin = async () =>{
        const userData = {      
            email: email,
            password: password,
        };

        try {
            const data = await userAPI.loginUser(userData);
            localStorage.setItem("jwtToken", data.token);
            localStorage.setItem("username", data.username)
            localStorage.setItem("userID", data.id)
            console.log({data})
            setResponseData(data.message); 
            setLoginSuccess(true);
            setShowModal(true);

        } catch (error) {
            setResponseData(error.message);
            setShowModal(true);
        }
    }

  return (
    <>
        <div className='form-container'>
            <Modal open={showModal} onClose={closeModal}>
                    {
                        responseData === "Login successful!" ? <p style={{ color: "green" }}>{responseData}</p> : <p style={{ color: "red" }}>{responseData}</p>
                    }
                    <button className="ConfirmPopup" onClick={closeModal}>Confirm</button>
            </Modal>
            <div className='form-titel'>Login</div>
            <div className='form-subtitel'>Enter your email and password to login:</div>
            <form className='Lform' onSubmit={handleSubmit}>

                <div className='input-container'>
                    <input type="text" id="name" name="email" placeholder= "E-mail" required value={email} maxLength={35} onChange={e => setEmail(e.target.value)}></input>
                </div>

                <div className='input-container'>
                    <input type="password" id="name" name="password" placeholder="Password" required value={password} maxLength={15} onChange={e => setPassword(e.target.value)}></input>
                </div>

                <button type="submit" name='Confirm' className='confirmbt'>Confirm</button>
            </form>
        </div>
    </>
  );
}

export default LoginForm;