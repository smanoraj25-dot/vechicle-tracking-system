
import  {Link}  from "react-router-dom"
//images
import logo from "../../assets/images/logo-1.png"
import footerLogo from "../../assets/images/footer-logo.png"
//icons
import  {IoLocationSharp}  from "react-icons/io5";
import  {FaPhoneAlt}  from "react-icons/fa";
import  {MdEmail}  from "react-icons/md";
//css
import "../Footer/Footer.css";

const Footer = () => {
    return (
        <footer className="footer-wrapper">
            <div className="ft-row-1">
                <div className="container">
                        <div className="row row-gap-4">
                            <div className="col-md-5">
                                <Link to="/">
                                    <img src={logo} alt="" style={{width:"200px"}} />
                                </Link>
                                <ul className="footer-ul-l1">
                                <li><IoLocationSharp/> No 21, Soundara Pandian street, Ashok Nagar, Chennai 600083</li>
                                <li>
                                    <FaPhoneAlt />
                                    <a href="tel:+919159312346" className="ft-contact-link">+91-9159312346</a>
                                </li>
                                <li>
                                    <MdEmail />
                                    <a href="mailto:seelaikaari123@gmail.com" className="ft-contact-link">seelaikaari123@gmail.com</a>
                                </li>
                            </ul>
                            </div>
                            <div className="col-md-4">
                                <h4 className="title-ft">Quick Links</h4>
                                <ul className="ft-ul-wrapper">
                                    <li><Link to="/" className="ft-nav-link">Home</Link></li>
                                    <li><Link to="/about" className="ft-nav-link">About</Link></li>
                                    <li><Link to="/contact" className="ft-nav-link">Contact</Link></li>
                                    <li><Link to="/product" className="ft-nav-link">Shop</Link></li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <h4 className="title-ft">Customer Service</h4>
                                <ul className="ft-ul-wrapper">
                                    <li><Link to="/contact" className="ft-nav-link">Contact Us</Link></li>
                                    {/* <li><Link to="/terms-and-conditions" className="ft-nav-link">Terms of use</Link></li> */}
                                    <li><Link to="/policy" className="ft-nav-link">Privacy Policy</Link></li>
                                    <li><Link to="/payment-policy" className="ft-nav-link">Payment Policy</Link></li>
                                    <li><Link to="/shipping-policy" className="ft-nav-link">Shipping Policy</Link></li>
                                    <li><Link to="/return-exchange-policy" className="ft-nav-link">Returns,Refund & Exchange Policy</Link></li>
                                </ul>
                            </div>
                        </div>
                </div>  
            </div>
            <div className="ft-row-2">
              
                <div className="container foot-content ">
                    <div>
                        <img src={logo} alt="footerLogo" className="footerLogo" />
                    <a href="https://seelaikaari.com/" target="_blank" className="ft-copy">© 2025 Seelaikaari. All rights reserved.</a>
                    </div>
                    <div>
                        <img src={footerLogo} alt="footerLogo" className="footerLogo" />
                        <a href="https://slbdigitals.com/" target="_blank" className="ft-copy">Designed & Developed by Sai Logabala</a>
                    </div>
                </div>
            </div>
        
        </footer>
    )
}

export default Footer