import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './Wishlist.css';
import { useAddToCartMutation } from '../../features/products/cartApi';
import { addToCart } from '../../features/products/AddtoCardSlice';

const Wishlist = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLogin, user } = useSelector((state) => state.auth);
    const { products } = useSelector((state) => state.products);
    const { wishlist } = useSelector((state) => state.wishlist);
    const { carts } = useSelector((state) => state.carts);

    const [addToCartMutation] = useAddToCartMutation();

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

    const handleAddToCartClick = useCallback(async (item) => {
        if (item.isInCart) {
            navigate("/cart");
            return;
        }

        dispatch(addToCart({ product_id: item.id }));

        try {
            await addToCartMutation({ productId: item.id, userId: user?.id }).unwrap();
            toast.success("Added to cart ❤");
            navigate("/cart");
        } catch (error) {
            console.log("err :", error);
            toast.error("Failed to add to cart. Please try again.");
        }
    }, [dispatch, user?.id, navigate, addToCartMutation]);

    const handleProductClick = useCallback((item) => {
        navigate(`/product-details/${item.id}`);
    }, [navigate]);

    if (wishlist.length === 0) {
        return (
            <div className='container-fluid d-flex justify-content-center align-items-center' style={{ height: "80vh" }}>
                <h2>Your Wishlist is Empty</h2>
            </div>
        );
    }

    return (
        <div className='wishlist-container'>
            <h2>Your Wishlist</h2>
            <div className='wishlist-items'>
                {wishlistProducts.map((item, index) => (
                    <div className='wishlist-item' key={`${item.id}-${index}`}>
                        <img
                            src={item.image}
                            alt={item.title}
                            onClick={() => handleProductClick(item)}
                        />
                        <div className='item-details'>
                            <h3 onClick={() => handleProductClick(item)}>{item.title}</h3>
                            <p>Price: ${item.price}</p>
                        </div>
                        <button
                            className={`add-to-cart-btn ${item.isInCart ? "in-cart" : ""}`}
                            onClick={() => handleAddToCartClick(item)}
                        >
                            {item.isInCart ? "Go to Cart" : "Add to Cart"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
