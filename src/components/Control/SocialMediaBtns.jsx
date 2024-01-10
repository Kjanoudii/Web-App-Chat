import facebookIcon from "../../Images/Facebookicon.png"


export default function SocialMediaBtns(prop) {
    const { signInWithGoogle, signInWithFacebook }=prop

    const onClickHandler = prop.icon === facebookIcon ? signInWithFacebook : signInWithGoogle;
    return (

        <div onClick={onClickHandler} className={` ${prop.icon == facebookIcon ? "facebook-btn" : "google-btn"}`} >
            <div className="icon-wrapper">
                <img className={` ${prop.icon === facebookIcon ? "facebook-icon" : "google-icon"}`} src={prop.icon} />
            </div>
            <p className="btn-text"><b>{prop.text} </b></p>
        </div>

    )
}

{/* <img  src={prop.icon} /> */}