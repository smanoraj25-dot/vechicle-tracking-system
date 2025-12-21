import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa6';

// Layout
import Layout from '../Components/Layout/Layout';

// Page Imports
const Home = lazy(() => import('../Pages/Home/Home.jsx'));
const Cart = lazy(() => import('../Pages/Cart/Cart'));
const About = lazy(() => import('../Pages/About/About'));
const Contact = lazy(() => import('../Pages/Contact/Contact'));
const Product = lazy(() => import('../Pages/Product/Product'));
const ProductDetail = lazy(() => import('../Pages/ProductDetail/ProductDetail.jsx'));
const Wishlist = lazy(() => import('../Pages/wishlist/Wishlist.jsx'));
const Auth = lazy(() => import('../Pages/Auth/index.jsx'));
const Checkout = lazy(() => import('../Pages/Checkout/Checkout.jsx'));
const Termsandconditions = lazy(() => import('../Pages/terms/Termsandconditions.jsx'));
const Policy = lazy(() => import('../Pages/policies/Policy.jsx'));
const Account = lazy(() => import('../Pages/account/Account.jsx'));
const Stories = lazy(() => import('../Pages/stories/Stories.jsx'));
const PayementPolicy = lazy(() => import('../Pages/PayementPolicy/PayementPolicy.jsx'));
const ShippingPolicy = lazy(() => import('../Pages/ShippingPolicy/ShippingPolicy.jsx'));
const ReturnPolicy = lazy(() => import('../Pages/ReturnsRefunds/Returns.jsx'));
const ResetPassword = lazy(() => import('../Pages/resetpassword/ResetPassword.jsx'));
const ProtectedResetRoute = lazy(() => import('../Pages/resetpassword/ProtectedResetRoute.jsx'));

// Protected Route Component
const ProtectedRoute = React.memo(({ children }) => {
  const { isLogin, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="auth-loader">
        <FaSpinner className="spin" />
      </div>
    );
  }

  return isLogin ? children : <Navigate to="/login" replace />;
});


const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="auth-loader"><FaSpinner className="spin" /></div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product-details/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/terms-and-conditions" element={<Termsandconditions />} />
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
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/stories" element={<Stories />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
