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
export const mergeGuestCart = async (addToCartMutation,userId) => {
    const guestCart = getGuestCart();
    if (!guestCart.length) return;

    for (const item of guestCart) {
            try {
                await addToCartMutation({ userId:userId, productId: item.product_id}).unwrap();
                
            } catch (err) {
                console.error("Cart merge failed for item:", item.product_id, err);
            }
        }

    clearGuestCart();
};
