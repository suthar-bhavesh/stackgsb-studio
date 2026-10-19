import { motion, useReducedMotion } from "framer-motion";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiNextdotjs,
  SiFigma,
} from "react-icons/si";

const tech = [
  { icon: SiReact, name: "React" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiTailwindcss, name: "Tailwind CSS" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiFigma, name: "Figma" },
];

function TechItem({ item }) {
  const Icon = item.icon;

  return (
    <div className="group flex shrink-0 items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md">
      <Icon
        size={28}
        aria-hidden="true"
        className="text-blue-800 transition-transform duration-300 group-hover:scale-110"
      />

      <span className="whitespace-nowrap text-sm font-semibold text-gray-800 md:text-base">
        {item.name}
      </span>
    </div>
  );
}

export function TechStack() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="tech-stack"
      className="overflow-hidden bg-white py-12 md:py-24"
    >
      <div className="container mx-auto px-4 text-center md:px-6 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
            Technologies We Use
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-5xl">
            Our Tech <span className="text-blue-700">Stack</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
            We use modern technologies and design tools to build reliable,
            responsive, and scalable digital experiences.
          </p>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden">
        <div
          className={`tech-marquee flex w-max ${
            reduceMotion ? "" : "tech-marquee-animate"
          }`}
        >
          {/* First group */}
          <div className="flex shrink-0 items-center gap-4 pr-4 md:gap-6 md:pr-6">
            {tech.map((item) => (
              <TechItem key={item.name} item={item} />
            ))}
          </div>

          {/* Duplicate group for seamless animation */}
          <div
            aria-hidden="true"
            className="flex shrink-0 items-center gap-4 pr-4 md:gap-6 md:pr-6"
          >
            {tech.map((item) => (
              <TechItem key={`duplicate-${item.name}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tech-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .tech-marquee-animate {
          animation: tech-scroll 28s linear infinite;
          will-change: transform;
        }

        .tech-marquee-animate:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .tech-marquee {
            animation: none !important;
            width: 100%;
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px;
          }

          .tech-marquee > div:first-child {
            flex-wrap: wrap;
            justify-content: center;
          }

          .tech-marquee > div:last-child {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

export default TechStack;
