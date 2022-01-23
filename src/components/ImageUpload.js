import { Input, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import firebase from "firebase/compat";
import { db, auth, storage } from "../firebase";

import Home from "../Home";
import "../Home.css";
import "./imageUpload.css";

//icons
import {
  MdHomeFilled,
  MdOutlineExplore,
  MdOutlineAddBox,
} from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";

const ImageUpload = ({ username }) => {
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  // const [openSignIn, setOpenSignIn] = useState("");
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       //user has logged in...
  //       console.log(authUser);
  //       setUser(authUser);

  //       // if (authUser.displayName) {
  //       //   // dont update username
  //       // } else {
  //       //   // if we just created someone...
  //       //   return authUser.updateProfile({
  //       //     displayName: username,
  //       //   });
  //       // }
  //     } else {
  //       //user has logged out...
  //       setUser(null);
  //     }
  //   });

  //   return () => {
  //     //perform some cleanup actions
  //     unsubscribe();
  //   };
  // }, [user, username]);

  // const signUp = (event) => {
  //   event.preventDefault();

  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((authUser) => {
  //       return authUser.user.updateProfile({
  //         displayName: username,
  //       });
  //     })
  //     .catch((error) => alert(error.message));
  // };

  // const signIn = (event) => {
  //   event.preventDefault();

  //   auth
  //     .signInWithEmailAndPassword(email, password)
  //     .catch((error) => alert(error.message));

  //   setOpenSignIn(false);
  // };

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
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // error function
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <>
      {/* <div className="app__header">
        <img className="app__headerImage" src="/assets/logo.png" alt="logo" />
        <div className="app__navLink">
          <a href="/">
            <MdHomeFilled />
          </a>
          <a href="#">
            <AiOutlineMessage />
          </a>

          <a href="/post">
            <MdOutlineExplore />
          </a>
          {user ? (
            <Button onClick={() => auth.signOut()}>Logout</Button>
          ) : (
            <div className="app___loginContainer">
              <Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
              <Button onClick={() => setOpen(true)}>Sign Up</Button>
            </div>
          )}
        </div>
      </div> */}
      <div className="imageUpload">
        <progress
          className="imageupload__progress"
          value={progress}
          max="100"
        />
        <Input
          type="text"
          placeholder="Enter a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Input type="file" onChange={handleChange} />
        <Button onClick={handleUpload}>Upload</Button>
      </div>
    </>
  );
};

export default ImageUpload;
