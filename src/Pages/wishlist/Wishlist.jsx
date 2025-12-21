import React, { useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

import { removeFromWishlist } from "../../features/products/WishlistSlice";
import { addToCart } from "../../features/products/AddtoCardSlice";

import { MdOutlineCurrencyRupee, MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import emptyWishlist from "../../assets/images/wishlist/empty-wishlist.png";
import "./Wishlist.css";

const api = import.meta.env.VITE_BACKENDURL;

const Wishlist = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLogin, user } = useSelector((state) => state.auth);
    const { products } = useSelector((state) => state.products);
    const { wishlist } = useSelector((state) => state.wishlist);
    const { carts } = useSelector((state) => state.carts);

    const wishlistProducts = useMemo(() => {
        const cartProductIds = new Set(carts.map(item => item.product_id));
        return wishlist
            .map((wishlistItem) => {
                const product = products.find(p => p.id === wishlistItem.product_id);
                if (product) {
                    return {
                        ...product,
                        isInCart: cartProductIds.has(product.id),
                    };
                }
                return null;
            })
            .filter(Boolean);
    }, [wishlist, products, carts]);

    const handleRemoveClick = useCallback(async (productId) => {
        try {
            dispatch(removeFromWishlist({ product_id: productId }));
            if (isLogin) {
                await axios.delete(`${api}/api/wishlist/remove`, {
                    data: { userId: user.id, productId },
                });
            }
            toast.error("Removed from Wishlist ❤");
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    }, [dispatch, isLogin, user?.id]);

    const handleAddToCartClick = useCallback(async (item) => {
        if (item.isInCart) {
            navigate("/cart");
            return;
        }
        dispatch(addToCart({ product_id: item.id }));
        if (isLogin) {
            try {
                await axios.post(`${api}/api/addtocart/add`, {
                    userId: user?.id,
                    productId: item.id,
                });
            } catch (error) {
                console.log("err :", error);
                toast.error("Failed to add to cart. Please try again.");
                return;
            }
        }
        toast.success("Added to cart ❤");
        navigate("/cart");
    }, [dispatch, isLogin, user?.id, navigate]);

    const handleProductClick = useCallback((item) => {
        navigate(`/product-details/${item.id}`);
    }, [navigate]);

    if (wishlist.length === 0) {
        return (
            <section className="wishList-empty">
                <div className="container">
                    <div className="inner-empt-wlist">
                        <img src={emptyWishlist} width="200px" alt="Empty wishlist" />
                        <h5 className="wish-empty-title text-center">
                            No wishes yet! Find something you love and add it here.
                        </h5>
                        <Link to="/product" className="empty-wishlist-btn">
                            Shop Now
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="wishlist-sec-1-wrapper">
            <div className="container">
                <h2 className="wlist-ht">Wishlist Products ({wishlist.length})</h2>
                <div className="row wishlist-inner-wrap">
                    {wishlistProducts.map((item) => (
                        <div className="col-lg-3 col-md-4 col-6" key={item.id}>
                            <div className="wishlist-wrap-cont">
                                <img
                                    src={item.images[0]?.url}
                                    alt={item.name}
                                    className="w-100"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleProductClick(item)}
                                />
                                <p className="wishlist-text">{item.description}</p>
                                <div className="wlist-price-wrapper d-flex align-items-center">
                                    <p className="price-wl-d">
                                        <MdOutlineCurrencyRupee />
                                        {item.price}
                                    </p>
                                </div>
                                <div className="d-flex align-items-center wlist-btn-wrapper">
                                    <button
                                        className="wishlist-dlt-btn"
                                        onClick={() => handleRemoveClick(item.id)}
                                    >
                                        <MdOutlineDeleteOutline /> Remove
                                    </button>
                                    <button
                                        className="add-Cart-btn"
                                        onClick={() => handleAddToCartClick(item)}
                                    >
                                        {item.isInCart ? "Go to Cart" : "Add to Cart"} <AiOutlineShoppingCart />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default React.memo(Wishlist);
