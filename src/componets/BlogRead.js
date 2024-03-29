import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useUserContext } from '../context/userStates';

import CommentPage from './CommentPage';






const BlogRead = () => {


    const context = useUserContext();
    const { readPost } = context;
    const [data, setData] = useState('');



    const { postId } = useParams();

    const fetchData = async () => {
        try {
            const { result } = await readPost(postId);
            setData(result);

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchData();


    }, [postId]);


    return (
        <div>
            {data && (
                <>
                    <div className="card w-100 mb-3 design4">
                        <div className="col-md-8 w-100">
                            <div className="card-body">
                                {data.images && data.images.length > 0 && (
                                    <div className='card-body'>
                                        <h1 className='mx-4 my-3 '>{data.title}</h1>
                                        {/* {data.images.map((image, index) => (
                                            <img className="blogreadimage" key={index} src={`https://hopestone.onrender.com/uploads/2024/1/${image}`} alt="" />
                                        ))} */}
                                        <h3 className='my-4 title'>{data.categories}</h3>
                                        {data && data.createdBy && (
                                            <div>
                                                <div dangerouslySetInnerHTML={{ __html: data.description }} />
                                                <p className="card-text">
                                                    <b> {data.createdBy.name} </b>published at {data.createdAt}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <CommentPage postId={data._id} />
                </>
            )}
        </div>
    );
};

export default BlogRead;