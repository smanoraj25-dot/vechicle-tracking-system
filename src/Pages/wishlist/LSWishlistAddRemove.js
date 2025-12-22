// LSWishlistAddRemove.js

export const getGuestWishlist = () =>
  JSON.parse(localStorage.getItem("guest_wishlist")) || [];

export const setGuestWishlist = (wishlist) =>
  localStorage.setItem("guest_wishlist", JSON.stringify(wishlist));

export const clearGuestWishlist = () =>
  localStorage.removeItem("guest_wishlist");

export const mergeGuestWishlist = async (addToWishlist, userId, userWishlist) => {
  const guestWishlist = getGuestWishlist();

  if (!guestWishlist.length) return;

  for (const item of guestWishlist) {
    if (userWishlist.some(i => i.product_id === item.product_id)) continue;

    try {
      await addToWishlist({
        productId: item.product_id,
        userId:userId,
      }).unwrap();
    } catch (err) {
      console.error("Wishlist merge failed:", err);
    }
  }

  clearGuestWishlist();
};