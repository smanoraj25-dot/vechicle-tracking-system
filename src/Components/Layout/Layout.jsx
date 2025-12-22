import  {Outlet}  from "react-router-dom";
import NavBar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import  {ToastContainer}  from "react-toastify";

const Layout = () => {
  return (
    <main>
      <NavBar />
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
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
