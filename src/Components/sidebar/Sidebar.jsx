import { Offcanvas } from "react-bootstrap";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ul className="sidebar-nav">
          <li>
            <Link to="/" onClick={handleClose}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={handleClose}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={handleClose}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={handleClose}>
              Contact Us
            </Link>
          </li>
          <li className="sidebar-wishlist">
            <Link to="/wishlist" onClick={handleClose}>
              <AiOutlineHeart /> Wishlist
            </Link>
          </li>
        </ul>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;