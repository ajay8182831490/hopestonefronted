import React from 'react'
import ReactQuill from 'react-quill';
import { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Createblog = () => {
    const [value, setValue] = useState('');

    let history = useNavigate();
    const notify = () => toast.success(' Blog Added successfully!', {
        position: "top-right",
        autoClose: 5000,
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
    const notify1 = () => toast.error(" Something error plaese try after some time");



    const [credentials, setCredentials] = useState({ title: "", categories: "" })


    const [images, setImages] = useState('');

    const isLoggedIn = localStorage.getItem('token');


    useEffect(() => {
        if (!isLoggedIn) {
            // Redirect to login page after showing the notification
            history('/login');
            notifyFalse('Unauthorized access. Please log in to update your password.');
            // You can choose not to render anything else after the redirect
            return;
        }


    }, [isLoggedIn]);




    const handleSubmit = async (e) => {
        e.preventDefault();

        const { title, categories } = credentials;
        const description = value;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('categories', categories);


        for (const image of images) {
            formData.append('images', image);
        }

        const response = await fetch("https://hopestone.onrender.com/v1/user/post/newPost", {
            method: 'POST',
            headers: {

                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: formData,
        });
        const json = await response.json()








        if (json.success) {
            notify();







            history('/');

        }
        else {
            notify1();
            history('/Createblog')
        }



    }

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
    return (
        /* 
             <h1>this is craete blog</h1>
             <input type="text" />
             <ReactQuill theme="snow" value={value} onChange={setValue} />;
 
      */
        <div className='createblog'>
            <div className="form1">
                <h3 style={{ color: 'black', margin: '3px', textAlign: 'center' }}>Create  a Blog</h3>
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' placeholder="title name" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categories" className="form-label">Heading</label>
                        <input type="text" className="form-control" id="categories" name='categories' placeholder="Heading" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image</label>
                        <input type="file" className="form-control" id="image" name='image' placeholder="select image" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>

                        <ReactQuill theme="snow" value={value} onChange={setValue} />

                    </div>
                    <div className="button">

                        <button type="submit" className="btn btn-primary ">Submit</button>
                    </div>
                </form >
            </div>

        </div>
    )
}

export default Createblog
