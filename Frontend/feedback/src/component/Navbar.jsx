import { Link } from "react-router-dom";
import { useState } from "react";
import AuthButton from "./Authbutton";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-500">
          Mystery Message
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/feedback">Feedback</NavLink>
        </div>

        {/* Right Section: Profile or Login Button */}
        <div className="hidden md:block">
          <AuthButton />
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-xl">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute bg-gray-800 text-white left-0 top-16 w-full flex flex-col p-4 md:hidden transition-all duration-300 ease-in-out">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/feedback" onClick={() => setMenuOpen(false)}>Feedback</NavLink>
          <div className="mt-4">
            <AuthButton />
          </div>
        </div>
      )}
    </nav>
  );
};

// Reusable NavLink Component
const NavLink = ({ to, children, onClick }) => (
  <Link to={to} className="py-2 px-4 hover:text-blue-400 transition-colors" onClick={onClick}>
    {children}
  </Link>
);

export default Navbar;
