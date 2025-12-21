import axios from "axios";
const API_URL = import.meta.env.VITE_BACKENDURL;
// src/utils/localStorage.js
export const getGuestWishlist = () =>
  JSON.parse(localStorage.getItem("guest_wishlist")) || [];

export const setGuestWishlist = (wishlist) =>
  localStorage.setItem("guest_wishlist", JSON.stringify(wishlist));

export const clearGuestWishlist = () =>
  localStorage.removeItem("guest_wishlist");

export const mergeGuestWishlist = async (userId) => {
  const guestWishlist =
    JSON.parse(localStorage.getItem("guest_wishlist")) || [];

  if (!guestWishlist.length) return;

  for (const productId of guestWishlist) {
    try {
      await axios.post(`${API_URL}/api/wishlist/add`, {
        userId:userId,
        productId: productId.product_id,
      });
      console.log("called wishlist");
      
    } catch (err) {
      console.error("Wishlist merge failed:", err);
    }
  }

  clearGuestWishlist();
};
