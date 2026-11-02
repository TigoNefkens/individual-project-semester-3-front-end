import LoginForm from '../components/LoginForm.jsx'
import './Login.css';
import CustomHeader from "../components/Header.jsx";


function Login() {

  return (
    <>
      <div className="app-background">
        <CustomHeader></CustomHeader>
        <LoginForm></LoginForm>
      </div>
    </>
  );
}

export default Login;
