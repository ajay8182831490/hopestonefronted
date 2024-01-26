import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/userStates';
import _ from 'lodash';

const Home = () => {
    const context = useUserContext();
    const { allPost } = context;
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [fetchComplete, setFetchComplete] = useState(false);

    const debouncedSearch = useRef(_.debounce(() => { }, 300));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { result: postResult } = await allPost();
                setData(postResult);
                setLoading(false);
                setFetchComplete(true);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
                setFetchComplete(true);
            }
        };

        fetchData();
    }, [allPost]);

    const maxWordsToShow = 30;

    const truncateDescription = (description) => {
        const words = description.split(' ');
        return words.slice(0, maxWordsToShow).join(' ');
    };

    const truncateCategories = (text, maxLength) => {
        const words = text.split(' ');
        if (words.length > maxLength) {
            return words.slice(0, maxLength).join(' ');
        } else {
            return text;
        }
    };

    const handleSearch = useCallback(() => {
        // Filtering is done in the render logic
    }, []);

    const handleSearchDebounced = useCallback(
        _.debounce(() => {
            setSearchTerm((prevSearchTerm) => {
                const filteredData = data.filter(
                    (post) =>
                        post.createdBy.name.toLowerCase().includes(prevSearchTerm.toLowerCase()) ||
                        post.title.toLowerCase().includes(prevSearchTerm.toLowerCase())
                );
                return prevSearchTerm;
            });
        }, 300),
        [data]
    );

    const filteredData = useMemo(() => {
        return searchTerm === '' ? data : data.filter(post =>
            post.createdBy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm]);

    useEffect(() => {
        handleSearchDebounced();
    }, [searchTerm, handleSearchDebounced]);

    return (
        <>
            <div className="container">
                <div className="search-container" style={{ display: 'flex', alignItems: 'center' }}>
                    <div className='search'>
                        <input
                            type="text"
                            placeholder="Search by title name or creator name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className='btt btn-primary' onClick={handleSearchDebounced}><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div className="content-container">
                    <div className="d-flex flex-wrap justify-content-around">
                        {loading ? (
                            <h3>Loading...(first time takes some time)</h3>
                        ) : !fetchComplete ? (
                            <h3>Loading data...</h3>
                        ) : (
                            filteredData.map((post, index) => (
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
            </div>
        </>
    );
};

export default Home;
