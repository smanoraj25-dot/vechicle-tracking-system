import axios from "axios";

const API_URL = import.meta.env.VITE_BACKENDURL;

// Safely get guest cart from localStorage
export const getGuestCart = () => {
    try {
        const cart = localStorage.getItem("guest_cart");
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error("Error parsing guest cart:", error);
        return [];
    }
};

// Get guest cart length without parsing the full cart
export const getGuestCartLength = () => {
    const cart = localStorage.getItem("guest_cart");
    return cart ? JSON.parse(cart).length : 0;
};

// Set guest cart to localStorage
export const setGuestCart = (cart) => {
    try {
        localStorage.setItem("guest_cart", JSON.stringify(cart));
    } catch (error) {
        console.error("Error saving guest cart:", error);
    }
};

// Clear guest cart from localStorage
export const clearGuestCart = () => {
    localStorage.removeItem("guest_cart");
};

// Merge guest cart with user's cart on login
export const mergeGuestCart = async (userId, userCart) => {
    const guestCart = getGuestCart();
    if (!guestCart.length) return;

    const userCartProductIds = new Set(userCart.map(item => item.product_id));

    for (const item of guestCart) {
        if (!userCartProductIds.has(item.product_id)) {
            try {
                await axios.post(`${API_URL}/api/addtocart/add`, {
                    userId,
                    productId: item.product_id,
                });
            } catch (err) {
                console.error("Cart merge failed for item:", item.product_id, err);
            }
        }
    }

    clearGuestCart();
};
