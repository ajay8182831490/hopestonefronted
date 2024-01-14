import React from 'react';
import { Link } from 'react-router-dom';



const Myaccount = () => {
    return (
        <>

            <div className="card h-25" style={{ "width": "18rem" }} >
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


            </div>


        </>
    )
}

export default Myaccount
