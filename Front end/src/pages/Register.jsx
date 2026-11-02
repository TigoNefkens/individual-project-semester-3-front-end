import RegisterForm from '../components/RegisterForm.jsx';
import './Register.css';
import CustomHeader from "../components/Header.jsx";

function Register() {

  return (
    <>
      <div className="app-background">
        <CustomHeader></CustomHeader>
        <RegisterForm></RegisterForm>
      </div>
    </>
  );
}

export default Register;
