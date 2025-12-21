
import { Link, NavLink } from "react-router-dom"
import { useState } from "react";
import { useSelector } from "react-redux";
import Mobilenav from "../mobilenav/Mobilenav";
//Css
import "../NavBar/Navbar.css";

//icons
import { FaRegUserCircle, FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { SiWhatsapp } from "react-icons/si";
import { BsInstagram } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
//images
import logo from "../../assets/images/logo-1.png"
import NavbarSearch from "../customsearch/search";

const Navbar = () => {
    const navigate = useNavigate();
    const wishlist = useSelector((state) => state.wishlist.wishlist.length);
    const addedcart = useSelector((state) => state.carts.carts.length);

    const [searchtoggle, setSearchtoggle] = useState(false)
    const [toggle, setToggle] = useState(false)
    const handelnavclose = () => { setToggle(!toggle) }
    const { isLogin } = useSelector((state) => state.auth);
    const handelNavigation = (itemcategory) => {
        navigate("/product", { state: { category: itemcategory } });
        // handelnavclose()
        setToggle(false)
    }

    return (
        <header>
            <Marquee />
            <nav className='nav-wrapper'>
                <div className="container nav-wrap-inner">
                    {searchtoggle &&
                        <NavbarSearch setSearchtoggle={setSearchtoggle} searchtoggle={searchtoggle}/>
                    }

                    <div className="row align-items-center">
                        <div className='col-md-4 col-2'>
                            <div className={`bg-mask d-md-none  ${toggle ? "d-block" : "d-none"}`}></div>
                            <ul className={`nav-ul-wrapper justify-content-start d-md-flex d-none `}>

                                <li className='nav-item'><NavLink to="https://wa.me/9159312346" onClick={handelnavclose} className='nav-link'><SiWhatsapp /></NavLink></li>
                                <li className='nav-item'><NavLink to="https://www.instagram.com/seelaikaari/" target="blank" onClick={handelnavclose} className='nav-link'><BsInstagram /></NavLink></li>
                                <li className='nav-item'><NavLink to="mailto:seelaikaari123@gmail.com" onClick={handelnavclose} className='nav-link'><MdEmail /></NavLink></li>
                            </ul>
                            <div className='d-md-none d-block'>
                                <button className='nav-toggle-btn' onClick={handelnavclose}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>
                            </div>
                        </div>
                        <div className='col-md-4 col-5 d-flex justify-content-center'>
                            <Link to="/" className='text-center'><img src={logo} alt="logo" className="logo-nav" /></Link>
                        </div>
                        <div className='col-md-4 col-5 text-end'>
                            <ul className='nav-ul-wrapper justify-content-end nav-c-icon'>
                                <li className='nav-item d-md-block d-none'><p className='nav-link' onClick={() => setSearchtoggle(!searchtoggle)}><FaSearch /></p></li>
                                <li className='nav-item d-md-block d-none'><Link to={!isLogin?"/login":"/Account"} className='nav-link '><FaRegUserCircle /></Link></li>
                                <li className='nav-item'><Link to="/cart" className='nav-link prod-count'><MdOutlineShoppingCart /> <span className="prod-count-num">{addedcart}</span></Link></li>
                                <li className='nav-item'><Link to="/wishlist" className='nav-link  prod-count'><FaRegHeart /> <span className="prod-count-num">{wishlist}</span></Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="nav-r2-wraper">
                        <ul className={`nav-ul-wrapper mon-nav-ul ${toggle ? "mob-toggles-show" : ""} `}>
                            <li className="mob-toggle-li d-md-none d-flex">
                                <Link to="/">
                                    <img src={logo} alt="logo" style={{ width: "200px" }} />
                                </Link>
                                <button className="mob-nav-close-btn" onClick={handelnavclose}><IoClose /></button>
                            </li>
                            <li className='nav-item'><NavLink to="/" onClick={handelnavclose} className='nav-link'>Home</NavLink></li>
                            <li className='nav-item'><NavLink to="/product" onClick={handelnavclose} className='nav-link'>Shop</NavLink></li>
                            <li className='nav-item nav-drop-parent'><p className='nav-link'>Sarees <IoIosArrowDown /></p>
                                <div className="pos-nav-drop">
                                    <ul className="nav-dropdown-ul nav-ul-wrapper ">
                                     <li className="nav-item"><p onClick={() => handelNavigation("vintage")} className="nav-link">Kanchipuram vintage Sarees</p></li>
                                        <li className="nav-item"><p onClick={() => handelNavigation("royal")} className="nav-link">Kanchipuram royal Sarees</p></li>
                                           <li className="nav-item"><p onClick={() => handelNavigation("traditional")} className="nav-link">Kanchipuram traditional Sarees</p></li>
                                              <li className="nav-item"><p onClick={() => handelNavigation("vairavosi")} className="nav-link">Kanchipuram vairavosi Sarees</p></li>
                                                 <li className="nav-item"><p onClick={() => handelNavigation("kattam")} className="nav-link">Kanchipuram kattam Sarees</p></li>
                                                    <li className="nav-item"><p onClick={() => handelNavigation("bridal")} className="nav-link">Kanchipuram bridal Sarees</p></li>
                                    </ul>
                                </div>
                            </li>
                            {/* <li className='nav-item nav-drop-parent'><p className='nav-link'>Shop by occasion <IoIosArrowDown /></p>
                                <div className="pos-nav-drop">
                                    <ul className="nav-dropdown-ul nav-ul-wrapper ">
                                        <li className="nav-item"><p onClick={() => handelNavigation("Wedding")} className="nav-link">Wedding / Reception</p></li>
                                        <li className="nav-item"><p onClick={() => handelNavigation("Engagement")} className="nav-link">Engagement</p></li>
                                        <li className="nav-item"><p onClick={() => handelNavigation("Haldi")} className="nav-link">
                                            Haldi / Mehendi</p></li>
                                        <li className="nav-item"><p onClick={() => handelNavigation("Sangeet")} className="nav-link">Sangeet and Cocktail</p></li>
                                        <li className="nav-item"><p onClick={() => handelNavigation("Wedding")} className="nav-link">Wedding Guest</p></li>
                                    </ul>
                                </div>
                            </li> */}
                            <li className='nav-item'><NavLink to="/contact" onClick={handelnavclose} className='nav-link'>Contact</NavLink></li>
                            <li className='nav-item nav-drop-parent'><p  className='nav-link'>About<IoIosArrowDown /></p>
                                <div className="pos-nav-drop">
                                    <ul className="nav-dropdown-ul nav-ul-wrapper ">
                                        <li className="nav-item"><Link to="/about" className="nav-link">About Seelaikaari</Link></li>
                                        <li className="nav-item"><Link to="/stories" className="nav-link">The Seelaikaari Story</Link></li>
                                    </ul>
                                </div></li>
                        </ul>
                    </div>
                </div>

            </nav>
                    <Mobilenav isLogin={isLogin} setSearchtoggle={setSearchtoggle} searchtoggle={searchtoggle} />
        </header>

    )
}

function Marquee() {
  return (
    <div className="marquee">
      <span>
        seelaikaari.com&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;Silk Sarees&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;Kanchivaram&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;Handloom Cotton&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;Bridal Collection&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;Free Shipping (Domestic Orders)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;International Shipping ₹2000&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;Limited Offer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;Trusted by 10,000+ Customers&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;Festive Collection&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;seelaikaari.com&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;Silk Sarees
    </span>
    </div>
  );
}





export default Navbar