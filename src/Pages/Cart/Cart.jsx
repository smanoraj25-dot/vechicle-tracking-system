import React, { useState, useMemo, useCallback, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

import { removeFromCart } from "../../features/products/AddtoCardSlice";
import DisclaimerModal from "../../Components/disclaimermodal/DisclaimerModal";

import { FaTrashAlt } from "react-icons/fa";
import flow1 from "../../assets/images/images-floral/f-1.jpg";
import flow2 from "../../assets/images/images-floral/f-2.jpg";
import emptyCartImg from "../../assets/images/wishlist/empty-cart.png";

import "./Cart.css";
import "../wishlist/Wishlist.css";

const API_URL = import.meta.env.VITE_BACKENDURL;

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLogin, user } = useSelector((state) => state.auth);
    const { carts } = useSelector((state) => state.carts);
    const { products } = useSelector((state) => state.products);
    const [showModal, setShowModal] = useState(false);

    const cartItems = useMemo(() => {
        if (!products?.length || !carts?.length) return [];
        const cartProductIds = new Set(carts.map((item) => item.product_id));
        return products
            .filter((product) => cartProductIds.has(product.id))
            .map((item) => ({
                id: item.id,
                name: item.name,
                description: item.description,
                price: item.price,
                image: item.images?.[0]?.url || "",
                quantity: 1, // Assuming quantity is always 1
            }));
    }, [carts, products]);

    const totalPrice = useMemo(() => {
        return cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2);
    }, [cartItems]);

    const handleRemoveCart = useCallback(async (itemId) => {
        dispatch(removeFromCart({ product_id: itemId }));
        try {
            if (isLogin) {
                await axios.delete(`${API_URL}/api/addtocart/remove`, {
                    data: { userId: user.id, productId: itemId },
                });
            }
            toast.success("Item removed from cart");
        } catch (error) {
            console.error("Error removing item: ", error);
            toast.error("Failed to remove item from cart.");
        }
    }, [dispatch, isLogin, user?.id]);

    const handleTermsClose = useCallback((accepted) => {
        setShowModal(false);
        if (accepted) {
            navigate("/checkout", {
                state: { cartItems, totalAmount: totalPrice },
            });
        }
    }, [navigate, cartItems, totalPrice]);

    const handleCheckout = () => {
        setShowModal(true);
    };

    if (cartItems.length === 0) {
        return (
            <section className="wishList-empty">
                <div className="container">
                    <div className="inner-empt-wlist">
                        <img src={emptyCartImg} width="200px" alt="Empty Cart" />
                        <h5 className="wish-empty-title text-center">
                            Oops! No items found. Browse and add some
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
        <div className="cart-parent cart-bg">
            <div className="cart-container">
                <h2>Shopping Cart - Seelaikaari</h2>
                <div className="cart-layout">
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-card">
                                <img src={item.image} alt={item.name} className="cart-img" loading="lazy" />
                                <div className="cart-details">
                                    <h3>
                                        <img src={flow1} alt="Floral Icon" className="floral-icon" loading="lazy" />
                                        {item.name}
                                    </h3>
                                    <p>{item.description}</p>
                                    <div className="cart-actions">
                                        <span className="price">
                                            Rs.{" "}
                                            {(item.price * item.quantity).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                                        </span>
                                        <button className="remove-btn" onClick={() => handleRemoveCart(item.id)}>
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3 className="order-head">Order Summary</h3>
                        <img src={flow2} alt="Floral Design" className="floral-summary-decoration" />
                        <p className="price">Subtotal: Rs. <strong>{totalPrice}</strong></p>
                        <button className="checkout-btn" onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>
                        <button className="continue-shopping-btn" onClick={() => navigate("/product")}>
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
            <DisclaimerModal showModal={showModal} handleClose={handleTermsClose} />
        </div>
    );
};

export default memo(Cart);
