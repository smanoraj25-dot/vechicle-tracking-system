
import { Link } from "react-router-dom"
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import "./Mobilenav.css"
const Mobilenav = ({isLogin,setSearchtoggle,searchtoggle}) => {
    return (
        <>
            <div className="mob-nav-fts d-md-none d-block">
                <ul className="nav-mob-ul-bt">
                    <li className="stick-mob-nav-item"><Link to="/#" className="stick-mob-nav-link"> <AiOutlineHome/>Home</Link></li>
                    <li className="stick-mob-nav-item"><Link to="/product#"  className="stick-mob-nav-link"> <MdOutlineShoppingBag/>Shop</Link></li>
                    <li className="stick-mob-nav-item"><p onClick={() => setSearchtoggle(!searchtoggle)} className="stick-mob-nav-link"> <IoSearch/>Search</p></li>
                    <li className="stick-mob-nav-item"><Link  to={!isLogin?"/login":"/Account"}  className="stick-mob-nav-link"> <FaRegUserCircle/>Account</Link></li>
                </ul>
            </div>
        </>
    )
}

export default Mobilenav
