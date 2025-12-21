import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <main>
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
