import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userStates';
import Comment from './Comment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommentPage = (props) => {
    const context = useUserContext();
    const { getUser, createComment, deleteComment } = context;
    const notify = (msg) => toast.success(msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"

    });

    const history = useNavigate();
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState("");

    const fetchComments = async (postId) => {
        try {
            const response = await fetch(`https://hopestone.onrender.com/v1/post/comment/${postId}`);
            const data = await response.json();

            console.log("comment", data);
            setComments(data);

        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    const fetchUser = async () => {
        try {

            const result = await getUser();
            setUser(result);
            console.log("user", result);



        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleCommentSubmit = async (content) => {
        try {
            const result = await createComment(props.postId, content);


            notify(result.msg);

            // Redirect to the same post
            history(`/MyBlog/read/${props.postId}`);
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleCommentDelete = async (commentId) => {
        try {
            await deleteComment(commentId);
            setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
            notify("comment deleted successfully");
            history(`/MyBlog/read/${props.postId}`);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    useEffect(() => {

        fetchComments(props.postId);
        fetchUser();
    }, [props.postId, createComment]);

    return (
        <div>
            <h2>Comments</h2>

            {user ? (
                <>
                    <Comment onSubmit={handleCommentSubmit} />
                </>
            ) : (
                <p>Login to leave a comment</p>
            )}





            {/* /*<div className="card w-100 scroll-box">
                {
                    comments ? (
                        <h3>Read a comment</h3>
                        <div className="comment-container">
                            {Array.isArray(comments) &&
                                comments.map((comment) => (
                                    <div key={comment._id} className="comment">
                                        <img
                                            className="profileimage"
                                            src={`https://hopestone.onrender.com/uploads/2024/1/${comment.user.UserId.image}`}
                                            alt=""
                                        />
                                        <h5>
                                            <span>{comment.user.UserId.name}</span>
                                            <b> {comment.createdAt}</b>
                                        </h5>
                                        <p>
                                            <b>{comment.content}</b>
                                            {getUser && comment.user.UserId._id === getUser._id && (
                                                <button onClick={() => handleCommentDelete(comment._id)}>Delete</button>
                                            )}
                                        </p>
                                    </div>
                                ))}
                        </div>) : (<p>No comment</p>)}
            </div>*/ }



            <div className="card w-100 scroll-box">
                <h3>Read a comment</h3>
                <div className="comment-container">
                    {Array.isArray(comments) && comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment._id} className="comment">
                                <img
                                    className="profileimage"
                                    src={`https://hopestone.onrender.com/uploads/2024/1/${comment.user.UserId.image}`}
                                    alt=""
                                />
                                <h5>
                                    <span>{comment.user.UserId.name}</span>
                                    <b> {comment.createdAt}</b>
                                </h5>
                                <p>
                                    <b>{comment.content}</b>
                                    {user && comment.user.UserId._id === user._id && (
                                        <button onClick={() => handleCommentDelete(comment._id)}>Delete</button>
                                    )}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No comments</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentPage;
