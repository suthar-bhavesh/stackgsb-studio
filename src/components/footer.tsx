import logoPath from "../assets/image/favicon.png";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaXTwitter,
  FaGithub,
  FaPhone,
} from "react-icons/fa6";
import { Mail } from "lucide-react";

function SocialIcons() {
  return (
    <div className="flex gap-4 text-2xl">
      <FaInstagram />
      <FaFacebook />
      <FaLinkedin />
      <FaYoutube />
      <FaXTwitter />
      <FaGithub />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-background pt-9 md:pt-24 border-t border-gray-500/50">
      <div className="container mx-auto px-6 md:px-5 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-1 md:gap-6 lg:gap-12 gap-6 mb-8 md:mb-16 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div>
              <Link to="/">
                <div
                  className="flex items-center gap-3 cursor-pointer z-50"
                  onClick={() => {
                    document
                      .getElementById("hero")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <img
                    src={logoPath}
                    alt="StackGSB Studio"
                    className="h-10 w-10"
                  />
                  <h2 className="font-bold text-xl flex flex-col items-center">
                    StackGSB{" "}
                    <span className="text-blue-800 text-xs">Studio</span>
                  </h2>
                </div>
              </Link>
            </div>
            <p className="text-muted-foreground md:w-full lg:max-w-xs md:mb-0 lg:mb-6 text-justify text-[14px]">
              A boutique digital agency specializing in the design and
              development of modern, high-performing web solutions for ambitious
              businesses. We design, develop, and deliver exceptional digital
              experiences.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4 text-xl">Services</h4>
            <ul className="flex flex-col gap-2 text-[14px]">
              <li className="group flex flex-col items-start w-fit">
                Web Development
                <span className="h-0.5 w-0 bg-blue-800 transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="group flex flex-col items-start w-fit">
                Graphic Design
                <span className="h-0.5 w-0 bg-blue-800 transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="group flex flex-col items-start w-fit">
                Digital Marketing
                <span className="h-0.5 w-0 bg-blue-800 transition-all duration-300 group-hover:w-full"></span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-foreground mb-4 font-bold text-xl">Company</h4>
            <ul className="flex flex-col gap-2 text-[14px]">
              <li className="group flex flex-col items-start w-fit">
                <Link
                  to="#hero"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => {
                    document
                      .getElementById("hero")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Home
                </Link>
                <span className="h-0.5 w-0 bg-blue-800 transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="group flex flex-col items-start w-fit">
                <Link
                  to="#services"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => {
                    document
                      .getElementById("services")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Services
                </Link>
                <span className="h-0.5 w-0 bg-blue-800 transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="group flex flex-col items-start w-fit">
                <Link
                  to="about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => {
                    document
                      .getElementById("about-us")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  About Us
                </Link>
                <span className="h-0.5 w-0 bg-blue-800 transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="group flex flex-col items-start w-fit">
                <Link
                  to="#contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => {
                    document
                      .getElementById("about-us")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Contact US
                </Link>
                <span className="h-0.5 w-0 bg-blue-800 transition-all duration-300 group-hover:w-full"></span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3.5">
            <div>
              <h4 className="font-bold text-foreground mb-4 text-xl">Social</h4>
              <ul className="flex gap-3 text-[15px]">
                <li className="group flex flex-col items-start w-fit bg-gray-800/20 p-2 rounded-full group:">
                  <Link
                    to="https://www.linkedin.com/company/stackgsb-studio"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FaLinkedin
                      size={20}
                      className="group-hover:text-blue-600 transition duration-100 ease-in"
                    />
                  </Link>
                </li>
                <li className="group flex flex-col items-start w-fit bg-gray-800/20 p-2 rounded-full">
                  <Link
                    to="https://www.facebook.com/profile.php?id=61590514316981"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FaFacebook
                      size={20}
                      className="group-hover:text-blue-600 transition duration-100 ease-in"
                    />
                  </Link>
                </li>
                <li className="group flex flex-col items-start w-fit bg-gray-800/20 p-2 rounded-full">
                  <Link
                    to="https://www.instagram.com/stackgsbstudio/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FaInstagram
                      size={20}
                      className="group-hover:text-red-600 transition duration-100 ease-in"
                    />
                  </Link>
                </li>
                <li className="group flex flex-col items-start w-fit bg-gray-800/20 p-2 rounded-full">
                  <Link
                    to="https://github.com/stackgsbstudio-hub"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FaGithub
                      size={20}
                      className="group-hover:text-gray-800 transition duration-100 ease-in"
                    />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2.5">
              <div>
                <h4 className="font-bold text-foreground text-xl">
                  Contact US
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-gray-800/20 p-2 rounded-full group">
                  <FaPhone
                    size={20}
                    className="group-hover:text-green-900 transition duration-100 ease-in"
                  />
                </div>
                <a href="tel:9156105449" className="text-gray-900 text-[14px]">
                  +91 9156105449
                </a>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-gray-800/20 p-2 rounded-full group">
                  <Mail
                    size={20}
                    className="group-hover:text-red-900 transition duration-100 ease-in"
                  />
                </div>
                <a
                  href="mailto:stackgsbstudio@gmail.com"
                  className="text-gray-900 text-[14px]"
                >
                  stackgsbstudio@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5 pb-5 border-t border-gray-500/50 md:p-3.5">
        <div className="container mx-auto flex md:justify-between items-center flex-col md:flex-row">
          <p className="text-sm text-muted-foreground text-gray-700/50">
            &copy; {new Date().getFullYear()} StackGSB Studio. All rights
            reserved.
          </p>
          <div className="flex gap-4 text-gray-700/50">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
