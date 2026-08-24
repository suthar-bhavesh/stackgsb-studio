import { hover, motion } from "framer-motion";
import { Layers, TrendingUp, VectorSquare } from "lucide-react";

const services = [
  {
    icon: Layers,
    title: "Web Development",
    description:
      "We build responsive, secure, and scalable websites tailored to your business goals. From UI/UX and frontend development to backend systems, API integrations, performance optimization, and ongoing maintenance, we create reliable digital experiences built to grow with your business.",
  },
  {
    icon: VectorSquare,
    title: "Graphic Design",
    description:
      "We create professional visual identities that help your brand communicate clearly and consistently. Our design services include logo design, brand identity, social media creatives, marketing graphics, banners, and digital assets for web and promotional platforms.",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "We help businesses strengthen their online presence through SEO, social media marketing, content strategy, and targeted digital campaigns. Our approach focuses on improving visibility, reaching the right audience, and creating measurable opportunities for business growth.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Services() {
  return (
    <section id="services" className="pt-9 md:pt-24 bg-secondary/20 relative">
      <div className="container mx-auto px-2 md:px-5 lg:px-12 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl flex justify-center items-center flex-col">
            <h2 className="text-[25px] md:text-5xl font-bold text-foreground tracking-tight mb-4">
              Everything you need to <span className="text-primary">ship.</span>
            </h2>
            <p className="text-[14px] text-muted-foreground font-normal text-blue-950 leading-5 text-center">
              We provide end-to-end digital product services. From initial
              concept to deployment, we handle the complex engineering so you
              can focus on the business.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group rounded-2xl p-0.5 ${
                hover
                  ? "bg-linear-to-r from-purple-500 via-pink-500 to-blue-500"
                  : "border-2 border-gray-800/60"
              }`}
            >
              <div className="bg-white rounded-[14px] p-8 h-full transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-0.5">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-foreground mb-6 group-hover:bg-blue-950 group-hover:text-white transition-all duration-300">
                  <service.icon size={24} />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed text-justify text-[14px]">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
