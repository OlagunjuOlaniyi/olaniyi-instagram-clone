// import React, { useState, useEffect } from "react";
// import Post from "./Post";
// import { db, auth } from "../firebase";
// import Home from "../Home";

// const PostComponent = () => {
//   const [posts, setPosts] = useState([]);
//   useEffect(() => {
//     db.collection("posts")
//       .orderBy("timestamp", "desc")
//       .onSnapshot((snapshot) => {
//         setPosts(
//           snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
//         );
//       });
//   }, []);
//   return (
//     <>
//       <Home />
//       <div className="app__posts">
//         <div className="app__postLeft">
//           {posts.map(({ id, post }) => {
//             const { username, caption, imageUrl } = post;
//             return (
//               <Post
//                 key={id}
//                 postId={id}
//                 user={user}
//                 username={username}
//                 caption={caption}
//                 imageUrl={imageUrl}
//               />
//             );
//           })}
//         </div>
//         <div className="app__postRight">
//           <Suggestion />
//           {/* <InstagramEmbed
//             url="https://instagr.am/p/Zw9o4"
//             clientAccessToken="6956745924367881|e89f1806f0128935c1148b19c1d75b51"
//             maxWidth={320}
//             hideCaption={false}
//             containerTagName="div"
//             protocol=""
//             injectScript
//             onLoading={() => {}}
//             onSuccess={() => {}}
//             onAfterRender={() => {}}
//             onFailure={() => {}}
//           /> */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PostComponent;
