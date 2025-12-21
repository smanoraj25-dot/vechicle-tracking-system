import ProductDetailSlide from "../../Components/productdetailslider/ProductDetailSlide";
import SimilarProduct from "../../Components/similarproduct/SimilarProduct";

import { IoCart } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import "../productDetail/ProductDetail.css";
import { useLocation,useNavigate,useParams } from "react-router-dom";
import {addToWishlist,removeFromWishlist} from '../../features/products/WishlistSlice';
import {addToCart} from '../../features/products/AddtoCardSlice';
import { useDispatch,useSelector } from 'react-redux';
import { toast } from "react-toastify";

import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const API_URL=import.meta.env.VITE_BACKENDURL;

const ProductDetail = () => {
  const { id } = useParams();
  const [productItem,setProductItem]=useState(null);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const { products } = useSelector((state) => state.products);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const { isLogin, user } = useSelector((state) => state.auth);
  const addedcart = useSelector((state) => state.carts.carts);

  useEffect(() => {
    if (products.length > 0) {
      const productId = id;
      const selectedProduct = products.find((item) => item.id === productId);
      setProductItem(selectedProduct || null);
    }
  }, [id, products]);


  const isWishlisted = useMemo(() => {
    return wishlist.some(item => item.product_id === productItem?.id);
  }, [wishlist, productItem?.id]);


  const updatedcart = useMemo(() => {
    return addedcart.filter(cart => cart.product_id === productItem?.id);
  }, [addedcart, productItem?.id]);

  
  const handleAddtoWishList = useCallback(async () => {
    try {
      if (isWishlisted) {
        dispatch(removeFromWishlist({ product_id: productItem?.id }));
        if (isLogin) {
          await axios.delete(`${API_URL}/api/wishlist/remove`, {
            data: {
              userId: user?.id,
              productId: productItem?.id,
            },
          });
        }
        toast.error("Removed from Wishlist ❤");
      } else {
        dispatch(addToWishlist({ product_id: productItem.id }));
        if (isLogin) {
          await axios.post(API_URL + "/api/wishlist/add", {
            userId: user?.id,
            productId: productItem?.id,
          });
        }
        toast.success("Added to Wishlist ❤");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  }, [isWishlisted, isLogin, dispatch, productItem?.id, user?.id]);

  const handleAddtoCard = useCallback(async () => {
    dispatch(addToCart({ product_id: productItem?.id }));
    try {
      if (isLogin && updatedcart.length === 0) {
       
        await axios.post(`${API_URL}/api/addtocart/add`, {
          userId: user?.id,
          productId: productItem?.id,
        });
        toast.success("Added to cart ❤");
        navigate("/cart", { state: { product: productItem } });
      } else {
        navigate("/cart", { state: { product: productItem } });
      }
    } catch (error) {
      console.log("err :", error);
    }
  }, [isLogin, updatedcart, dispatch, productItem?.id, user?.id, navigate]);



  return (
    productItem && (
      <>
        <section className="prdt-sec-1-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <ProductDetailSlide img={productItem.images} />
              </div>
              <div className="col-md-7">
               <h3 className="pro-det-h-title">{productItem.name}</h3>
                <div className="price-wrapper-pd">
                  <p className="prd-p1">INR {(Number(productItem.price)).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
                  {/* <p className="prd-p2">{productItem.price}</p> */}
                  {/* <p className="prd-off">20% OFF</p> */}
                </div>
                <p className="pro-detail-p">{productItem.description}</p>
                 <div className="d-flex gap-5 prd-dir-mob">
                  {/* <div>
                    <h4 className="prd-dtc">size</h4>

                    <div className="pro-det-rat-wrapper-size d-flex">
                      {
                      productItem?.size?.map((sizes, index) => {
                        return (
                          <div className="pro-det-rat-wrap-in-size" key={index}>
                            <input
                              type="radio"
                              value={sizes.name}
                              id={sizes.name}
                              className="pro-detail-ratio-inp-siz"
                              name="size"
                            />
                            <label
                              htmlFor={sizes.name}
                              className="pro-detail-ratio-label-siz"
                            >
                             {sizes.name}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div> */}
                  {/* <div>
                    <h4 className="prd-dtc">Color</h4>
                    <div className="pro-det-rat-wrapper d-flex">
                      {productItem?.color?.map((colrs,index)=>{
                        return(<div className="pro-det-rat-wrap-in" key={index}>
                            <input
                              type="radio"
                              value={colrs.name}
                              id={colrs.name}
                              className="pro-detail-ratio-inp"
                              name="Color"
                            />
                            <label
                              htmlFor={colrs.name}
                              className="pro-detail-ratio-label"
                            >
                              <span style={{backgroundColor:colrs.name}}></span>
                               {colrs.name}
                            </label>
                          </div>);
                      })}
                    </div>
                  </div> */}
                </div>

                <div className="pro-d-btn-wrapper d-flex align-items-center">
                  {productItem?.stock>=1?<button className="btn-Shop-t" onClick={handleAddtoCard}>
                    <IoCart /> {updatedcart.length !== 0 ? "Go to Cart" : "Add to Cart" }  
                  </button>:
                  <button className="btn-Shop-t" style={{backgroundColor:"#a11717"}}>
                    <MdRemoveShoppingCart /> Out of Stock
                  </button>}
                  <button className="btn-pr-dt-wishlist" onClick={handleAddtoWishList}>
                    <FaHeart /> {isWishlisted?"Remove from WishList":"Add to WishList"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="prod-detail-sec-2">
          <div className="container">
            <h2 className="pd-similar-title"> Similar Products</h2>
            <SimilarProduct productItem={productItem}/>
          </div>
        </section>
      </>
    )
  );
};

export default React.memo(ProductDetail);
