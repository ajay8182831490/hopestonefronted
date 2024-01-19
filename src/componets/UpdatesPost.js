import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../context/userStates';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdatesPost = () => {
    const context = useUserContext();
    const { readPost } = context;
    const [data, setData] = useState('');

    const [credentials, setCredentials] = useState({ title: '', categories: '', description: '' });
    const [images, setImages] = useState('');
    const history = useNavigate();
    const { postId } = useParams();

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
            const result = await readPost(postId);
            setData(result);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };



    useEffect(() => {
        if (data.result) {
            setCredentials({
                title: data.result.title,
                categories: data.result.categories || '',
                description: data.result.description || '',
            });

            setImages(data.result.images || []);
        }
    }, [data.result]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { title, categories } = credentials;
        const description = credentials.description;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('categories', categories);

        // Append each file to the FormData
        for (const image of images) {
            formData.append('images', image);
        }

        const response = await fetch(`https://hopestone.onrender.com/v1/user/post/updatePost/${postId}`, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: formData,
        });

        const json = await response.json();

        if (json.success) {
            notify(json.msg);
            history('/Myblog');
        } else {
            notifyFalse(json.msg);
            history(`/Myblog/Update/${postId}`);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onChange = (e) => {
        const { name, value, type, files } = e.target;


        if (type === 'file') {
            // Handle file input
            setImages([...files]); // Update images with the selected files
        } else {
            // Handle non-file inputs
            setCredentials({ ...credentials, [name]: value });
        }
    }

    const handleDescriptionChange = (value) => {

        setCredentials({ ...credentials, description: value });
    };

    return (
        <div className="createblog">
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        placeholder="Enter title name"
                        value={credentials.title}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="categories" className="form-label">
                        Heading
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="categories"
                        name="categories"
                        placeholder="Enter a heading name"
                        value={credentials.categories}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Image
                    </label>
                    <input
                        multiple
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        placeholder="Select image"
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">
                        Description
                    </label>
                    <ReactQuill theme="snow" value={credentials.description} onChange={handleDescriptionChange} />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdatesPost;
