import { useSelector } from "react-redux";

// Redux Imports
import { useGetProductsQuery } from "./features/products/productApi.js";
import { useGetCartQuery } from "./features/products/cartApi.js";
import { useGetWishlistQuery } from "./features/products/wishlistApi.js";
import { useGetUserQuery } from "./features/users/authApi.js";

// Route Imports
import AppRoutes from "./Routes/index.jsx";

// CSS
import "./App.css";

function App() {
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  // Fetch user data if a token exists
  useGetUserQuery(undefined, { skip: !token });

  // Fetch initial data for products
  useGetProductsQuery();
  
  // Fetch user-specific data if the user is logged in
  useGetCartQuery(user?.id, { skip: !user?.id });
  useGetWishlistQuery(user?.id, { skip: !user?.id });

  return <AppRoutes />;
}

export default App;
