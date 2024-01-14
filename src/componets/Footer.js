import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'


const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer">
                    <div className="footpanel">
                        <ul>
                            <p className="w h">
                                <Link className={`nav-link `} to="/About">About</Link>
                            </p>


                            <li className="h"> Legal Notices</li>
                            <li className="h">Privacy Notices</li>
                            <li className="h">Security Information</li>
                            <li className="h">Trust Center</li>
                        </ul>
                    </div>
                    <div className="footpanel">
                        <ul>
                            <p className="w h">Support</p>
                            <li className="h">Contact Us</li>
                            <li className="h">Customer Portal</li>

                        </ul>
                    </div>
                    <div className="footpanel">
                        <div className="imdiv">
                            <ul>
                                <p className="w h">Social</p>
                                <div className="d">
                                    <li className="h p"><i className="fa fa-github h"></i><Link
                                        to="https://github.com/ajay8182831490">github</Link></li>
                                </div>

                                <div className="d">
                                    <li className="h p"><i className="fa fa-linkedin h"></i> <Link
                                        to="https://www.linkedin.com/in/abhiajay-gupta/">linkedin</Link></li>
                                </div>
                                <div className="d">
                                    <li className="h p"><i className="fa fa-youtube h"></i><Link
                                        to="https://www.youtube.com/watch">Youtube</Link></li>
                                </div>
                                <div className="d">
                                    <li className="h p"><i className="fa fa-twitter h"></i><Link
                                        to="https://twitter.com/twitter">Twitter</Link></li>
                                </div>

                                <div className="d">
                                    <li className="h p"><i className="fa fa-facebook h"></i> <Link
                                        to="https://www.facebook.com/profile.php?id=100022149935080">Facebook</Link></li>
                                </div>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className="foot1">
                    <div className="pages">
                        <Link to="">Contidions of Use</Link>
                        <Link>
                            Privacy Policy</Link><Link>
                            Your Ads Privacy Choices</Link>
                        <div className="copyright">
                            © 2024, Blog.com, Inc. or its affiliates
                        </div>


                    </div>
                </div>

            </footer >




        </>

    )
}

export default Footer
