import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const logoPath = "/image/StackGSBlogo.png";

const navLinks = [
  { label: "Home", to: "/#hero" },
  { label: "Services", to: "/#services" },
  { label: "Contact Us", to: "/#contact" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "About Us", to: "/about" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);

    if (!location.hash) return;

    const id = decodeURIComponent(location.hash.slice(1));
    let attempts = 0;
    let timeoutId: number | undefined;

    const scrollToSection = () => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      } else if (attempts++ < 20) {
        timeoutId = window.setTimeout(scrollToSection, 100);
      }
    };

    scrollToSection();

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [location.pathname, location.hash, reduceMotion]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen]);

  const isActive = (to: string) => {
    if (to.startsWith("/#")) {
      return location.pathname === "/" && location.hash === to.slice(1);
    }

    return location.pathname === to;
  };

  const handleLinkClick = (to: string) => {
    setMobileMenuOpen(false);

    if (
      to.startsWith("/#") &&
      location.pathname === "/" &&
      location.hash === to.slice(1)
    ) {
      const id = to.split("#")[1];

      document.getElementById(id)?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <motion.nav
      initial={reduceMotion ? false : { y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-0 md:py-2" : "py-0 md:py-3"
      }`}
    >
      <div className="container relative z-20 mx-auto flex items-center justify-between border border-gray-200 bg-white px-4 py-3 shadow-md md:rounded-full md:px-6 lg:px-12">
        {/* LOGO */}
        <Link
          to="/#hero"
          onClick={() => handleLinkClick("/#hero")}
          className="relative z-50 flex items-center gap-3"
        >
          <img
            src={logoPath}
            alt="StackGSB Studio Logo"
            width="40"
            height="40"
            className="h-10 w-10 object-contain"
          />

          <span className="flex flex-col text-xl font-bold leading-tight text-gray-900">
            StackGSB
            <span className="text-xs text-blue-800">Studio</span>
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="group relative font-medium text-gray-800 transition hover:text-blue-800"
            >
              {item.label}

              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-800 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* ANIMATED MOBILE HAMBURGER */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-900 transition-colors duration-300 hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 md:hidden"
        >
          <span className="sr-only">
            {mobileMenuOpen ? "Close menu" : "Open menu"}
          </span>

          <div className="relative h-5 w-6">
            <motion.span
              className="absolute left-0 top-0.75 h-0.5 w-6 rounded-full bg-blue-900"
              animate={{
                rotate: mobileMenuOpen ? 45 : 0,
                y: mobileMenuOpen ? 7 : 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.3,
                ease: "easeInOut",
              }}
            />

            <motion.span
              className="absolute left-0 top-2.5 h-0.5 w-6 rounded-full bg-blue-900"
              animate={{
                opacity: mobileMenuOpen ? 0 : 1,
                scaleX: mobileMenuOpen ? 0 : 1,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.2,
              }}
            />

            <motion.span
              className="absolute left-0 top-4.25 h-0.5 w-6 rounded-full bg-blue-900"
              animate={{
                rotate: mobileMenuOpen ? -45 : 0,
                y: mobileMenuOpen ? -7 : 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.3,
                ease: "easeInOut",
              }}
            />
          </div>
        </button>
      </div>

      {/* ANIMATED MOBILE MENU */}
      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            key="mobile-menu"
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: -18,
                    height: 0,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              height: "auto",
            }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: -12,
                    height: 0,
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-0 right-0 top-full z-10 overflow-hidden border-b border-blue-100 bg-white shadow-[0_20px_45px_rgba(7,27,73,0.12)] md:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 pb-6 pt-4">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: reduceMotion ? 0 : 0.065,
                      delayChildren: reduceMotion ? 0 : 0.08,
                    },
                  },
                }}
                className="flex flex-col gap-2"
              >
                {navLinks.map((item, index) => {
                  const active = isActive(item.to);

                  return (
                    <motion.div
                      key={item.label}
                      variants={{
                        hidden: {
                          opacity: reduceMotion ? 1 : 0,
                          x: reduceMotion ? 0 : -16,
                        },
                        visible: {
                          opacity: 1,
                          x: 0,
                        },
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.28,
                      }}
                    >
                      <Link
                        to={item.to}
                        onClick={() => handleLinkClick(item.to)}
                        className={`group flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-semibold transition-all duration-300 ${
                          active
                            ? "bg-blue-50 text-blue-800"
                            : "text-gray-800 hover:bg-blue-50 hover:text-blue-800"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`h-1.5 w-1.5 rounded-full transition-colors ${
                              active
                                ? "bg-blue-600"
                                : "bg-blue-200 group-hover:bg-blue-500"
                            }`}
                          />

                          {item.label}
                        </span>

                        <motion.span
                          initial={false}
                          whileHover={reduceMotion ? undefined : { x: 3 }}
                          className="text-sm text-blue-500"
                        >
                          ↗
                        </motion.span>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* MOBILE MENU FOOTER */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: reduceMotion ? 0 : 0.32,
                  duration: reduceMotion ? 0 : 0.3,
                }}
                className="mt-5 border-t border-blue-100 pt-4"
              ></motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
