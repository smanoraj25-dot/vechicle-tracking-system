import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

// Redux Imports
import { setLoading, setUser } from "./features/users/authSlice.js";
import { fetchaddtoCard } from "./api/fetchAddtocard.js";
import { fetchProducts } from "./api/fetchProduct.js";
import { fetchWishlist } from "./api/fetchwishlist.js";
import { setCart } from "./features/products/AddtoCardSlice.js";
import { setWishlist } from "./features/products/WishlistSlice.js";

// Route Imports
import AppRoutes from "./Routes/index.jsx";

// CSS
import "./App.css";

// Local Storage
import { getGuestCart } from "./Pages/Cart/LSCartAddRemove.js";
import { getGuestWishlist } from "./Pages/wishlist/LSWishlistAddRemove.js";

const api = import.meta.env.VITE_BACKENDURL;

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(setLoading(true));
    if (token) {
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
          localStorage.removeItem("token");
          dispatch(setLoading(false));
        });
    } else {
      dispatch(setLoading(false));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchaddtoCard(user.id));
      dispatch(fetchWishlist(user.id));
    } else {
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

  return <AppRoutes />;
}

export default App;
