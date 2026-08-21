import { motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import Footer from "../components/footer";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
const StackGSBCretivity = new URL(
  "../assets/image/StackGSB Creativity.png",
  import.meta.url,
).href;
const AboutHeroImage = new URL(
  "../assets/image/about-hero-img.png",
  import.meta.url,
).href;

const AboutUs = () => {
  const [isWPmodalOpen, setisWPmodalopen] = useState(false);
  const [hidden, sethidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;
      sethidden(atBottom);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollBy({ top: window.innerHeight, left: 0, behavior: "smooth" });
  };

  const [clientData, setclientData] = useState({
    name: "",
    message: "",
  });

  const phoneNumber = "9156105449";

  const handleWhatsAppSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = `Hello StackGSB Studio,

My name is ${clientData.name}.

I would like to discuss a project with you.

Project Details:
${clientData.message}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");

    setisWPmodalopen(false);

    setclientData({
      name: "",
      message: "",
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: { key: string }) => {
      if (e.key === "Escape" && isWPmodalOpen) {
        setisWPmodalopen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isWPmodalOpen]);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const textArea = textAreaRef.current;

    if (textArea) {
      textArea.style.height = "auto";

      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    document.title = "About Us | StackGSB Studio";
  }, []);
  return (
    <>
      <main className="bg-background text-foreground overflow-hidden">
        {/* ================= HERO ================= */}
        <section className="relative min-h-170 md:min-h-180 overflow-hidden bg-[#05072a] mb-14">
          {/* ================= BACKGROUND IMAGE ================= */}
          <img
            src={AboutHeroImage}
            alt="StackGSB Studio digital solutions"
            className="
      absolute inset-0
      w-full h-full
      object-cover
      object-[68%_center]
      md:object-center
    "
          />

          {/* ================= DESKTOP OVERLAY ================= */}
          <div
            className="
      hidden md:block
      absolute inset-0
      bg-linear-to-r
      from-[#05072a]
      via-[#05072a]/90
      to-transparent
    "
          />

          {/* ================= MOBILE OVERLAY ================= */}
          <div
            className="
      md:hidden
      absolute inset-0
      bg-linear-to-b
      from-[#05072a]/70
      via-[#05072a]/80
      to-[#05072a]/95
    "
          />

          {/* ================= HERO CONTENT ================= */}
          <div
            className="
      relative z-10
      container mx-auto
       px-4 md:px-12
      min-h-170 md:min-h-180
      flex items-center
    "
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-3xl pt-20 md:pt-24"
            >
              {/* Label */}
              <div className="flex items-center gap-3">
                <span className="w-8 h-0.5 bg-blue-800"></span>
                <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-blue-300">
                  About StackGSB Studio
                </p>
              </div>

              {/* Heading */}
              <h1
                className="
          text-4xl
          sm:text-5xl
          md:text-6xl
          lg:text-[4.7rem]
          font-semibold
          tracking-tight
          leading-[1.08]
          text-white
        "
              >
                Building digital
                <span className="block">Solutions that</span>
                <span className="block text-blue-300">
                  Move businesses Forward.
                </span>
              </h1>

              {/* Description */}
              <p
                className="
          mt-7
          max-w-2xl
          text-base
          text-[14px]
          leading-5
          text-white/75
        "
              >
                StackGSB Studio helps businesses transform ideas into modern
                digital experiences through web development, custom software,
                e-commerce, UI/UX design, and scalable technology solutions.
              </p>
            </motion.div>
          </div>

          {/* ================= SCROLL INDICATOR ================= */}
          <button
            onClick={handleClick}
            aria-label="Scroll down"
            className={`
      absolute
      bottom-6
      left-1/2
      -translate-x-1/2
      z-20
      flex
      flex-col
      items-center
      cursor-pointer
      group
      transition-opacity
      duration-300

      ${hidden ? "opacity-0 pointer-events-none" : "opacity-100"}
    `}
          >
            {/* Mouse */}
            <div
              className="
        relative
        w-6.5
        h-10.5
        border-2
        border-white
        rounded-full
        group-hover:border-cyan-400
        transition-colors
        duration-300
      "
            >
              <span
                className="
          absolute
          left-1/2
          -translate-x-1/2
          top-1.5
          w-1
          h-2
          bg-white
          rounded-full
          animate-wheel
        "
              />
            </div>

            {/* Arrows */}
            <div className="mt-2 flex flex-col items-center">
              <span
                className="
          w-2.5
          h-2.5
          border-r-2
          border-b-2
          border-white
          rotate-45
          -mt-1
          animate-arrow
          group-hover:border-cyan-400
          transition-colors
        "
              />

              <span
                className="
          w-2.5
          h-2.5
          border-r-2
          border-b-2
          border-white
          rotate-45
          -mt-1
          animate-arrow
          group-hover:border-cyan-400
          transition-colors
        "
                style={{ animationDelay: "0.2s" }}
              />

              <span
                className="
          w-2.5
          h-2.5
          border-r-2
          border-b-2
          border-white
          rotate-45
          -mt-1
          animate-arrow
          group-hover:border-cyan-400
          transition-colors
        "
                style={{ animationDelay: "0.4s" }}
              />
            </div>
          </button>
        </section>

        {/* ================= INTRO ================= */}
        <section className="relative py-0 md:py-14 bg-background overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 md:px-12 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* LEFT CONTENT */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-6"
              >
                <p className="text-sm uppercase tracking-[0.25em] text-blue-700 mb-5">
                  Who We Are
                </p>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
                  Building digital solutions
                  <span className="block text-muted-foreground">
                    around real business needs.
                  </span>
                </h2>

                <div className="mt-8 space-y-5 text-[14px] leading-relaxed text-muted-foreground">
                  <p>
                    StackGSB Studio is a technology-focused digital solutions
                    studio helping businesses build modern websites, custom web
                    applications, e-commerce platforms, and software solutions
                    designed around their goals, workflows, and customers.
                  </p>

                  <p>
                    We combine strategic thinking, UI/UX design, and modern
                    development practices to create digital products that are
                    responsive, scalable, easy to use, and prepared for
                    long-term growth.
                  </p>

                  <p>
                    From planning and interface design to development,
                    performance optimization, deployment, and ongoing technical
                    support, our focus is on creating reliable digital
                    experiences that solve real problems and deliver practical
                    business value.
                  </p>
                </div>
              </motion.div>

              {/* RIGHT CARDS */}
              <div className="lg:col-span-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="sm:col-span-2 p-7 md:p-8 rounded-3xl bg-blue-950 text-white shadow-xl"
                  >
                    <span className="text-sm uppercase tracking-[0.2em] text-blue-300">
                      Our Focus
                    </span>

                    <h3 className="mt-4 text-2xl md:text-3xl font-semibold">
                      Technology that supports business growth
                    </h3>

                    <p className="mt-4 text-white/65 leading-relaxed">
                      We create digital solutions with performance, usability,
                      scalability, and business objectives in mind from the
                      beginning.
                    </p>
                  </motion.article>

                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="p-6 md:p-7 rounded-3xl border border-border bg-white shadow-sm hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                      <span className="text-blue-700 font-semibold">01</span>
                    </div>

                    <h3 className="text-xl font-semibold">Business First</h3>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      We understand your business goals and requirements before
                      choosing the right technology or development approach.
                    </p>
                  </motion.article>

                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="p-6 md:p-7 rounded-3xl border border-border bg-white shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                      <span className="text-blue-700 font-semibold">02</span>
                    </div>

                    <h3 className="text-xl font-semibold">
                      User-Centered Design
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      We design clear and intuitive digital experiences that
                      make websites and applications easier to understand and
                      use.
                    </p>
                  </motion.article>

                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="p-6 md:p-7 rounded-3xl border border-border bg-white shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                      <span className="text-blue-700 font-semibold">03</span>
                    </div>

                    <h3 className="text-xl font-semibold">
                      Scalable Development
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      We build maintainable and performance-focused solutions
                      that can adapt as your business requirements evolve.
                    </p>
                  </motion.article>

                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="p-6 md:p-7 rounded-3xl border border-border bg-white shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                      <span className="text-blue-700 font-semibold">04</span>
                    </div>

                    <h3 className="text-xl font-semibold">Reliable Delivery</h3>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      We focus on clean development, performance, testing, and
                      clear communication throughout the project lifecycle.
                    </p>
                  </motion.article>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= DESIGN + ENGINEERING ================= */}
        <section className="bg-muted/30 py-14">
          <div className="container mx-auto px-4 md:px-12">
            <div className="flex justify-between items-center flex-col md:flex-row gap-4">
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground mb-6">
                  Design × Engineering
                </p>

                <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                  Where creativity
                  <span className="block text-muted-foreground ">
                    meets&nbsp;
                    <span className="text-blue-800">technology.</span>
                  </span>
                </h2>

                <p className="mt-8 text-[14px] text-muted-foreground leading-relaxed max-w-xl text-justify">
                  Great digital products require more than beautiful interfaces.
                  They need thoughtful architecture, clean development, strong
                  performance, and a clear understanding of the people using
                  them.
                </p>
              </motion.div>

              {/* Code Card */}
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="overflow-hidden rounded-2xl w-fit h-fit flex"
              >
                <img
                  src={StackGSBCretivity}
                  alt="Design and Creativity"
                  className="w-full h-full md:w-150 md:h-150 shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden md:py-28">
          <div className="relative container mx-auto px-4 md:px-12 mb-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6 justify-center max-w-5xl mx-auto text-center bg-white rounded-2xl p-5 md:p-12 shadow-2xl"
            >
              <h3 className="font-bold text-2xl">
                Why Choose StackGSB Studio?
              </h3>

              <p className="text-justify text-[14px]">
                At StackGSB Studio, we believe great digital solutions come from
                the right balance of creativity, technology, and a clear
                understanding of business goals. We don't just build websites or
                applications, we create digital experiences that are
                thoughtfully designed, technically reliable, and built to solve
                real problems. Our approach focuses on understanding your
                requirements first, choosing the right technology for the
                project, and developing solutions that are easy to use,
                maintain, and scale as your business grows.
              </p>
              <p className="text-justify text-[14px]">
                From modern websites and responsive web applications to
                e-commerce platforms, custom software, UI/UX design, and ongoing
                technical support, we focus on delivering quality at every stage
                of the process. We value clean development, performance,
                security, attention to detail, and transparent communication, so
                you always have a clear understanding of your project's
                progress. Whether you're launching a new idea, improving an
                existing product, or taking your business online, StackGSB
                Studio works as a technology partner focused on building
                solutions that create lasting value for your business.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="relative overflow-hidden py-28 md:py-36 bg-blue-950 text-white md:mt-0">
          {/* Background Glow */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

          <div className="relative container mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto text-center"
            >
              {/* Label */}
              <p className="text-sm uppercase tracking-[0.3em] text-blue-300 mb-6">
                Let's Work Together
              </p>

              {/* Heading */}
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]">
                Have something
                <span className="block text-white/40">worth building?</span>
              </h2>

              {/* Description */}
              <p className="mt-8 text-[14px] text-white/60 max-w-2xl mx-auto leading-relaxed">
                Whether you're starting something new or looking to improve what
                already exists, we'd love to hear about it. Let's explore what
                StackGSB Studio can build with you.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                <motion.button
                  type="button"
                  onClick={() => setisWPmodalopen(true)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-blue-950 font-semibold transition-all hover:shadow-xl hover:shadow-white/10"
                >
                  Start a Project
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {isWPmodalOpen && (
            <div
              className="fixed inset-0 z-9999 flex items-center justify-center px-5 bg-black/60 backdrop-blur-sm"
              onClick={() => setisWPmodalopen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-2xl text-gray-900"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setisWPmodalopen(false)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center text-xl transition"
                >
                  ×
                </button>

                {/* Header */}
                <div className="mb-7 pr-8">
                  <p className="text-xs uppercase tracking-[0.25em] text-blue-600 mb-2">
                    Start a Project
                  </p>

                  <h3 className="text-2xl md:text-3xl font-bold text-blue-950">
                    Start Your Project with StackGSB Studio
                  </h3>

                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                    Share a few details and continue the conversation directly
                    on WhatsApp.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="client-name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Your Name
                    </label>

                    <input
                      id="client-name"
                      type="text"
                      value={clientData.name}
                      onChange={(e) =>
                        setclientData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Enter your name"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:bg-white focus:border-blue-900 focus:ring-4 focus:ring-blue-900/10 transition"
                    />
                  </div>

                  {/* Project Details */}
                  <div>
                    <label
                      htmlFor="client-message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Tell us about your project
                    </label>

                    <textarea
                      id="client-message"
                      rows={5}
                      value={clientData.message}
                      onChange={(e) =>
                        setclientData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      placeholder="What would you like to build?"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:bg-white focus:border-blue-900 focus:ring-4 focus:ring-blue-900/10 transition resize-none"
                    />
                  </div>

                  {/* WhatsApp Button */}
                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5"
                  >
                    Continue on WhatsApp
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    Your message will open directly in WhatsApp.
                  </p>
                </form>
              </motion.div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
