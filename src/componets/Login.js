import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useNavigate();
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

    const handleSubmit = async (e) => {
        e.preventDefault();



        const { email, password } = credentials;


        const response = await fetch("https://hopestone.onrender.com/v1/login/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json()







        //  console.log(json.authtoken);c\


        // Save the auth token and redirect
        if (json.success && json.isVerified && json.exist) {


            localStorage.setItem('token', json.accessToken);

            notify("Logged successfully");


            history('/');

        }
        else if (json.success && !json.isVerified && json.exist) {
            notifyFalse("Please Verify the accoout")
            history('/Verify')
        }
        else if (!json.success && json.exist) {
            notifyFalse(json.msg);
            history('/login');


        }
        else {
            notifyFalse(json.msg);
            history('/signup');
        }



    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='design'>

            <div className="form">
                <h3 style={{ color: 'black' }}> Login to Account</h3>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' minLength={5} required onChange={onChange} />
                    </div>



                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                <>don"t have account?</> <span className='span' ><Link to="/signup" style={{ color: 'black', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }}>Signup</Link></span>

                <p><span className='span'><Link to="/forgetPassword" style={{ color: 'black', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }}>Forget Password</Link></span></p>
            </div>
        </div>
    )
}

export default Login
