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





    const location = useLocation();

    useEffect(() => {
        // Access the query parameters from the location object
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        // Now 'token' contains the value of the 'token' query parameter
        setToken(token);

        // You can use 'token' in your component logic (e.g., set it in state, make API calls, etc.)
    }, [location.search]);
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleResetPassword = async () => {
        try {
            // Make API call to reset password using the token and new password

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
                // Handle error (e.g., display error message to the user)
                notifyFalse(json.msg);
                console.error('Password reset failed');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    return (
        <div className="design">
            <div>
                <h2>Reset Password</h2>
                <label htmlFor="password">New Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button onClick={handleResetPassword}>Reset Password</button>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
