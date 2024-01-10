import ContactSection from '../Widgets/ContactSection'
import Chat from '../Widgets/Chat'
import '../../assets/css/Chat.css'
import {  useState , useEffect , createContext } from 'react';
import { } from '../../firebase-config.js';

// import contactsData from "../../contact.json"
import { db } from "../../firebase-config"

import { getDocs, collection , getDoc , doc , updateDoc } from "firebase/firestore"

export const myContext = createContext()

export default function Page(prop) {
    const contactsRef = collection(db,"Contacts")
    const [avatar, setAvatar] = useState(null)
    const [contactName, setContactName] = useState('')
// const [id, setId] = useState(3)
    const [newId, setNewId] = useState(1)
    const [contactsDb, setContactsDb] = useState([])
    const [newSelectedMessages, setnewSelectedMessages] = useState([])
// console.log(`This is the email ${Auth?.currentUser?.email}`)
    const getContacts = async () => {
        try {
            const data = await getDocs(contactsRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data()
             
            }));
            setContactsDb(filteredData);
            // setnewSelectedMessages(filteredData[0].messages)
      
      
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {

        getContacts();
          display(newId.toString())
        
    },[]); 

   
  //code for diplaying messages
    
    
    let updatedMessages;
     const sentMessage = async (contactId, newMessage) => {
        const contactRef = doc(db, 'Contacts', contactId);
      
        try {
            const contactSnapshot = await getDoc(contactRef);
            if (contactSnapshot.exists()) {
                const contactData = contactSnapshot.data();
                 updatedMessages = [...contactData.messages, newMessage];
                //  setContactName(contactData)
                // Update the messages array in the document
                await updateDoc(contactRef, { messages: updatedMessages });
             
                // console.log('Message added successfully');
                // setnewSelectedMessages(contactsDb[0].messages)
                setnewSelectedMessages(updatedMessages)
                // setContactsDb(filteredData)
                // console.log(newSelectedMessages)
                getContacts();
            } else {
                console.log('Contact document does not exist');
            }
        } catch (error) {
            console.error('Error adding message:', error);
        }
        
    };
    let pic=""
    const display = async (contactId) => {
        const contactRef = doc(db, 'Contacts', contactId);
        setNewId(contactId)
       
        try {
            const contactSnapshot = await getDoc(contactRef);
      
                const contactData = contactSnapshot.data();
                // console.log(contactData)
                const Messages = [...contactData.messages];
                
                // console.log(contactName)
            const name = contactData.name
            setContactName(name)
                  
            pic = contactData.profile_pic
            // console.log(pic)
              setAvatar(pic)
            //    console.log(avatar)
            //     console.log(name)
               setnewSelectedMessages(Messages)
                // console.log(newSelectedMessages)

             
           
        } catch (error) {
            console.error(error);
        }

    
    };

    useEffect(() => {
     

        // Perform actions with the updated 'avatar' here
        // Call a function or perform logic using 'avatar'
        // doSomethingWithAvatar(avatar);

    }, [avatar]);


    
    return (
        <div className='Chat-main'>
            <myContext.Provider
             value={{
                newId, 
                contactsDb, 
                newSelectedMessages, 
                display , 
                updatedMessages}}>
             <ContactSection      
                display={prop.display}
                Array={prop.Array}
               
           
                />
                <Chat
                      sentMessage={sentMessage}
                       newId={newId}
                       contactName={contactName}
                    //    doSomethingWithAvatar={doSomethingWithAvatar}
                       avatar={avatar}
                       />
                      </myContext.Provider>
                      </div>
    )   
}


// const [activeStyle, setActiveStyle] = useState('blue'); // Set the initial style

// const toggleStyle = () => {
    //     setActiveStyle(activeStyle === 'blue' ? 'red' : 'yellow'); // Toggle between styles
    // };
    
    // const loadStyles = async (value) => {
        //     setActiveStyle(value)
        //     if (activeStyle === 'blue') {
            //         await import('../../assets/css/Chat-blue.css');
    //     } else if (activeStyle === 'red') {
        //         await import('../../assets/css/Chat-red.css');
        //     } else {
            //         await import('../../assets/css/Chat-yellow.css');
            
            //     }
            
            // };
            
            
            //     loadStyles(activeStyle);
            // }, [activeStyle]);
            
            // const sentMessage= async (contactId, newMessage) => {
    //     const contactRef = doc(db, 'Contacts', contactId);
       
    //     try {
    //         const contactSnapshot = await getDoc(contactRef);
    //         if (contactSnapshot.exists()) {
        //             const contactData = contactSnapshot.data();
        //             const updatedMessages = [...contactData.messages, newMessage];
        
        //             // Update the messages array in the document
    //             await updateDoc(contactRef, { messages: updatedMessages });
    
    //             console.log('Message added successfully');
    //         } else {
        //             console.log('Contact document does not exist');
        //         }
        //     } catch (error) {
        //         console.error('Error adding message:', error);
    //     }
    // };
    
    // React.useEffect(() => {

         
        
        
        //     sentMessage();
        // }, []); // Empty dependency array runs once on mount
        
        // const sentMessage = async (contactId, newMessage) => {
        //     try {
            //         const contactsRef = collection(db, 'Contacts');
            //         const querySnapshot = await getDocs(contactsRef);
            
            //         querySnapshot.forEach(async (doc) => {
                //             const contactData = doc.data();
        //             if (contactData.ContactID === contactId) {
            //                 const contactRef = doc(db, 'Contacts', doc.id);
            //                 const updatedMessages = [...contactData.messages, newMessage];
            
            //                 // Update the messages array in the document
        //                 await updateDoc(contactRef, { messages: updatedMessages });
        
        //                 console.log('Message added successfully');
        //             }
        //         });
        //     } catch (error) {
            //         console.error('Error adding message:', error);
        //     }
        // };
        



        
            // function displayMessages(id) {
            //     console.log(id)
            //     // setId(id)
            //     setId(id)
            //     console.log(id)
            //     //  setnewSelectedMessages(contactsDb[newId-1].messages)
            //     // console.log(newId)
            //     console.log(`This is the new Id ${newId}`)
            // }
            



