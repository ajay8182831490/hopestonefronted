import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/userStates';

const Home = () => {
    const context = useUserContext();
    const { allPost, getUser } = context;
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            // Fetch all posts
            const { result: postResult } = await allPost();
            setData(postResult);

            // Fetch user data

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };
    const fetchUser = async () => {
        try {
            // Fetch all posts


            // Fetch user data
            const userData = await getUser();
            setUser(userData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    useEffect(() => {
        fetchData();
        fetchUser();
    }, []);

    const maxWordsToShow = 20;

    const truncateDescription = (description) => {
        const words = description.split(' ');
        return words.slice(0, maxWordsToShow).join(' ');
    };

    const handleSearch = () => {
        const filteredData = data.filter(
            (post) =>
                post.createdBy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setData(filteredData);
    };
    const truncateCategories = (text, maxLength) => {
        const words = text.split(' ');
        if (words.length > maxLength) {
            return words.slice(0, maxLength).join(' ') + '...';
        } else {
            return text;
        }
    };

    return (
        <>
            <div className=" design">
                <div className='card'>
                    <input
                        type="text"
                        placeholder="Search by creator name or title"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div className="container">
                <div className="d-flex flex-wrap justify-content-around">

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        data &&
                        data.map((post, index) => (
                            <div className="card m-2" style={{ width: '300px' }} key={post._id}>
                                <img
                                    className="blogimage"
                                    key={index}
                                    src={`https://hopestone.onrender.com/uploads/2024/1/${post.images}`}
                                    alt=""
                                />
                                <div className="card-body">

                                    {post && post.createdBy && (

                                        <p>Published By  <b> {post.createdBy.name}</b></p>)}
                                    <Link to={`/Myblog/read/${encodeURIComponent(post._id)}`}>{post.title}</Link>
                                    <p>
                                        <b>{truncateCategories(post.categories, 15)}</b>
                                    </p>
                                    <Link to={`/Myblog/read/${encodeURIComponent(post._id)}`}>Read More</Link>
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
