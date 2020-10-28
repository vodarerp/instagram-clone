import React, {useState} from 'react'
import {Button} from "@material-ui/core"

import "../css/imageUpload.css"

import {db, storage} from "../firebase"
import firebase from "firebase"

function ImageUpload({username}) {
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [caption, setCaption] = useState("");




    const handleChange = (e) => {
        if (e.target.files[0]){
            setImage(e.target.files[0]) 
        }
    }

    const handleUpload = () => {

        const uploadTast = storage.ref(`images/${image.name}`).put(image);
        uploadTast.on(
            "state_changed", 
            (snapshot) => {
                //progresss
                var progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message)
            },
            () =>{
                //compelte function
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then((url) => {
                    
                    // post into db
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        username: username,
                        imageUrl: url
                    });
                    console.log("asdddddd")
                    setCaption("");
                    setProgress(0);
                    setImage(null);
                })
            }
        )

    }

    return (
        <div className="imageUpload">
            <progress max="100" value={progress} className="imageUpload__progress" />
            <input type="text" placeholder="Caption" onChange={event => setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange} />

            <Button onClick={handleUpload}> Upload </Button>

        </div>
    )
}

export default ImageUpload
