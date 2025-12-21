import axios from "axios";
const API_URL = import.meta.env.VITE_BACKENDURL;
// src/utils/localStorage.js
export const getGuestCart = () => {
  return JSON.parse(localStorage.getItem("guest_cart")) || [];
};

export const setGuestCart = (cart) => {
  localStorage.setItem("guest_cart", JSON.stringify(cart));
};

export const clearGuestCart = () => {
  localStorage.removeItem("guest_cart");
};

export const mergeGuestCart = async (userId) => {
  const guestCart =
    JSON.parse(localStorage.getItem("guest_cart")) || [];
 
  if (!guestCart.length) return;

  for (const item of guestCart) {
    try {
      await axios.post(`${API_URL}/api/addtocart/add`, {
        userId,
        productId: item.product_id
      });
    } catch (err) {
      console.error("Cart merge failed:", err);
    }
  }

  clearGuestCart();
};
