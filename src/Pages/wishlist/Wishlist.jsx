import { Link } from "react-router-dom";
// Images
import emptyWishlist from "../../assets/images/wishlist/empty-wishlist.png"
import "../wishlist/Wishlist.css";
import { MdOutlineCurrencyRupee, MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../features/products/WishlistSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addToCart } from "../../features/products/AddtoCardSlice";

const api = import.meta.env.VITE_BACKENDURL;

const Wishlist = () => {

  const navigate = useNavigate();
  const handleClick = (item) => {
    navigate("/product-details", { state: { product: item } });
  };
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { products } = useSelector((state) => state.products);
  const { isLogin, user } = useSelector((state) => state.auth);
  const addedcart = useSelector((state) => state.carts.carts);

  const handleRemoveClick = async (id) => {
     try{

        dispatch(removeFromWishlist({product_id:id}));

        if(isLogin) {
          await axios.delete(`${api}/api/wishlist/remove`, {
            data: {
              userId: user.id,
              productId:id,
            },
          });
        }

        toast.error("Removed from Wishlist ❤");
    
    }catch (error) {

        toast.error("An error occurred. Please try again.");
    }
  };

  const wishlistProducts = products.filter((product) =>
    wishlist.some((item) => item.product_id === product.id)
  );

  const isCartItem = (item) => {
    return addedcart.some(cart => cart.product_id === item?.id);
  };
 
  const handleAddtoCard = async (item) => {
    
    dispatch(addToCart({ product_id: item?.id }));
    try {
        if (isLogin && !isCartItem(item)) {
        
          await axios.post(`${api}/api/addtocart/add`, {
            userId: user?.id,
            productId: item?.id,
          });
  
          toast.success("Added to cart ❤");
          navigate("/cart", { state: { product: item } });
        } else {
          navigate("/cart", { state: { product: item } });
        }
    } catch (error) {
        console.log("err :", error);
    }
  };
  return (
    <>
      {wishlist && wishlist.length > 0 ? (
        <section className="wishlist-sec-1-wrapper">
          <div className="container">
            <h2 className="wlist-ht">Wishlist Products ({wishlist.length})</h2>
            <div className="row wishlist-inner-wrap">
              {wishlistProducts.map((item, index) => (
                <div className="col-lg-3 col-md-4 col-6" key={index}>
                  <div className="wishlist-wrap-cont">
                    <img src={item.images[0]?.url} alt={item.name} className="w-100" style={{"cursor":"pointer"}} onClick={()=>handleClick(item)} />
                    <p className="wishlist-text">{item.description}</p>
                    <div className="wlist-price-wrapper d-flex align-items-center">
                      <p className="price-wl-d">
                        <MdOutlineCurrencyRupee />
                        {item.price}
                      </p>
                      <p className="price-wl">
                        <MdOutlineCurrencyRupee />
                        {item.price}
                      </p>
                      <p className="price-wl-off">20% OFF</p>
                    </div>
                    <div className="d-flex align-items-center wlist-btn-wrapper">
                      <button
                        className="wishlist-dlt-btn"
                        onClick={() => handleRemoveClick(item.id)}
                      >
                        <MdOutlineDeleteOutline /> Remove
                      </button>
                      <button className="add-Cart-btn" onClick={()=>handleAddtoCard(item)}>
                        {isCartItem(item)?"Go to Cart":"Add to Cart"}  <AiOutlineShoppingCart />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="wishList-empty">
          <div className="container">
            <div className="inner-empt-wlist">
              <img src={emptyWishlist} width="200px" alt="" />
              <h5 className="wish-empty-title text-center">
                No wishes yet! Find something you love and add it here.
              </h5>
              <Link to="/product" className="empty-wishlist-btn">
                Shop Now
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Wishlist;
