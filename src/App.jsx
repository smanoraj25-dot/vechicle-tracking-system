import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

// Redux Imports
import { setLoading, setUser } from "./features/users/authSlice.js";
import { useGetProductsQuery } from "./features/products/productApi.js";
import { useGetCartQuery } from "./features/products/cartApi.js";
import { useGetWishlistQuery } from "./features/products/wishlistApi.js";

// Route Imports
import AppRoutes from "./Routes/index.jsx";

// CSS
import "./App.css";

const api = import.meta.env.VITE_BACKENDURL;

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  // Fetch initial data for products
  useGetProductsQuery();
  
  // Fetch user-specific data if the user is logged in
  // The `skip` option prevents the query from running if the condition is met.
  // We run the query only if there is a user ID.
  useGetCartQuery(user?.id, { skip: !user?.id });
  useGetWishlistQuery(user?.id, { skip: !user?.id });

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

  // The previous useEffect that handled fetching cart/wishlist or setting it from localStorage
  // is now replaced by the RTK queries and the initial state of the respective slices.
  // The slices (AddtoCardSlice.js, WishlistSlice.js) are already configured to load guest data
  // from localStorage in their initialState.
  // When a user logs in, the useGetCartQuery and useGetWishlistQuery hooks will trigger,
  // and the extraReducers in the slices will handle updating the state with the fetched data.

  return <AppRoutes />;
}

export default App;
