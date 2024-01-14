import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
    let history = useNavigate();
    const [images, setImages] = useState('');

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


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password } = credentials;

        const formData = new FormData();
        formData.append('email', email);
        formData.append('name', name);
        formData.append('password', password);

        // Append each file to the FormData
        for (const image of images) {
            formData.append('images', image);

        }


        const response = await fetch("https://hopestone.onrender.com/v1/Signup", {
            method: 'POST',

            body: formData
        });
        const json = await response.json()




        //  console.log(json.authtoken);c\


        // Save the auth token and redirect
        if (json.success) {

            notify(json.msg)
            history('/Verify');

        }
        else {
            notifyFalse(json.msg);
            history('/login');
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
        <div>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' minLength={5} required onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">image</label>
                    <input type="file" className="form-control" id="image" name='image' required onChange={onChange} />
                </div>


                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup