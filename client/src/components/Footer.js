import React, { useState } from 'react';
import './Footer.css'
import {Link} from 'react-router-dom'

import logo from '../assets/images/logo.svg'
import facebook from '../assets/icons/facebook.svg'
import twitter from '../assets/icons/twitter.svg'
import rocket from '../assets/icons/rocket.svg'
import youtube from '../assets/icons/youtube.svg'

import instagram from '../assets/icons/instagram-t.svg'
import bkash from '../assets/icons/bkash.svg'
import dbbl from '../assets/icons/cc-dbbl.svg'
import master from '../assets/icons/Master.svg'
import visa from '../assets/icons/Visa.svg'
import cashOnDelivery from '../assets/icons/cash-on-delivery.svg'



const Footer = () => {
    const [email, setEmail] = useState('')
    return (
            <div className="footer my_bg">
                <div className="footer__content">

                    {/* footer top starts */}
                    <div className="footer__top ">
                        <div className="footer__topSocial">
                            <div className="footer__topSocialLogo">
                                <img src={logo} alt=""/>
                            </div>
                            <div className="footer__topSocialIcons">
                                <Link to=""><img src={facebook} alt=""/></Link>
                                <Link to=""><img src={twitter} alt=""/></Link>
                                <Link to=""><img src={instagram} alt=""/></Link>
                                <Link to=""><img src={youtube} alt=""/></Link>
                            </div>
                        </div>
                        <div className="footer__topAboutUs d-flex flex-column">
                            <h5>About Us</h5>
                            <Link to="">Branches & Pickup </Link>
                            <Link to="">Points</Link>
                            <Link to="">Warranty</Link>
                            <Link to="">EMI</Link>
                            <Link to="">Cookie Policy</Link>
                        </div>
                        <div className="footer__topOrderProcedure d-flex flex-column">
                            <h5>Order Procedure</h5>
                            <Link to="">Return & Refund</Link>
                            <Link to="">Policy</Link>
                            <Link to="">Payment Method</Link>
                            <Link to="">Terms & Conditions</Link>
                            <Link to="">Privacy Policy</Link>
                        </div>
                        <div className="footer__topContactUs d-flex flex-column">
                            <h5>Contact Us</h5>
                            <span>Head Office</span>
                            <span>Authentic Web</span>
                            <span>Cumilla, Bangladesh</span>
                            <span>Email: demo@gmail.com</span>
                            <span>+01122334455</span>
                        </div>
                    </div>
                    {/* footer top ends */}


                    {/* footer bottom starts*/}
                    <div className="footer__bottom">
                        <h3>Pay With</h3>
                        <div className="footer__bottomPaymentIcons">
                            <img src={bkash} alt=""/>
                            <img src={rocket} alt=""/>
                            <img src={dbbl} alt=""/>
                            <img src={master} alt=""/>
                            <img src={visa} alt=""/>
                            <img src={cashOnDelivery} alt=""/>
                        </div>
                        <div className="footer__bottomCopywrite">
                            <p>Copyright © 2021. All Rights Reserved.</p>
                        </div>
                    </div>
                    {/* footer bottom ends */}

                </div>
            </div>
    );
}

export default Footer;

