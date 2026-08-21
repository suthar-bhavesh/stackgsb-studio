import { motion } from "framer-motion";
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

export function TechStack() {
  return (
    <section className="pt-9 md:pt-24 bg-background overflow-hidden">
      <div className="container mx-auto px-2 md:px-12 text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
          Tech &nbsp;<span className="text-primary">Stack</span>
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden w-full mt-19">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...tech, ...tech, ...tech].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 mx-8 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
            >
              <item.icon size={32} className="text-foreground" />
              <span className="text-xl font-semibold text-foreground">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
