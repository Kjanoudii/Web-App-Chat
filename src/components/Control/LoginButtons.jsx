
import googleIcon from "../../images/GoogleIcon.jpg"
import facebookIcon from "../../images/Facebookicon.png"
import SocialMediaBtns from "./SocialMediaBtns"
import { Link } from 'react-router-dom'
import { Auth } from '../../firebase-config.js';
// import { useState } from "react";
// import { useState } from "react";

export default function LoginButtons(prop) {
    // const func = useState(prop.state === true ? prop.logIn : prop.register)
     
    const {noAccount} = prop

    const func = !noAccount ? prop.logIn : prop.register ;

   console.log(Auth?.currentUser?.email)



    return (
        <>
            <Link to="/components/Pages/ChatPage">

                <input onClick={() => { func() }} type="submit"

                    value={ noAccount ? "Register" : "Login" } />

            </Link >

            <div className="social-media-btns">
                <SocialMediaBtns
                    icon={googleIcon}
                    text="sign in with Google"
                    signInWithGoogle={prop.signInWithGoogle}

                />

                <SocialMediaBtns
                    icon={facebookIcon}
                    text="sign in with Facebook"
                    signInWithFacebook={prop.signInWithFacebook}
                />

            </div>
        </>
    )
}