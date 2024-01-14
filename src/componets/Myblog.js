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
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"

    });
    const notifyFalse = (msg) => toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"

    });

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
            <div className="row my-3">
                <h2>My Blog</h2>
                {Array.isArray(post) && post.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {post.map((post, index) => (
                                <tr key={post._id}>
                                    <td>
                                        <span>{post.title}</span>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => handleDeletePost(post._id)}
                                        >
                                            Delete
                                        </button>
                                        <Link
                                            className="btn btn-primary"
                                            to={`/Myblog/Update/${encodeURIComponent(post._id)}`}
                                            role="button"
                                        >
                                            Update
                                        </Link>
                                        <Link
                                            className="btn btn-primary"
                                            to={`/Myblog/read/${encodeURIComponent(post._id)}`}
                                            role="button"
                                        >
                                            Read More
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (

                    <p>No posts available.</p>

                )}
            </div>
        </>
    )
}

export default Myblog
