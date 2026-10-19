import { motion } from "framer-motion";
import { ArrowRight, Code, PenTool, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import BannerVideo from "/Video/banner-video.mp4";

const services = [
  { icon: PenTool, label: "Graphic Design" },
  { icon: Code, label: "Web Development" },
  { icon: Rocket, label: "Digital Marketing" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-blue-950"
    >
      {/* Background video */}
      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        src={BannerVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[65%_center] md:object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-1 bg-black/70" />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 z-2 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 mx-auto flex flex-col items-center px-4 py-32 text-center md:px-6 lg:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-5xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl"
        >
          Design. Develop.
          <span className="block text-blue-400">Deliver.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-2xl text-sm leading-7 text-gray-200 md:text-lg"
        >
          StackGSB Studio helps businesses grow their digital presence through
          modern web development, creative graphic design, and results-focused
          digital marketing.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();

              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-4 font-semibold text-white transition-all hover:bg-blue-700"
          >
            Start a Project
            <ArrowRight size={19} />
          </a>

          <Link
            to="/#services"
            className="rounded-full border border-white/50 px-7 py-3 font-semibold text-white transition hover:bg-white hover:text-blue-950"
          >
            Explore Services
          </Link>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 grid w-full max-w-3xl grid-cols-3 gap-3 border-y border-white/20 py-8 md:mt-20 md:gap-12"
        >
          {services.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
                <Icon size={20} />
              </div>

              <span className="text-center text-xs font-medium text-white md:text-sm">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
