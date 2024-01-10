
// import { useState } from 'react';
// import { Auth } from '../../firebase-config.js';
// import { createUserWithEmailAndPassword } from "firebase/auth";



export default function Input(prop) {
const {email ,setEmail,password,setPassword } =prop
    

    const handleChange = (e) => {
        if (prop.type === "text") {
            setEmail(e.target.value);
        } else if (prop.type === "password") {
            setPassword(e.target.value);
        }
    };

   
    return (
        <>
            <div className="txt_field">
                <input
                    type={prop.type}
                    value={prop.type === "text" ? email : password}
                    onChange={handleChange}
                />
                <span></span>
                <label>{prop.label}</label>
            </div>

        </>
    )
}