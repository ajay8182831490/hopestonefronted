import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userStates';
import './MyBlog.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Myblog = () => {
    const context = useUserContext();
    const { getUser, deletePost } = context;

    const [post, setPost] = useState([]);
    const history = useNavigate();
    const notify = (msg) => toast.success(msg, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"

    });
    const notifyFalse = (msg) => toast.error(msg, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"

    });
    const isLoggedIn = localStorage.getItem('token');

    useEffect(() => {
        if (!isLoggedIn) {

            history('/login');
            notifyFalse('Unauthorized access. Please log in to update your password.');

            return;
        }


    }, [isLoggedIn]);

    const fetchData = async () => {
        try {
            const result = await getUser();


            setPost(result.postIds);

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };



    const handleDeletePost = async (postId) => {
        try {
            await deletePost(postId);
            fetchData(); // Fetch updated data after deletion
            // Redirect to the homepage
            notify("post is deleted successfully");
            history('/MyBlog');
        } catch (error) {
            notifyFalse('something error !!Please try again after some time');
            console.error('Error deleting post:', error);
        }
    };
    useEffect(() => {
        fetchData();

    }, [getUser]);

    return (
        <>




            <div className="container">
                <h2>My Blog</h2>
                <div className="d-flex flex-wrap justify-content-around ">
                    {Array.isArray(post) && post.length > 0 ? (
                        post.map((post) => (
                            <div className="card m-2 design3" key={post._id}>

                                <p><b>{post.title}</b></p>

                                <div className="">
                                    <Link
                                        style={{ color: 'green', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }}
                                        to={`/Myblog/read/${encodeURIComponent(post._id)}`}
                                        role="button"
                                    >
                                        Read More
                                    </Link>
                                    <Link
                                        style={{ color: 'green', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none', margin: '5px' }}
                                        to={`/Myblog/Update/${encodeURIComponent(post._id)}`}
                                        role="button"
                                    >
                                        Update
                                    </Link>

                                    <button
                                        type="button"
                                        className="btn btn-danger mx-3 mb-2"
                                        onClick={() => handleDeletePost(post._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No posts available.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Myblog
