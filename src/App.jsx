// prebuild imports
import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

//Component imports
import NavBar from "./Components/NavBar/Navbar";
import Footer from "./Components/Footer/Footer.jsx";

//api and redux imports
import { setLoading, setUser } from "./features/users/authSlice.js";
import { fetchaddtoCard } from "./api/fetchAddtocard.js";
import { fetchProducts } from "./api/fetchProduct.js";
import { fetchWishlist } from "./api/fetchwishlist.js";

// pages imports
const Home = lazy(() => import("./Pages/Home/Home.jsx"));
const Cart = lazy(() => import("./Pages/Cart/Cart"));
const About = lazy(() => import("./Pages/About/About"));
const Contact = lazy(() => import("./Pages/Contact/Contact"));
const Product = lazy(() => import("./Pages/Product/Product"));
const ProductDetail = lazy(() =>
  import("./Pages/productDetail/ProductDetail.jsx"),
);
const Wishlist = lazy(() => import("./Pages/wishlist/Wishlist.jsx"));
const LoginSignup = lazy(() => import("./Pages/LoginSignup/LoginSignup.jsx"));
const Checkout = lazy(() => import("./Pages/Checkout/Checkout.jsx"));
const Termsandconditions = lazy(() =>
  import("./Pages/terms/Termsandconditions.jsx"),
);
const Policy = lazy(() => import("./Pages/policies/Policy.jsx"));
const Account = lazy(() => import("./Pages/account/Account.jsx"));
const Stories = lazy(() => import("./Pages/stories/Stories.jsx"));
const PayementPolicy = lazy(() =>
  import("./Pages/PayementPolicy/PayementPolicy.jsx"),
);
const ShippingPolicy = lazy(() =>
  import("./Pages/ShippingPolicy/ShippingPolicy.jsx"),
);
const ReturnPolicy = lazy(() => import("./Pages/ReturnsRefunds/Returns.jsx"));
const ResetPassword = lazy(() =>
  import("./Pages/resetpassword/ResetPassword.jsx"),
);
const ProtectedResetRoute = lazy(() =>
  import("./Pages/resetpassword/ProtectedResetRoute.jsx"),
);

//Css
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { getGuestCart } from "./Pages/Cart/LSCartAddRemove.js";
import { setCart } from "./features/products/AddtoCardSlice.js";
import { getGuestWishlist, mergeGuestWishlist } from "./Pages/wishlist/LSWishlistAddRemove.js";
import { setWishlist } from "./features/products/WishlistSlice.js";
import { FaSpinner } from "react-icons/fa6";

const api = import.meta.env.VITE_BACKENDURL;

const ProtectedRoute = ({ children }) => {
  const { isLogin, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div className="auth-loader">
  <FaSpinner className="spin" />
</div>
  }

  return isLogin ? children : <Navigate to="/login" replace />;
};

function App() {

    const { isLogin, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const { products } = useSelector((state) => state.products);

    useEffect(() => {
      dispatch(setLoading(true));
      if(token){
        axios
          .post(
            `${api}/api/users/validate-token`,
            {},
            { headers: { Authorization: `Bearer ${token}` } },
          )
          .then((res) => {
            dispatch(setUser(res.data.user));
          })
          .catch(() => {
             localStorage.removeItem("token")
             dispatch(setLoading(false));
          });
      }else{
        dispatch(setLoading(false));
      }
    }, [token, dispatch]);

    useEffect(() => {
      if (user?.id) {
        dispatch(fetchaddtoCard(user.id));
        dispatch(fetchWishlist(user.id));
      }else{
          const guestCart = getGuestCart();
          if (guestCart.length) {
            dispatch(setCart(guestCart));
          }
          const guestWishlist = getGuestWishlist();
          if (guestWishlist.length) {
            dispatch(setWishlist(guestWishlist));
          }  
      }
    }, [dispatch, user?.id]);

    useEffect(() => {
      if (!products || products.length === 0) {
        dispatch(fetchProducts());
      }
    }, [dispatch, products?.length]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <NavBar />
      <main>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product-details/:id" element={<ProductDetail />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route
              path="/checkout"
              element={
                // <ProtectedRoute isLogin={isLogin} routeName={"checkout"}>
                  <Checkout />
                // </ProtectedRoute> 
              }
            />
            <Route
              path="/terms-and-conditions"
              element={<Termsandconditions />}
            />
            <Route path="/policy" element={<Policy />} />
            <Route path="/payment-policy" element={<PayementPolicy />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/return-exchange-policy" element={<ReturnPolicy />} />
            <Route
              path="/reset-password"
              element={
                <ProtectedResetRoute>
                  <ResetPassword />
                </ProtectedResetRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute isLogin={isLogin} routeName={"account"}>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route path="/stories" element={<Stories />} />
          </Routes>
        </Suspense>
      </main>
    <Footer />
  </>
  );
}
export default App;