import React, {useState, useEffect} from 'react';
import './App.css';


import Post from './components/Post';
import {db, auth, storage} from "./firebase"

import logo from "./images/Instagram_logo.png"

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './components/ImageUpload';
import Home from "./components/Home"
import Profile from "./components/Profile"

import {Route, BrowserRouter, Switch} from "react-router-dom" 


// function getModalStyle() {
//   const top = 50 ;
//   const left = 50;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: 'absolute',
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

// function App() {

//   const classes = useStyles();
//   // getModalStyle is not a pure function, we roll the style only on the first render
//   const [modalStyle] = useState(getModalStyle);
//   const [openSignin, setOpenSignin] = useState(false);
//   const [posts, setPosts] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [user, setUser] = useState(null); //sesia ulogovanog


//   useEffect(() => { 
//     const unsubcribe = auth.onAuthStateChanged((authUser) => { //lisener
//       if (authUser){
//         //user login
//         console.log(authUser);
//         setUser(authUser);

//         if (authUser.displayName) {
//           //ne treba se update username
//         } else {
//           // kada se kreira novi
//           return authUser.updateProfile({
//             displayName: username,
//           })
//         }
//       } else {
//         //user loggedout
//         setUser(null);
//       }
//     })
//     return () => {
//       // preform actions
//       unsubcribe();
//     }
//   }, [user, username])

//   useEffect( () => {
//     db.collection('posts').orderBy("timestamp", "desc").onSnapshot(snapshot => {
//       setPosts(snapshot.docs.map(doc => ({
//         id: doc.id,
//         post: doc.data()
//       })))
//     })

//   }, []);

//   const signUp = (event) => {
//     event.preventDefault();
    

//     auth
//     .createUserWithEmailAndPassword(email,password)
//     .then((authUser) => {
//       return authUser.user.updateProfile({
//         displayName: username
//       })
//     })
//     .catch((error) => alert(error.message))
//     .then(() => window.location.reload())

//     setOpen(false);
//   }

//   const signIn = (event) => {
//     event.preventDefault();

//     auth
//       .signInWithEmailAndPassword(email,password)
//       .catch(error => alert(error.message))

//     setOpenSignin(false)

//   }

//   const handleLogin = () => {

//   }

//   return (
//     <div className="app">

      
//       <Modal
//         open={open}
//         onClose={() => setOpen(false)}
//         aria-labelledby="simple-modal-title"
//         aria-describedby="simple-modal-description"
//       >
//         <div style={modalStyle} className={classes.paper}>
//           <form  className="app__signup" >
//           <center>
//             <img src={logo} alt="" className="app__headerLogo"/>
//             <Input
//               className="inputField"
//               placeholder="email"
//               type="text"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Input
//               placeholder="username"
//               className="inputField"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <Input
//               placeholder="password"
//               className="inputField"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <Button type="submit" onClick={signUp} > SignUp </Button>
            
//           </center>
//          </form>
//         </div>
//       </Modal>

//       <Modal
//         open={openSignin}
//         onClose={() => setOpenSignin(false)}
//         aria-labelledby="simple-modal-title"
//         aria-describedby="simple-modal-description"
//       >
//         <div style={modalStyle} className={classes.paper}>
//           <form  className="app__signin" >
//           <center>
//             <img src={logo} alt="" className="app__headerLogo"/>
//             <Input
//               className="inputField"
//               placeholder="email"
//               type="text"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
            
//             <Input
//               placeholder="password"
//               className="inputField"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <Button type="submit" onClick={signIn} > SignIn </Button>
            
//           </center>
//          </form>
//         </div>
//       </Modal>
//       {user?.displayName ? (
//         <ImageUpload username={user.displayName}/>
//       ) : (

//         <h1>Niste ulogovani</h1>
//       )}
      

      
//       <div className="app__header">
//             <img src={logo} alt="" className="app__headerLogo"/>
//             {user ? (<h1>{user.displayName}</h1>) : (<h1>Niste ulogovani</h1>)}

//             {user ? (
//         <Button onClick={() => auth.signOut()} className="primary">Log Out</Button>
//       ) : (
//         <div className="app__loginContanier">
//           <Button onClick={() => setOpenSignin(true)} className="primary">Sign In</Button>
//           <Button onClick={() => setOpen(true)} className="primary">Sign Up</Button>
//         </div>
//       )}
//       </div>
//       <div className="app__posts">

//         {posts.map(({id, post}) => (
//           <Post username = {post.username} imageUrl = {post.imageUrl} caption = {post.caption} key={id} postID={id} user={user}/>
//          ))}
//       </div>   
      
      

//      <h1>Cao Svece</h1>
//     </div>
//   );
// }

// export default App;
function App() {
  return(
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/Profile" component={Profile} />
        </Switch>
      </div>
    </BrowserRouter>
    )
}

export default App