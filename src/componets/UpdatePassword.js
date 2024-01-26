import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdatePassword = () => {
    const history = useNavigate();
    const [credentials, setCredentials] = useState({ password: "", newPassword: "" });
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

    useEffect(() => {
        if (!isLoggedIn) {
            // Redirect to login page after showing the notification
            history('/login');
            notifyFalse('Unauthorized access. Please log in to update your password.');

            return;
        }


    }, [isLoggedIn]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { password, newPassword } = credentials;









        const response = await fetch("https://hopestone.onrender.com/v1/user/updatePassword/", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ password, newPassword })
        });
        const json = await response.json()
        if (json.success) {
            notify(json.msg);
            history('/');
        } else {
            notifyFalse(json.msg);
            history('/updatePassword')
        }








    }

    const onChange = (e) => {


        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }



    return (


        <div className='design'>
            <div className="form">
                <h3 style={{ color: 'black', margin: '3px' }}>Update Password</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">old password here</label>
                        <input type="password" className="form-control" id="password" name='password' aria-describedby="emailHelp" onChange={onChange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">New password</label>
                        <input type="password" className="form-control" id="newPassword" name='newPassword' aria-describedby="emailHelp" onChange={onChange} />

                    </div>





                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>

    )
}
export default UpdatePassword
