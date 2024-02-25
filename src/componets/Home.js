import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userStates';
import _ from 'lodash';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    let history = useNavigate();
    const context = useUserContext();
    const { allPost } = context;
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    // useNavigate hook to navigate programmatically
    const [loading, setLoading] = useState(true);
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


    const fetchData = async () => {
        try {
            const { result } = await allPost();
            setData(result);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };
    const truncateCategories = (text, maxLength) => {
        const words = text.split(' ');
        if (words.length > maxLength) {
            return words.slice(0, maxLength).join(' ');
        } else {
            return text;
        }
    };

    useEffect(() => {
        fetchData();
    }, [allPost]);

    const maxWordsToShow = 150;

    const truncateDescription = (description) => {
        const words = description.split(' ');
        return words.slice(0, maxWordsToShow).join(' ');
    };



    const handleSearch = () => {
        // Filter the data based on the search term
        const filteredData = data.filter(
            (post) =>
                post.createdBy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filteredData.length === 0) {
            history('/');
            setSearchTerm('');
            notifyFalse("NO POST FOUND")




        }
        else {

            setData(filteredData);
        }
    };
    return (
        <>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <input
                    type="text"
                    placeholder="Search by title name or creator name"
                    value={searchTerm}
                    style={{ width: 'calc(60% - 10px)', borderRadius: '10px', textAlign: 'center', marginRight: '0' }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className='btt btn-primary' style={{ borderRadius: '10px' }} onClick={handleSearch}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
            <div className="content-container">
                <div className="d-flex flex-wrap justify-content-around">
                    {loading ? (
                        <h3>Loading...(first time takes some time to fetch tha data from server)</h3>
                    ) : (
                        data.map((post, index) => (
                            <div className="card m-2 form3" style={{ width: '300px' }} key={post._id}>
                                <img
                                    className="blogimage"
                                    key={index}
                                    src={`https://hopestone.onrender.com/uploads/2024/1/${post.images}`}
                                    alt=""
                                />
                                <div className="card-body">
                                    <Link to={`/Myblog/read/${encodeURIComponent(post._id)}`} style={{ color: 'red', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }}>{post.title}</Link>
                                    <p>
                                        <b>{truncateCategories(post.categories, 25)}</b><span>
                                            <Link to={`/Myblog/read/${encodeURIComponent(post._id)}`} style={{ color: 'green', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }}>Read More..</Link>
                                        </span>
                                    </p>
                                    {post && post.createdBy && (
                                        <p>Author <b>{post.createdBy.name}</b></p>)}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </>
    );
};

export default Home;