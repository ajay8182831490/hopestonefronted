import React from 'react'
//import './Footer.css'
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
                    <div className="footpanel -mx-3">
                        <div className="imdiv">
                            <ul>
                                <p className="w h color-white">Social</p>
                                <div className="d">
                                    <li className="h p"><i className="fa fa-github h"></i><Link style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', }}
                                        to="https://github.com/ajay8182831490">Github</Link></li>
                                </div>

                                <div className="d">
                                    <li className="h p"> <Link style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', }}
                                        to="https://www.linkedin.com/in/abhiajay-gupta/">Linkedin</Link></li>
                                </div>
                                <div className="d">
                                    <li className="h p"><i className="fa fa-youtube h"></i><Link style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', }}
                                        to="https://www.youtube.com/watch">Youtube</Link></li>
                                </div>
                                <div className="d">
                                    <li className="h p"><i className="fa fa-twitter h"></i><Link style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', }}
                                        to="https://twitter.com/twitter">Twitter</Link></li>
                                </div>

                                <div className="d">
                                    <li className="h p"><i className="fa fa-facebook h"></i> <Link style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', }}
                                        to="https://www.facebook.com/profile.php?id=100022149935080">Facebook</Link></li>
                                </div>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className="foot1">
                    <div className="pages">
                        <Link to="" style={{ color: 'green', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none', margin: '4px' }}>Contidions of Use</Link>
                        <Link style={{ color: 'green', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none', margin: '4px' }}>
                            Privacy Policy</Link><Link style={{ color: 'green', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none', margin: '4px' }}>
                            Your Ads Privacy Choices</Link>
                        <div className="copyright">
                            © 2024, Hopestone.com, Inc. or its affiliates
                        </div>


                    </div>
                </div>

            </footer >




        </>

    )
}

export default Footer
