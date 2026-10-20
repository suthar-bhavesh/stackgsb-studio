import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AboutUs from "@/pages/about-us";
import Portfolio from "./pages/Portfolio";

import { Navbar } from "./components/navbar";
import ReactGA from "react-ga4";

// Google Analytics Initialize
ReactGA.initialize("G-M8986M1X6Y");

const queryClient = new QueryClient();

/* Hash ke according section par scroll karega */
function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const sectionId = location.hash.substring(1);

    const timer = window.setTimeout(() => {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);

    return () => {
      window.clearTimeout(timer);
    };
  }, [location.pathname, location.hash]);

  return null;
}

function AppRouter() {
  const location = useLocation();

  // Google Analytics Tracking Code for SPA Pages
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return (
    <>
      <ScrollToHash />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </>
  );
}

function App() {
  useEffect(() => {
    const handleWheel = () => {
      const activeElement = document.activeElement;

      if (
        activeElement instanceof HTMLInputElement &&
        activeElement.type === "number"
      ) {
        activeElement.blur();
      }
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>

        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
