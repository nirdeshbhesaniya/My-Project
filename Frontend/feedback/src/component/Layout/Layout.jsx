import Navbar from "../Navbar";
import Footer from "../Footer";
import Router from "../../Router/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="w-full shadow-md bg-white">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-0 py-6">
        <Router />
      </main>

      {/* Footer - Always at bottom */}
      <footer className="mt-auto bg-gray-800 text-white py-4">
        <Footer />
      </footer>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} />
    </div>
  );
};

export default Layout;
