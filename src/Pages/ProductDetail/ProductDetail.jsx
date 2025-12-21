import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/inner-image-zoom.css';

import SimilarProduct from "../../Components/similarproduct/SimilarProduct";
import { useToggleWishlistMutation } from '../../features/products/wishlistApi';
import { useAddToCartMutation } from '../../features/products/cartApi';

import { IoCart } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import "./ProductDetail.css";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLogin, user } = useSelector((state) => state.auth);
    const productItem = useSelector((state) =>
        state.products.products.find((item) => item.id === id)
    );
    const isWishlisted = useSelector((state) =>
        state.wishlist.wishlist.some(item => item.product_id === id)
    );
    const isAddedToCart = useSelector((state) =>
        state.carts.carts.some(cart => cart.product_id === id)
    );

    const [toggleWishlist] = useToggleWishlistMutation();
    const [addToCart] = useAddToCartMutation();

    const handleToggleWishlist = useCallback(async () => {
        if (!productItem) return;
        await toggleWishlist({ userId: user?.id, productId: productItem.id });
        const successMessage = isWishlisted ? "Removed from Wishlist ❤" : "Added to Wishlist ❤";
        toast.success(successMessage);
    }, [isWishlisted, productItem, toggleWishlist, user?.id]);

    const handleAddToCart = useCallback(async () => {
        if (!productItem) return;

        if (isAddedToCart) {
            navigate("/cart");
            return;
        }

        await addToCart({ userId: user?.id, productId: productItem.id });
        toast.success("Added to cart ❤");
        navigate("/cart");

    }, [isAddedToCart, productItem, addToCart, user?.id, navigate]);


    if (!productItem) {
        return <div>Product not found or still loading...</div>;
    }

    return (
        <>
            <section className="prdt-sec-1-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <InnerImageZoom src={productItem.images[0]} zoomSrc={productItem.images[0]} />
                        </div>
                        <div className="col-md-7">
                            <h3 className="pro-det-h-title">{productItem.name}</h3>
                            <div className="price-wrapper-pd">
                                <p className="prd-p1">INR {(Number(productItem.price)).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
                            </div>
                            <p className="pro-detail-p">{productItem.description}</p>
                            
                            <div className="pro-d-btn-wrapper d-flex align-items/center">
                                {productItem?.stock >= 1 ? (
                                    <button className="btn-Shop-t" onClick={handleAddToCart}>
                                        <IoCart /> {isAddedToCart ? "Go to Cart" : "Add to Cart"}
                                    </button>
                                ) : (
                                    <button className="btn-Shop-t" style={{ backgroundColor: "#a11717" }} disabled>
                                        <MdRemoveShoppingCart /> Out of Stock
                                    </button>
                                )}
                                <button className="btn-pr-dt-wishlist" onClick={handleToggleWishlist}>
                                    <FaHeart /> {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="prod-detail-sec-2">
                <div className="container">
                    <h2 className="pd-similar-title"> Similar Products</h2>
                    <SimilarProduct productItem={productItem} />
                </div>
            </section>
        </>
    );
};

export default React.memo(ProductDetail);
