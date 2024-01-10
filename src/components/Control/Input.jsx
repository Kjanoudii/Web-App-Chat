
import { useState } from 'react';
import { getDate } from '../../assets/js/functions.js';
import { storage } from "../../firebase-config.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import micIcon from "../../Images/icons-mic.png"
import cameraIcon from "../../Images/icons-camera.png"
import sendIcon from "../../Images/icons-send.png"
// import activeMicIcon from "../../Images/icons-mic-active.png"
// import YemeniSong from "/../public/Audio/Yemeni-Song.mp3"


export default function Input(prop) {
    const { sentMessage } = prop;
    const [message, setMessage] = useState('');
    const [imageUpload, setImageUpload] = useState(null);
    // const[isRecording , setIsRecording] =useState(false)

    const handleTextMessage = () => {
        // the message that will be sent to the database
        const newMessage = {
            type: 'sent',
            message:  message ,
            date: getDate()
        };
        sentMessage(prop.newId.toString(), newMessage);
        setMessage('');
    };

    
    
    const uploadImage = () => {
   
     
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

        
        uploadBytes(imageRef, imageUpload)
        .then(() => {
             
                getDownloadURL(imageRef)
                    .then((url) => {
                        const imgMessage = {
                            type: 'sent-img',
                            message: url,
                            date: getDate()
                        };

                        sentMessage(prop.newId.toString(), imgMessage);
                        setImageUpload(null)
                    })
                    .catch((error) => {
                        console.error('Error getting download URL:', error);
                    });
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
            });
    };

    let mediaRecorder;
    let audioChunks = [];

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.addEventListener('dataavailable', event => {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            });
        })
        .catch(error => {
            // Handle errors
            console.error('Error accessing microphone:', error);
        });

    // Start recording
    
    // Start recording
    const startRecording = () => {
      
        audioChunks = [];
        if (mediaRecorder) {
            mediaRecorder.start();
        }
    };


   
    const stopRecording = () => {
    
        if (mediaRecorder) {
            
            mediaRecorder.stop();
            mediaRecorder.addEventListener('stop', () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                // setIsVoice(true)
                uploadToFirebase(audioBlob).then(() => {
                //  handleTextMessage()
                  
         

                }).catch(error => {
                    // Handle error if the upload or processing fails
                    console.error('Error:', error);
                    // setIsRecording(false)
                });
            });
        }
    };

    // Function to upload recorded audio to Firebase storage
    const uploadToFirebase = audioBlob => {
        const audioFileName = v4() ; // Set your desired file name here
        const storageRef = ref(storage, `audio/${audioFileName}`);

        uploadBytes(storageRef, audioBlob)
            .then(snapshot => {
                console.log('Audio uploaded to Firebase:', snapshot);
                
                // Get the download URL
                getDownloadURL(storageRef)
                    .then(downloadURL => {
                       
                        console.log('Download URL:', downloadURL);
                        // setAudioUrl(downloadURL)
                        // handleVoiceMessage()

                        const newMessage = {
                            type: 'sent-audio',
                            message: downloadURL,
                            date: getDate()
                        };
                        sentMessage(prop.newId.toString(), newMessage);
                        setMessage('');
                       
                        // Do something with the download URL if required
                    })
                    .catch(error => {
                        console.error('Error getting download URL:', error);
                    });
            })
            .catch(error => {
                console.error('Error uploading audio:', error);
            });
    };
    return (
        <div className="Chat-message-input">
            {/* <audio controls> 
            <source src='https://firebasestorage
            .googleapis.com/v0/b/chat-project-7717d.appspot.com/o/hey.mp3?
            alt=media&token=b8ee429d-e217-4f07-93f4-6f16534be8ea'
             type="audio/mpeg"/> </audio> */}

           
            <section className="Chat-section">
                
                <input
                    type="file"
                    id="fileInput"
                    className="input-file"
                    onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        setImageUpload(selectedFile);
                        uploadImage(selectedFile);
                    }}
                />
                <label htmlFor="fileInput" className="file-upload-button">
                   <img id='camera-icon' src={cameraIcon}/>
                </label>
             
               
      

                <input
                    type={prop.type}
                    placeholder={prop.placeholder}
                    value={message}
               
                    onChange={(e) => setMessage(e.target.value)}
                    />
    {/* {send button} */}
                <button id='send-btn' onClick={
                    () => {  message == '' ? uploadImage() : handleTextMessage();}
                }>
          <img src={sendIcon}/>
                </button>
               
                    <button id='record-btn' 
                      onMouseDown={ startRecording} 
                       onMouseUp={ stopRecording}>
                       <img src={ micIcon} />
                       
                       </button>
                   
               
            </section>
        </div>
    );
}




// export default function Input(prop) {
//     /// handleSend, UpdateLocalStorage were props
//     const { sentMessage } = prop;
//     const [message, setMessage] = useState('');
    
//     const [image, setImage] = useState('')
//     const [isImg, setIsImg] = useState(false)
    
//     // const [imageURL, setImageURL] = useState(''); // State to store image URL
//     // let imageurl = ''

//     const newMessage = {
//         type: 'sent',
//         message: message,
//         date: getDate()

//     };
//     const imgMessage = {
//         type: 'sent-img',
//         message: image,
//         date: getDate()

//     };

    
    
    
   
//     const [imageUpload, setImageUpload] = useState(null)
//     const uploadImage = () => {
//         if (imageUpload == null) return;
//         const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
//         setIsImg(true)

//         uploadBytes(imageRef, imageUpload).then(() => {
//             alert('image uploaded');

//             getDownloadURL(imageRef).then((url) => {
//                 setImage(url); // Set the image URL
//                 console.log(url); 
//             })
            
  
//         }).catch((error) => {
//             console.error('Error uploading image:', error);
//         });
        
        
        
//     };
    
    
//         useEffect(() => {
          
//         }, []);



//     return (
//         <div className="Chat-message-input">
//             <section className="Chat-section">
//                 {/* <button onClick={handleImageSend}> Send Image </button> */}
//                 <div>
//                     <input
//                         type="file"
//                         onChange={(e) => { setImageUpload(e.target.files[0]) }}
//                     />

//                     <button onClick={ uploadImage}>upload image</button>

//                 </div>
//                 <input

//                     type={prop.type}
//                     placeholder={prop.placeholder}
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                 // onClick={setIsImg(false)}

//                 // Update the input value when it changes
//                 />
//                 <button
//                     onClick={() => {
//                         sentMessage(prop.newId.toString(), isImg ? imgMessage : newMessage)
//                             , setMessage(''), setIsImg(false)
//                     }}>Send</button>
//             </section>
//         </div>
//     );
// }














    // const handleImageSend = () => {
    //     const fileInput = document.createElement('input');
    //     fileInput.type = 'file';
    //     fileInput.accept = 'image/*';

    //     fileInput.addEventListener('change', (e) => {
    //         const selectedFile = e.target.files[0];
    //         const url = URL.createObjectURL(selectedFile);

    //         setImageURL(url);

    //         console.log('Image File Name:', selectedFile.name); // Log only the file name
    //         setImageURL(selectedFile)
    //         console.log(imageURL.name)
    //         setIsImg(true)
    //         // Do something with the selected file or URL here
    //     });

    //     fileInput.click();
    // };