import { useState } from "react";
import Contact from "./Contact";
import settingsIcon from "../../Images/WhiteSettingsIcon.png";
import logoutImg from "../../Images/logout.png";
import Popup from "./Popup";
import { signOut } from "firebase/auth";
import { Auth } from "../../firebase-config.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { myContext } from "./../Pages/ChatPage";

export default function Contacts(prop) {
  const { contactBackGround, changeBackGround, backGroundStyle } = prop;
  const [openPopUp, setOpenPopUp] = useState(false);
  const { contactsDb, display } = useContext(myContext);

  console.log(contactsDb);
  const LogOut = async () => {
    try {
      await signOut(Auth);
    } catch (err) {
      console.log(err);
    }
    console.log(`This is email after logging out ${Auth?.currentUser?.email}`);
  };

  return (
    <div
      className={"Chat-contacts-default container h-full"}
      style={backGroundStyle}
    >
      <div className="contact-header">
        <img
          onClick={() => {
            setOpenPopUp(true);
          }}
          id="settings-icon"
          src={settingsIcon}
        />
      </div>

      <br />
      <ul className={"Chat-contact-list "} style={contactBackGround}>
        {contactsDb.map((contact, index) => (
          <Contact
            myKey={index}
            key={index}
            contact={contact}
            display={display}
          />
        ))}
        {contactsDb.map((contact, index) => (
          <Contact
            myKey={index}
            key={index}
            contact={contact}
            display={display}
          />
        ))}
      </ul>

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
