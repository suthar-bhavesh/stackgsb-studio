import { motion } from "framer-motion";
import { ArrowRight, Code, PenTool, Rocket } from "lucide-react";
import BannerVideo from "../assets/Video/banner-video.mp4";

export function Hero() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden h-full w-full"
      id="hero"
    >
      {/* Background Video */}
      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        src={BannerVideo}
        autoPlay
        loop
        muted
        playsInline
        className="
    absolute inset-0
    w-full h-full
    object-cover
    object-[65%_center]
    md:object-center
  "
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 z-1" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none z-2">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-3 md:px-5 lg:px-12 relative z-10 flex flex-col items-center text-center m-57">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white max-w-5xl leading-[1.1]"
        >
          Design. Develop.
          <span className="text-blue-400">Deliver.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-[14px] text-muted-foreground max-w-2xl font-normal text-white"
        >
          StackGSB Studio helps businesses build modern, fast and scalable
          digital experiences through professional web development, UI/UX design
          and search engine optimization.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-24 grid grid-cols-3 gap-4 md:gap-16 border-t border-gray-800 pt-10 border-b pb-10"
        >
          {[
            { icon: PenTool, label: "Graphic Design" },
            { icon: Code, label: "Web Development" },
            { icon: Rocket, label: "SEO Optimization" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center text-primary group">
                <item.icon
                  size={20}
                  className="group-hover:text-blue-500 transition duration-150 ease-in text-white"
                />
              </div>
              <span className="text-[13px] font-medium text-muted-foreground text-white">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
