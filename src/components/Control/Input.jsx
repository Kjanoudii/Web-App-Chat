import { useState } from "react";
import { getDate } from "../../assets/js/functions.js";
import { storage } from "../../firebase-config.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import micIcon from "../../Images/icons-mic.png";
import cameraIcon from "../../Images/icons-camera.png";
import sendIcon from "../../Images/icons-send.png";


export default function Input(prop) {
  const { sentMessage } = prop;
  const [message, setMessage] = useState("");
  const [imageUpload, setImageUpload] = useState(null);

  const handleTextMessage = () => {
    // the message that will be sent to the database
    const newMessage = {
      type: "sent",
      message: message,
      date: getDate(),
    };
    sentMessage(prop.newId.toString(), newMessage);
    setMessage("");
  };

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

    uploadBytes(imageRef, imageUpload)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            const imgMessage = {
              type: "sent-img",
              message: url,
              date: getDate(),
            };

            sentMessage(prop.newId.toString(), imgMessage);
            setImageUpload(null);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  let mediaRecorder;
  let audioChunks = [];

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.addEventListener("dataavailable", (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      });
    })
    .catch((error) => {
   
      console.error("Error accessing microphone:", error);
    });


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
      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      
        uploadToFirebase(audioBlob)
          .then(() => {
          
          })
          .catch((error) => {
          
            console.error("Error:", error);
          
          });
      });
    }
  };

  // Function to upload recorded audio to Firebase storage
  const uploadToFirebase = (audioBlob) => {
    const audioFileName = v4(); // Set your desired file name here
    const storageRef = ref(storage, `audio/${audioFileName}`);

    uploadBytes(storageRef, audioBlob)
      .then((snapshot) => {
        console.log("Audio uploaded to Firebase:", snapshot);

        // Get the download URL
        getDownloadURL(storageRef)
          .then((downloadURL) => {
            console.log("Download URL:", downloadURL);
            // setAudioUrl(downloadURL)
            // handleVoiceMessage()

            const newMessage = {
              type: "sent-audio",
              message: downloadURL,
              date: getDate(),
            };
            sentMessage(prop.newId.toString(), newMessage);
            setMessage("");

            // Do something with the download URL if required
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading audio:", error);
      });
  };
  return (
    <div className="Chat-message-input">
    

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
          <img id="camera-icon" src={cameraIcon} />
        </label>

        <input
          type={prop.type}
          placeholder={prop.placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      
        <button
          id="send-btn"
          onClick={() => {
            message == "" ? uploadImage() : handleTextMessage();
          }}
        >
          <img src={sendIcon} />
        </button>

        <button
          id="record-btn"
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
        >
          <img src={micIcon} />
        </button>
      </section>
    </div>
  );
}

