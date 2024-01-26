import { Link, useNavigate } from "react-router-dom";


import { useUserContext } from '../context/userStates';
import { useState } from "react";
import { useEffect } from "react";


const Navbar = () => {


    const context = useUserContext();
    const { getUser, deletePost } = context;
    const [data, setData] = useState({});


    const history = useNavigate();



    const handleLogout = () => {
        localStorage.removeItem('token');
        history('/login');
    }
    const fetchData = async () => {
        try {
            const result = await getUser();
            setData(result);



        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    const isLoggedIn = localStorage.getItem('token');
    useEffect(() => {
        if (isLoggedIn) {

            fetchData();
        }
    });

    return (

        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src="./logo.jpeg" alt="" />Hopestone</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link className={`nav-link `} to="/About">About</Link>
                            </li>

                        </ul>


                        {isLoggedIn && (
                            <div className="d-flex">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className={`nav-link `} to="/Createblog">CREATE BLOG</Link>
                                    </li>
                                    <li className="nav-item">
                                        {data && data.name && (
                                            <Link className={`nav-link `} to="/Myaccount"> {`${data.name.split(' ')[0]}`}</Link>)}
                                    </li>

                                    <li className="nav-item">
                                        <button onClick={handleLogout} className="btn btn-primary">Logout</button>

                                    </li>
                                </ul>
                            </div>)
                        }



                        {!isLoggedIn && (
                            <div className="d-flex">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className={`nav-link `} to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link `} to="/signup">Signup</Link>
                                    </li>
                                </ul>
                            </div>)}





                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
