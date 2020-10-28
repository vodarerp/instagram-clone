import React, {useState, useEffect} from 'react'
import "../css/post.css"
import Avatar from "@material-ui/core/Avatar"
import {Button} from "@material-ui/core"
import {db} from "../firebase"
import firebase from "firebase"

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

function Post({imageUrl, username, caption, postID, user}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    //const [like, setLike] = useState(false);
    const [likeID, setLikeID] = useState("");
    const [likes, setLikes] = useState([]);
    const [userLiked, setUserLiked] = useState(false);

    useEffect(() => {
        let unsub;
        if(postID){
            unsub = db
             .collection("posts")
             .doc(postID)
             .collection("comments")
             .orderBy("timestamp", "asc")
             .onSnapshot((snapshot) => {
                 setComments(snapshot.docs.map(doc => doc.data()))
             })             
        }

        return () => {
            unsub();
        }
    },[postID]);

    useEffect(() => {
        let unsub;
        setUserLiked(false);
        if(postID){
            unsub = db
            .collection("posts")
            .doc(postID)
            .collection("likes")
            .onSnapshot((snapshot)=>{
                 
                 setLikes(snapshot.docs.map((doc) => ({
                     id: doc.id,
                     lajks: doc.data()
                 })))
                //  console.log(" asdas ", snapshot.docs.length)
                if (user?.displayName)
                {
                    for(var i = 0; i <snapshot.docs.length; i++) {
                        // console.log("usao u for. ", snapshot.docs[i].data().username)
                        if (snapshot.docs[i].data().username === user.displayName){
                            // console.log("usao ")
                            setLikeID(snapshot.docs[i].id)
                            setUserLiked(true);
                            break;
                        }
                    }

                }
                 
                //  snapshot.docs.forEach(doc => {
                //      if(doc.data().username === user.displayName && !userLiked){
                //         setUserLiked(true);
                //         break;
                //      }
                //  })
             })
        }
        return () => {
            unsub();
        }
    }, [postID, user]);

    useEffect(() => {

    })

    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts")
        .doc(postID)
        .collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setComment("");
        
    }

    const likePost = () => {
        if(!userLiked){
            db.collection("posts")
        .doc(postID)
        .collection("likes").add({
            username: user.displayName
        });
        setUserLiked(true);
        } else {
            db.collection("posts")
            .doc(postID)
            .collection("likes").doc(likeID).delete()
            // .collection("likes").doc(likeID).update({
            //     username: firebase.firestore.FieldValue.delete()
            // })
            setUserLiked(false)
        }
        
    }

    return (
        <div className="post">
            {console.log("lajkovi ", likes )}
            {/* {console.log("object ", userLiked, user)} */}
            <div className="post__header">
                <Avatar
                className="post__avatar"
                alt="Pera"
                src="/static/images/avatat/1.jpg"
                 />
                <h2>{username}</h2>
            </div>
             
           
            <img
            src={imageUrl}
            className="post__image"
            alt="P"
            ></img>
            <div className="post__likes">
                {userLiked ? (
                    <FavoriteIcon onClick={likePost}/>          
                    )
                : (
                    <FavoriteBorderIcon onClick={likePost} />
                )}
            </div>
            
            <h3 className="post__text"><strong>{username}</strong>: {caption}</h3>

            <div className="post__comments">
                {comments.map((com,i) => (
                    <p key={i}>
                        <strong>{com.username}</strong> {com.text}
                    </p>
                ))}
            </div>
           
            {user && (
                <form className="post__commentForm">
                <input type="text" className="post__input" placeholder="Enter a comment..." 
                value={comment} onChange={(e) => setComment(e.target.value)} />
                <button className="post__button" disabled={!comment} type="submit" onClick={postComment}>Post</button>
            </form>
            )}
        </div>
    )
}

export default Post
