import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useMemo } from "react";

import { toast } from "react-toastify";
import { removeFromCart } from "../../features/products/AddtoCardSlice";

import { FaTrashAlt } from "react-icons/fa";
import flow1 from "../../assets/images/images-floral/f-1.jpg";
import flow2 from "../../assets/images/images-floral/f-2.jpg";
import emptyCartImg from "../../assets/images/wishlist/empty-cart.png";

import "./Cart.css";
import "../wishlist/Wishlist.css";

const API_URL = import.meta.env.VITE_BACKENDURL;

// Disclaimer Modal Component
const DisclaimerModal = ({ showModal, handleClose }) => {
  if (!showModal) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-header">Terms & Conditions</h3>
        <p>
          * By proceeding, you agree to our return, exchange, and product
          policies.
        </p>
        <p>* No damage</p>
        <div className="modal-footer">
          <button
            className="modal-btn cancel"
            onClick={() => handleClose(false)}
          >
            Cancel
          </button>
          <button
            className="modal-btn accept"
            onClick={() => handleClose(true)}
          >
            Agree
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLogin, user } = useSelector((state) => state.auth);
  const addedcart = useSelector((state) => state.carts.carts);
  const { products } = useSelector((state) => state.products);
  const [showModal, setShowModal] = useState(false);

  // Filter and map cart items with product details
  const cartItems = useMemo(() => {
    if (!products?.length || !addedcart?.length) return [];

    const updatedItems = products
      .filter((product) =>
        addedcart.some((item) => item.product_id === product.id),
      )
      .map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        size: item.size?.[0]?.name || "N/A",
        price: item.price,
        discountedPrice: item.price || 16000,
        image: item.images?.[0]?.url || "",
        quantity: 1,
      }));

    return updatedItems;
  }, [addedcart, products]);

  // Update item quantity
  // const updateQuantity = (id, amount) => {
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
  //     )
  //   );
  // };

  // Calculate total price
  const totalPrice = useMemo(() => {
    return cartItems
      .reduce((total, item) => total + item.discountedPrice * item.quantity, 0)
      .toFixed(2);
  }, [cartItems]);

  //  Handle terms acceptance modal
  // const handleTermsCheckbox = () => {
  //   isTermsAccepted ? setIsTermsAccepted(false) : setShowModal(true);
  // };

  const handleTermsClose = (accepted) => {
    setShowModal(false);
    // if (accepted) setIsTermsAccepted(true);
  };

  const handleRemoveCart = async (itemId) => {
    dispatch(removeFromCart(itemId));
    try {
      if (isLogin) {
        await axios.delete(`${API_URL}/api/addtocart/remove`, {
          data: { userId: user.id, productId: itemId },
        });
      }

      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item: ", error);
    }
  };

  return (
    <div className={`cart-parent ${cartItems.length > 0 ? "cart-bg" : ""}`}>
      <div className="cart-container">
        <h2>Shopping Cart - Seelaikaari</h2>
        {cartItems.length ? (
          <>
            <div className="cart-layout">
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-card">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-img"
                      loading="lazy"
                    />
                    <div className="cart-details">
                      <h3>
                        <img
                          src={flow1}
                          alt="Floral Icon"
                          className="floral-icon"
                          loading="lazy"
                        />
                        {item.name}
                      </h3>
                      <p>{item.description}</p>
                      {/* <p><strong>Size:</strong> {item.size}</p> */}
                      <div className="cart-actions">
                        <span className="price">
                          Rs.{" "}
                          {Number(item.price * item.quantity).toLocaleString(
                            "en-IN",
                            { minimumFractionDigits: 2 },
                          )}
                        </span>
                        <br />
                        {/* <div className="quantity-controls">
                                <div className="decrease-btn">
                              <FaMinusCircle
                                onClick={() => updateQuantity(item.id, -1)}
                                className="cart-decrease-btn"
                              />
                                </div>
                              <span className="cart-quantity">{item.quantity}</span>
                                <div className="increase-btn">
                              <FaPlusCircle
                                onClick={() => updateQuantity(item.id, 1)}
                                className="cart-increase-btn"
                              />
                            </div>
                            </div> */}
                        <button
                          className="remove-btn"
                          onClick={() => handleRemoveCart(item.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <h3 className="order-head">Order Summary</h3>
                <img
                  src={flow2}
                  alt="Floral Design"
                  className="floral-summary-decoration"
                />
                <p className="price">
                  Subtotal: Rs. <strong>{totalPrice}</strong>
                </p>
                <button
                  className="checkout-btn"
                  onClick={() =>
                    navigate("/checkout", {
                      state: { cartItems, totalAmount: totalPrice },
                    })
                  }
                >
                  Proceed to Checkout
                </button>
                <button
                  className="continue-shopping-btn"
                  onClick={() => navigate("/product")}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </>
        ) : (
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
        )}

        <DisclaimerModal showModal={showModal} handleClose={handleTermsClose} />
      </div>
    </div>
  );
};

export default Cart;
