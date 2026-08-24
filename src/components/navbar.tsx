import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import logoPath from "../assets/image/favicon.png";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "" : "md:py-3"
      }`}
    >
      <div className="container mx-auto px-4 md:px-5 lg:px-12 flex items-center justify-between border border-gray-300/70 md:rounded-full shadow-md py-3 bg-white">
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <Link
            to="/#hero"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 cursor-pointer z-50 relative"
          >
            <img src={logoPath} alt="StackGSB Studio" className="h-10 w-10" />

            <h2 className="font-bold text-xl flex flex-col items-center">
              StackGSB
              <span className="text-blue-800 text-xs">Studio</span>
            </h2>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <ul className="flex gap-16">
              <li className="group flex flex-col items-start">
                <Link to="/#hero">Home</Link>

                <span className="h-0.5 w-0 bg-blue-800 transition-all duration-300 group-hover:w-full" />
              </li>

              <li className="group flex flex-col items-start">
                <Link to="/#services">Services</Link>

                <span className="h-0.5 w-0 bg-blue-800 transition-all duration-300 group-hover:w-full" />
              </li>

              <li className="group flex flex-col items-start">
                <Link to="/#contact">Contact Us</Link>

                <span className="h-0.5 w-0 bg-blue-800 transition-all duration-300 group-hover:w-full" />
              </li>

              <li className="group flex flex-col items-start">
                <Link to="/about">About Us</Link>

                <span className="h-0.5 w-0 bg-blue-800 transition-all duration-300 group-hover:w-full" />
              </li>
            </ul>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden text-foreground z-50 relative p-2"
            onClick={() => setMobileMenuOpen((previous) => !previous)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{
            opacity: 0,
            clipPath: "circle(0% at 100% 0)",
          }}
          animate={{
            opacity: mobileMenuOpen ? 1 : 0,
            clipPath: mobileMenuOpen
              ? "circle(150% at 100% 0)"
              : "circle(0% at 100% 0)",
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`fixed inset-0 bg-white flex flex-col gap-8 md:hidden ${
            mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-6 mt-22.5 p-5 text-lg">
            <Link to="/#hero" onClick={closeMobileMenu}>
              Home
            </Link>

            <Link to="/#services" onClick={closeMobileMenu}>
              Services
            </Link>

            <Link to="/#contact" onClick={closeMobileMenu}>
              Contact Us
            </Link>

            <Link to="/about" onClick={closeMobileMenu}>
              About Us
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
