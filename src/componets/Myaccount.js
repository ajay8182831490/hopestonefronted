import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Myaccount = () => {

    const history = useNavigate();

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
    return (
        <>
            <div className="design">
                {/* <div className="card h-25 design" style={{ "width": "18rem" }} >
                    <div className="card-header text-center">
                        YOUR ACCOUNT
                    </div>
                    <ul className="list-group-item list-group-item-action list-group-item-success text-center ">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/Myblog">My BLOG</Link>
                        </li>
                    </ul>
                    <ul className="list-group-item list-group-item-action list-group-item-success text-center">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/updateUser">Update Profile</Link>
                        </li>
                    </ul>
                    <ul className="list-group-item list-group-item-action list-group-item-success text-center">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/updatePassword">Update Password</Link>
                        </li>
                    </ul>
                    <ul className="list-group-item list-group-item-action list-group-item-success text-center">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/deleteAccount">Delete Account</Link>
                        </li>
                    </ul>


                </div> */}

                <div className="form ">
                    <h3>My Account</h3>
                    <div className="my-3">
                        <Link className="nav-link" aria-current="page" to="/Myblog" style={{ color: 'black', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }}>My BLOG</Link></div>
                    <Link className="nav-link" aria-current="page" to="/updateUser" style={{ color: 'black', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }}>Update Profile</Link>
                    <div className=" my-3"> <Link className="nav-link" aria-current="page" to="/updatePassword" style={{ color: 'black', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }}>Update Password</Link></div>
                    <div className=" my-3"><Link className="nav-link" aria-current="page" to="/deleteAccount" style={{ color: 'black', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none' }}>Delete Account</Link></div>
                </div>
            </div>


        </>
    )
}

export default Myaccount
