import ContactSection from "../Widgets/ContactSection";
import Chat from "../Widgets/Chat";
import "../../assets/css/Chat.css";
import { useState, useEffect, createContext } from "react";
import {} from "../../firebase-config.js";

import { db } from "../../firebase-config";

import {
  getDocs,
  collection,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export const myContext = createContext();

export default function Page(prop) {
  const contactsRef = collection(db, "Contacts");
  const [avatar, setAvatar] = useState(null);
  const [contactName, setContactName] = useState("");

  const [newId, setNewId] = useState(1);
  const [contactsDb, setContactsDb] = useState([]);
  const [newSelectedMessages, setnewSelectedMessages] = useState([]);

  const getContacts = async () => {
    try {
      const data = await getDocs(contactsRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
      }));
      setContactsDb(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getContacts();
    display(newId.toString());
  }, []);

  let updatedMessages;
  const sentMessage = async (contactId, newMessage) => {
    const contactRef = doc(db, "Contacts", contactId);

    try {
      const contactSnapshot = await getDoc(contactRef);
      if (contactSnapshot.exists()) {
        const contactData = contactSnapshot.data();
        updatedMessages = [...contactData.messages, newMessage];

        await updateDoc(contactRef, { messages: updatedMessages });
        setnewSelectedMessages(updatedMessages);

        getContacts();
      } else {
        console.log("Contact document does not exist");
      }
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };
  let pic = "";
  const display = async (contactId) => {
    const contactRef = doc(db, "Contacts", contactId);
    setNewId(contactId);

    try {
      const contactSnapshot = await getDoc(contactRef);

      const contactData = contactSnapshot.data();

      const Messages = [...contactData.messages];
      const name = contactData.name;
      setContactName(name);

      pic = contactData.profile_pic;

      setAvatar(pic);

      setnewSelectedMessages(Messages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, [avatar]);

 const [contactColor, setContactColor] = useState(
   "linear-gradient(120deg, #f7f7f8, #a5a5a8)"
 );
 const [color, setColor] = useState(
   "linear-gradient(120deg, #989ea1, #9999aa)"
 );


  const changeBackGround = (color) => {
    if (color == "red") {
      setColor("linear-gradient(120deg, #975147, #8f6159)");
      setContactColor("linear-gradient(120deg, #bd8c83, #af8d88)");
    } else if (color == "yellow") {
      setColor("linear-gradient(120deg, #c5b34e, #ffebd6)");
      setContactColor("linear-gradient(120deg, #ddce7c, #dbd8a6)");
    } else {
      setColor("linear-gradient(120deg, #989ea1, #9999aa)");
      setContactColor("linear-gradient(120deg, #f7f7f8, #a5a5a8)");
    }
  };

  const backGroundStyle = {
    background: color,
  };

  const contactBackGround = {
    background: contactColor,
  };

  return (
    <div className="Chat-main ">
      <myContext.Provider
        value={{
          newId,
          contactsDb,
          newSelectedMessages,
          display,
          updatedMessages,
        }}
      >
        <ContactSection
          display={prop.display}
          Array={prop.Array}
          contactBackGround={contactBackGround}
          changeBackGround={changeBackGround}
          backGroundStyle={backGroundStyle}
        />
        <Chat
          sentMessage={sentMessage}
          newId={newId}
          contactName={contactName}
          avatar={avatar}
          backGroundStyle={backGroundStyle}
        />
      </myContext.Provider>
      
    </div>
  );
}
