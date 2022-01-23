import React, { useState, useEffect } from "react";
import "./Home.css";
import Post from "./components/Post";

import { db, auth } from "./firebase";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input, Box } from "@mui/material";
import ImageUpload from "./components/ImageUpload";
import InstagramEmbed from "react-instagram-embed";
import Suggestion from "./components/Suggestion";

//icons
import {
  MdHomeFilled,
  MdOutlineExplore,
  MdOutlineAddBox,
} from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Home() {
  const [posts, setPosts] = useState([]);

  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const [openSignIn, setOpenSignIn] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in...
        console.log(authUser);
        setUser(authUser);

        // if (authUser.displayName) {
        //   // dont update username
        // } else {
        //   // if we just created someone...
        //   return authUser.updateProfile({
        //     displayName: username,
        //   });
        // }
      } else {
        //user has logged out...
        setUser(null);
      }
    });

    return () => {
      //perform some cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  return (
    <div className="app">
      <div className="app__header">
        <img className="app__headerImage" src="/assets/logo.png" alt="logo" />
        <div className="app__navLink">
          <a href="/">
            <MdHomeFilled />
          </a>
          <a href="#" className="app__navLink-Mob">
            <AiOutlineMessage />
          </a>

          {user?.displayName ? (
            <a href="#" onClick={() => setOpenUpload(true)}>
              <MdOutlineAddBox username={user.displayName} />
            </a>
          ) : (
            <a
              href="#"
              onClick={() => {
                return alert("Sorry you need to login to upload");
              }}
            >
              <MdOutlineAddBox />
            </a>
          )}

          {/* {user?.displayName ? (
            <a href="/upload" username={user.displayName}>
              <MdOutlineAddBox />
            </a>
          ) : (
            <a
              href="#"
              onClick={() => {
                return alert("Sorry you need to login to upload");
              }}
            >
              <MdOutlineAddBox />
            </a>
          )} */}
          <a href="#" className="app__navLink-Mob">
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
      </div>
      <div>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={style}>
            <form className="app__signup">
              <center>
                <img
                  className="app__headerImage"
                  src="./assets/logo.png"
                  alt="logo"
                />
              </center>

              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button type="submit" onClick={signUp}>
                Sign Up
              </Button>
            </form>
          </Box>
        </Modal>

        <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
          <Box sx={style}>
            <form className="app__signup">
              <center>
                <img
                  className="app__headerImage"
                  src="./assets/logo.png"
                  alt="logo"
                />
              </center>
              <Input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button type="submit" onClick={signIn}>
                Sign In
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
      <div className="app__posts">
        <div className={user?.displayName ? "app__postLeft" : ""}>
          {posts.map(({ id, post }) => {
            //const { username, caption, imageUrl } = post;
            return (
              <Post
                key={id}
                postId={id}
                user={user}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
              />
            );
          })}
        </div>
        {user?.displayName ? (
          <div className="app__postRight">
            <Suggestion />
            {/* <InstagramEmbed
            url="https://instagr.am/p/Zw9o4"
            clientAccessToken="6956745924367881|e89f1806f0128935c1148b19c1d75b51"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          /> */}
          </div>
        ) : (
          ""
        )}
      </div>

      {/* optional in javascript (user?.displayName) */}
      {/* {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )} */}

      <Modal open={openUpload} onClose={() => setOpenUpload(false)}>
        <Box sx={style}>
          {user?.displayName ? (
            <ImageUpload username={user.displayName} />
          ) : (
            <h3>Sorry you need to login to upload</h3>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default Home;
