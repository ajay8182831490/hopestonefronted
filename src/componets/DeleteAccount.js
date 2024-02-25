import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteAccount = () => {
    let history = useNavigate();
    const [credentials, setCredentials] = useState({ password: "" });
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

    if (!isLoggedIn) {
        history('/login');
        notifyFalse('Unauthorized access. Please log in to update your password.');
        // Redirect to home page after showing the notification
        // You can choose not to render anything else after the redirect
        return null
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        const { password } = credentials;









        const response = await fetch("https://hopestone.onrender.com/v1/user/accountDelete", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ password })
        });
        const json = await response.json()
        if (json.success) {
            localStorage.removeItem('token');
            notify(json.msg);
            history('/signup');
        } else {
            notifyFalse(json.msg);
            history('/Myaccount')
        }








    }

    const onChange = (e) => {


        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }
    return (
        <div className='design'>
            <div className="form">
                <h3 style={{ color: 'black', margin: '3px' }}>Delete Account</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Enter a Password</label>
                        <input type="password" className="form-control" id="password" placeholder='Enter a Password' name='password' aria-describedby="emailHelp" onChange={onChange} />

                    </div>





                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default DeleteAccount
