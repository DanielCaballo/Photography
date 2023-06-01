import React, { useState } from 'react';
import { storage, db } from "../firebase"

import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import 'firebase/compat/storage';
import './../App.css'
import {trash_svg} from "./svgs/trash_svg";



function AddPost({ username }) {
    // const [image, setImage] = useState(null);
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageURL: url,
                            userName: username
                        })
                    })

            }
        )
        setCaption(' ')
        setImage(null)
    }
    return (
        < div className="subirImg">

            <div className="subirImg--styles">
            <h2 className={"text-center"}>Añade una nueva Foto</h2>


            <input className='file-input' type="file" accept=".png, .jpg, .jpeg" onChange={handleChange} />
            <br />
            <input type="text" className={"textField"} id="filled-basic" label="Pon una Descripcion" variant="filled" onChange={event => setCaption(event.target.value)} value={caption} />
            <br />

            < progress className="barraProgreso" value={progress} max="100" />
            <button className={"button--full"} onClick={handleUpload}>
                Subir Foto
                {trash_svg}
            </button>

            </div>

        </div>
    )
}

export default AddPost
