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
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Enter a Password</label>
                    <input type="password" className="form-control" id="password" name='password' aria-describedby="emailHelp" onChange={onChange} />

                </div>





                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default DeleteAccount
