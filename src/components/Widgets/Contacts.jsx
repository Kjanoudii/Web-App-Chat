import { useState } from 'react';
import Contact from './Contact';
import settingsIcon from "../../Images/WhiteSettingsIcon.png"
import logoutImg from "../../Images/logout.png"
import Popup from './Popup'
import { signOut } from "firebase/auth";
import { Auth } from '../../firebase-config.js';
import { Link } from 'react-router-dom'
import { useContext } from "react"
import { myContext } from './../Pages/ChatPage'



/// contactsArray was the other prop as data
// import { useState } from 'react';
export default function Contacts() {
  

    const [openPopUp, setOpenPopUp] = useState(false);
    const { contactsDb, display } = useContext(myContext)

    console.log(contactsDb)
    const LogOut = async () => {

        try {
            await signOut(Auth)
        } catch (err) {
            console.log(err)
        }
        console.log(`This is email after logging out ${Auth?.currentUser?.email}`)

    }


    // const contactElements = contactsDb.map((contact, index) => (
    //     <Contact 
    //       myKey={index}  key={index} contact={contact} display={display} />
    // ))


    const [contactsClass, setContactsClass] = useState("Chat-contacts-blue")
    // const [searchItem, setSearchItem] = useState('')
    const changeBackGround = (color) => {
         if(color=="red")
         setContactsClass("Chat-contacts-red")
         else if (color === "yellow")
            setContactsClass("Chat-contacts-yellow")
          else 
            setContactsClass("Chat-contacts-blue")
      }

    return (
        <div className={contactsClass}>
            <div className="contact-header">
                <h2 className="contacts-title">contacts</h2>


                <h2><img onClick={() => { setOpenPopUp(true) }}
                    id="settings-icon"
                    src={settingsIcon}
                />

                </h2>
            <Link to="/components/Pages/LoginPage">
              <img className="logout-img"onClick={LogOut}src={logoutImg}/>
            </Link >
               
            </div>
            {/* <input type="text" placeholder='search' onChange={(e)=>{setSearchItem(e.target.value)}}/> */}
            <br />
            <ul 
                className="Chat-contact-list">{contactsDb.map((contact, index) => (
                <Contact
                    myKey={index} key={index} contact={contact} display={display} />
                 
    ))}</ul>
  
            <div>
                <Popup
                    changeBackGround={changeBackGround}
                    trigger={openPopUp}
                    setTrigger={setOpenPopUp}
                  
                />

            </div>
        </div>
    );
}









