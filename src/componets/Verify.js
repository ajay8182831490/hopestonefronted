import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Verify = () => {
    const [credentials, setCredentials] = useState({ email: "", otp: "" })
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

        const { email, otp } = credentials;



        const response = await fetch("https://hopestone.onrender.com/v1/verify", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, otp })
        });

        if (!response.ok) {
            console.error('Verification failed:', response.status, response.statusText);
            // Handle error and provide feedback to the user
        }
        const json = await response.json()





        //  console.log(json.authtoken);c\


        // Save the auth token and redirect
        if (json.success) {
            notify(json.msg);

            history('/Login');

        }
        else {
            notifyFalse(json.msg);
            history('/Verify')
        }



    }
    const handleResendOTP = async () => {
        const { email } = credentials;

        const response = await fetch("https://hopestone.onrender.com/v1/resendOTP", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (!response.ok) {
            console.error('Resending OTP failed:', response.status, response.statusText);
            // Handle error and provide feedback to the user
        }

        const json = await response.json();

        if (json.success) {
            notify(json.msg);
        } else {
            notifyFalse(json.msg);
        }
    };



    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (

        <div className='design'>
            <div className="form">
                <h3 style={{ color: 'black', margin: '3px' }}>Verify Account</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">OTP</label>
                        <input type="password" className="form-control" id="otp" name='otp' minLength={6} required onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <span>
                        <button type="button" className="btn btn-dark mx-3" onClick={handleResendOTP}>Resend OTP</button></span>
                </form>
            </div>
        </div>

    )
}

export default Verify
