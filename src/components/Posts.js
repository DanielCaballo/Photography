import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import Modal from 'react-modal';

function Posts({ postId, user, userName, caption, imageURL }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editComment, setEditComment] = useState('');
    const [show, setShow] = useState(false);
    const [commentID, setCommentID] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const handleImageClick = (url) => {
        setSelectedImage(url);
        setOpen(true);
    };

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => ({
                        id: doc.id,
                        comment: doc.data(),
                    })));
                });
        }
        return () => {
            unsubscribe();
        };
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: newComment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setNewComment('');
    };

    const handleEdit = (id, txt) => {
        setShow(true);
        setEditComment(txt);
        setCommentID(id);
    };

    const updateComment = () => {
        db.collection("posts")
            .doc(postId)
            .collection("comments")
            .doc(commentID)
            .update({
                text: editComment
            });
        setShow(false);
    };

    return (
        <div className="post">
            <div className="post__header">
                <h3>{userName}</h3>
                {user.displayName === userName && (
                    <button
                        onClick={() => {
                            db.collection("posts").doc(postId).delete();
                        }}
                    >
                        Delete
                    </button>
                )}
            </div>
            <div onClick={() => handleImageClick(imageURL)} >
                <img className="post__image" src={imageURL} alt="Post" />
            </div>
            <Modal
                isOpen={open}
                onRequestClose={() => setOpen(false)}
            >
                <div>
                    <img
                        className="post__image"
                        src={selectedImage}
                    />
                </div>
            </Modal>
            <p className="post__text">
                <b>{userName}</b> {caption}
            </p>

            <div className="post--comentarios">
                <div className="post--comentarios__texto">
                    {comments.map(({ id, comment }) => (
                        <p key={id}>
                            <b>{comment.username}</b>: &nbsp;{comment.text}
                        </p>
                    ))}
                </div>
                <div className="post--comentarios__iconos">
                    &nbsp;
                    {comments.map(({ id, comment }) => (
                        (comment.username === user.displayName || user.displayName === userName) && (
                            <p key={id}>
                                <button onClick={() => handleEdit(id, comment.text)}>
                                    Edit
                                </button>
                                <button onClick={() => {
                                    db.collection("posts")
                                        .doc(postId)
                                        .collection("comments")
                                        .doc(id)
                                        .delete();
                                }}>
                                    Delete
                                </button>
                            </p>
                        )
                    ))}
                </div>
            </div>
            {user && show && (
                <>
                    <form className="post__commentbox">
                        <input
                            className="post__input"
                            type="text"
                            placeholder="Edit Comment"
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                        />
                        <button
                            className="post__button"
                            disabled={!editComment}
                            type="submit"
                            onClick={updateComment}
                        >
                            Update
                        </button>
                    </form>
                </>
            )}
            {user && (
                <form className="post__commentbox">
                    <input
                        className="post__input"
                        type="text"
                        placeholder="Add a Comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                        className="post__button"
                        disabled={!newComment}
                        type="submit"
                        onClick={postComment}
                    >
                        Comment
                    </button>
                </form>
            )}
        </div>
    );
}

export default Posts;
