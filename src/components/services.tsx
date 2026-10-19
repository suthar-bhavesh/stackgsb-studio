import { motion } from "framer-motion";
import { Layers, TrendingUp, PenTool, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Layers,
    title: "Web Development",
    description:
      "We build responsive, secure, and scalable websites tailored to your business goals. From UI/UX and frontend development to backend systems, API integrations, performance optimization, and ongoing maintenance, we create reliable digital experiences built to grow with your business.",
  },
  {
    icon: PenTool,
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
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55 },
  },
};

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-gray-50 py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
            Our Services
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-5xl">
            Digital Solutions for{" "}
            <span className="text-blue-700">Your Business</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
            From building professional websites to creating powerful brand
            identities and digital marketing strategies, we help businesses
            establish and strengthen their digital presence.
          </p>
        </motion.div>

        {/* Service cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                variants={itemVariants}
                className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl md:p-8"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-800 transition-colors duration-300 group-hover:bg-blue-800 group-hover:text-white">
                  <Icon size={25} aria-hidden="true" />
                </div>

                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mb-8 flex-1 text-sm leading-7 text-gray-600">
                  {service.description}
                </p>

                <Link
                  to="/#contact"
                  className="inline-flex w-fit items-center gap-2 font-semibold text-blue-800 transition-colors hover:text-blue-600"
                  aria-label={`Enquire about ${service.title}`}
                >
                  Get Started
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
