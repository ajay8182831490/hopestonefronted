import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import { useUserContext } from '../context/userStates';

const Home = () => {
    const context = useUserContext();
    const { allPost } = context;
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    // useNavigate hook to navigate programmatically
    const [loading, setLoading] = useState(true);


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
        setData(filteredData);
    };

    return (
        <>
            <div className=' home-card'>




                <div className="position-static w-10 float-right">
                    <div className='card '>
                        <input
                            type="text"
                            placeholder="Search by creator name or title"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                </div>

                <div className="postbox w-90">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (data && data.map((post, index) => (















                        <div className="card w-90 mb-3" key={post._id}>

                            <div className="col-md-8 w-100">
                                <div className="card-body ">

                                    <img className="blogimage" key={index} src={`https://hopestone.onrender.com/uploads/2024/1/${post.images}`}
                                        alt=""></img>
                                </div>


                                <Link to={`/Myblog/read/${encodeURIComponent(post._id)}`}>{post.title}</Link>

                                <p>
                                    {/* // <b>Posted By </b> {post.createdBy.name} <span>{post.createdAt}</span> */}
                                </p>
                                <div dangerouslySetInnerHTML={{ __html: truncateDescription(post.description) }} /><span>......</span>
                                <Link to={`/Myblog/read/${encodeURIComponent(post._id)}`}>Read More</Link>




                            </div>
                        </div>

                    )))}





                </div>






            </div>




        </>
    );
};

export default Home;
