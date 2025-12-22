import { memo, useCallback } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../features/products/WishlistSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Items = ({ prdts }) => {
  const API_URL = import.meta.env.VITE_BACKENDURL;
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const navigate = useNavigate();
  const { isLogin, user } = useSelector((state) => state.auth);
  const isWishlisted = wishlist.some((item) => item.product_id === prdts.id);

  const handleClick = useCallback(() => {
    navigate(`/product-details/${prdts.id}`);
  }, [navigate, prdts.id]);

  const toggleWishlist = useCallback(async () => {
    try {
      if (isWishlisted) {
        dispatch(removeFromWishlist({ product_id: prdts.id }));
        if (isLogin) {
          await axios.delete(`${API_URL}/api/wishlist/remove`, {
            data: {
              userId: user.id,
              productId: prdts.id,
            },
          });
        }
        toast.success("Removed from Wishlist ❤");
      } else {
        dispatch(addToWishlist({ product_id: prdts.id }));
        if (isLogin) {
          await axios.post(`${API_URL}/api/wishlist/add`, {
            userId: user.id,
            productId: prdts.id,
          });
        }
        toast.success("Added to Wishlist ❤");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  }, [isWishlisted, dispatch, prdts.id, isLogin, user, API_URL]);

  return prdts ? (
    <div className="product-card">
      <div className="wishlist-icon" onClick={toggleWishlist}>
        <FaHeart className={isWishlisted ? "wishlist-heart" : ""} />
      </div>
      <div className="product-img" onClick={handleClick}>
        <LazyLoadImage
          src={prdts?.images[0]?.url}
          alt="Aila organza"
          effect="blur"
          placeholderSrc="/path/to/your/placeholder.jpg" // Add a placeholder image
          className="img-fluid"
        />
      </div>
      <div className="product-info">
        <h3 className="product-title popup_cart_title">{prdts.name}</h3>
        <div>
          <p className="truncate">{prdts.description}</p>
        </div>
        <div className="product-price">
          <span className="normal-price">INR {(Number(prdts.price)).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
        </div>
        <div>
          <button className="add-to-cart-btn" onClick={handleClick} style={{ background: "#ff6f61" }}>
            {"view more"}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>loading</div>
  );
};

export default memo(Items);
