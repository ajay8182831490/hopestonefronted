// ResetPasswordPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    // Extract the token from the URL
    const [token, setToken] = useState('');
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





    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        setToken(token);

    }, [location.search]);
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleResetPassword = async () => {
        try {

            const response = await fetch(`https://hopestone.onrender.com/v1/user/resetPassword/?token=${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });
            const json = await response.json();




            if (response.ok) {
                // Password reset successful, navigate to login page or a success page
                notify(json.msg);
                navigate('/');
            } else {
                notifyFalse(json.msg);
                console.error('Password reset failed');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    return (
        <div className="design">
            <div className='form'>
                <h2 style={{ color: 'black' }}>Reset Password</h2>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label"> New Password</label>
                    <input type="password" className="form-control" id="password" name='password' minLength={5} required onChange={handlePasswordChange} />
                </div>
                <div className="button">
                    <button className='btn btn-primary' onClick={handleResetPassword}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
