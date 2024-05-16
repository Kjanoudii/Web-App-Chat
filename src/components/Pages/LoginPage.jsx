import '../../assets/css/Login.css'
import { useState } from 'react';
import img from "../../images/MainImage.png";
import LoginForm from "../widgets/LoginForm.jsx";

export default function LoginPage() {

    const [noAccount, setNoAccount] = useState(false)
   
    return (
        <div className="login-page h-screen">
            <LoginForm 
            noAccount={noAccount}
            setNoAccount={setNoAccount}
            
            />
          
        </div>
    )
}