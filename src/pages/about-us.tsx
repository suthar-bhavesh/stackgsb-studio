import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  X,
  Target,
  Lightbulb,
  Code2,
  ShieldCheck,
} from "lucide-react";
import Footer from "../components/footer";

import StackGSBCreativity from "/image/StackGSB Creativity.png";
import AboutHeroImage from "/image/about-hero-img.png";

// Replace with your actual business WhatsApp number.
// Country code + 10 digits, without + or spaces.
const WHATSAPP_NUMBER = "919156105449";

const values = [
  {
    icon: Target,
    number: "01",
    title: "Business First",
    description:
      "We understand your business goals and requirements before choosing the right technology or development approach.",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "User-Centered Design",
    description:
      "We design clear and intuitive digital experiences that make websites and applications easier to understand and use.",
  },
  {
    icon: Code2,
    number: "03",
    title: "Scalable Development",
    description:
      "We build maintainable and performance-focused solutions that can adapt as your business requirements evolve.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Reliable Delivery",
    description:
      "We focus on clean development, performance, testing, and clear communication throughout the project lifecycle.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

type ProjectForm = {
  name: string;
  message: string;
};

export default function AboutUs() {
  const reduceMotion = useReducedMotion();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientData, setClientData] = useState<ProjectForm>({
    name: "",
    message: "",
  });

  const [isScrollVisible, setIsScrollVisible] = useState(true);
  const [formError, setFormError] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const scrollTargetRef = useRef<HTMLElement>(null);

  const animationProps = reduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.15 },
        variants: fadeUp,
        transition: { duration: 0.55 },
      };

  // Page title and description
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "About Us | StackGSB Studio";

    const description =
      "Learn about StackGSB Studio, offering web development, graphic design, and digital marketing services for businesses.";

    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );

    const created = !meta;
    const previousDescription = meta?.content ?? "";

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content = description;

    return () => {
      document.title = previousTitle;

      if (created) {
        meta?.remove();
      } else if (meta) {
        meta.content = previousDescription;
      }
    };
  }, []);

  // Scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      const pageHeight = document.documentElement.scrollHeight;

      const atBottom = window.innerHeight + window.scrollY >= pageHeight - 100;

      setIsScrollVisible(!atBottom);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Modal keyboard and scroll management
  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) {
        return;
      }

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href]",
        ),
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      openButtonRef.current?.focus();
    };
  }, [isModalOpen]);

  const scrollToIntro = () => {
    scrollTargetRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const handleWhatsAppSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = clientData.name.trim();
    const project = clientData.message.trim();

    if (!name || !project) {
      setFormError("Please enter your name and project details.");
      return;
    }

    if (!/^\d{11,15}$/.test(WHATSAPP_NUMBER)) {
      setFormError("Business WhatsApp number is not configured.");
      return;
    }

    const message = `Hello StackGSB Studio,

My name is ${name}.

I would like to discuss a project with you.

Project Details:
${project}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;

    // Navigate in the current tab to avoid popup blocking.
    window.location.assign(whatsappUrl);
  };

  return (
    <>
      <main className="overflow-x-clip bg-white text-gray-900">
        {/* HERO */}
        <section className="relative flex min-h-[650px] items-center overflow-hidden bg-[#05072a] md:min-h-[720px]">
          <img
            src={AboutHeroImage}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[68%_center] md:object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#05072a]/70 via-[#05072a]/85 to-[#05072a]/95 md:bg-gradient-to-r md:from-[#05072a] md:via-[#05072a]/90 md:to-transparent" />

          <div className="container relative z-10 mx-auto px-4 py-32 sm:px-6 lg:px-12">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="max-w-3xl"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-0.5 w-8 bg-blue-400" />

                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300 sm:text-sm">
                  About StackGSB Studio
                </p>
              </div>

              <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Building Digital
                <span className="block">Solutions That</span>
                <span className="block text-blue-300">
                  Move Businesses Forward.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
                At StackGSB Studio, we combine web development, graphic design,
                and digital marketing to help businesses build stronger digital
                experiences, establish their brand identity, and grow their
                online presence.
              </p>
            </motion.div>
          </div>

          <button
            type="button"
            onClick={scrollToIntro}
            aria-label="Scroll to Who We Are section"
            tabIndex={isScrollVisible ? 0 : -1}
            className={`absolute bottom-7 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/40 p-3 text-white transition-all hover:border-blue-300 hover:text-blue-300 ${
              isScrollVisible ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <ArrowDown
              size={22}
              className={reduceMotion ? "" : "animate-bounce"}
            />
          </button>
        </section>

        {/* WHO WE ARE */}
        <section
          ref={scrollTargetRef}
          id="who-we-are"
          className="scroll-mt-24 bg-white py-16 md:py-24"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
              {/* LEFT */}
              <motion.div {...animationProps} className="lg:col-span-6">
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
                  Who We Are
                </p>

                <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  Building digital solutions
                  <span className="block text-gray-500">
                    around real business needs.
                  </span>
                </h2>

                <div className="mt-8 space-y-5 text-sm leading-8 text-gray-600 sm:text-base">
                  <p>
                    StackGSB Studio is a digital solutions studio helping
                    businesses build modern websites, custom web applications,
                    e-commerce platforms, and software solutions designed around
                    their goals, workflows, and customers.
                  </p>

                  <p>
                    We combine strategic thinking, UI/UX design, graphic design,
                    digital marketing, and modern development practices to
                    create experiences that are responsive, scalable, and easy
                    to use.
                  </p>

                  <p>
                    From planning and design to development, performance
                    optimization, deployment, and ongoing support, our focus is
                    on creating reliable solutions that solve real problems and
                    deliver practical business value.
                  </p>
                </div>
              </motion.div>

              {/* RIGHT */}
              <div className="lg:col-span-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <motion.article
                    {...animationProps}
                    className="rounded-3xl bg-blue-950 p-7 text-white shadow-lg sm:col-span-2 md:p-8"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                      Our Focus
                    </p>

                    <h3 className="mt-4 text-2xl font-semibold md:text-3xl">
                      Technology that supports business growth
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/75">
                      We create digital solutions with performance, usability,
                      scalability, and business objectives in mind from the
                      beginning.
                    </p>
                  </motion.article>

                  {values.map((value) => {
                    const Icon = value.icon;

                    return (
                      <motion.article
                        key={value.number}
                        {...animationProps}
                        className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg md:p-7"
                      >
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-800 transition-colors group-hover:bg-blue-800 group-hover:text-white">
                          <Icon size={23} aria-hidden="true" />
                        </div>

                        <span className="text-xs font-semibold tracking-widest text-blue-700">
                          {value.number}
                        </span>

                        <h3 className="mt-2 text-lg font-semibold text-gray-900">
                          {value.title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-gray-600">
                          {value.description}
                        </p>
                      </motion.article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DESIGN + ENGINEERING */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <motion.div {...animationProps}>
                <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
                  Design × Engineering
                </p>

                <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                  Where creativity
                  <span className="block text-gray-500">
                    meets <span className="text-blue-800">technology.</span>
                  </span>
                </h2>

                <p className="mt-7 max-w-xl text-sm leading-8 text-gray-600 sm:text-base">
                  Great digital products require more than beautiful interfaces.
                  They need thoughtful architecture, clean development, strong
                  performance, and a clear understanding of the people using
                  them.
                </p>
              </motion.div>

              <motion.div
                {...animationProps}
                className="overflow-hidden rounded-3xl bg-white shadow-xl"
              >
                <img
                  src={StackGSBCreativity}
                  alt="StackGSB Studio creativity and technology illustration"
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-contain"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              {...animationProps}
              className="mx-auto max-w-5xl rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8 lg:p-12"
            >
              <div className="mb-8 text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                  Why Choose Us
                </p>

                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                  Why Choose StackGSB Studio?
                </h2>
              </div>

              <div className="space-y-6 text-sm leading-8 text-gray-600 sm:text-base">
                <p>
                  At StackGSB Studio, we believe great digital solutions come
                  from the right balance of creativity, technology, and a clear
                  understanding of business goals. We don't just build websites
                  or applications; we create digital experiences that are
                  thoughtfully designed, technically reliable, and built to
                  solve real problems.
                </p>

                <p>
                  Our approach focuses on understanding your requirements first,
                  choosing the right technology for the project, and developing
                  solutions that are easy to use, maintain, and scale as your
                  business grows.
                </p>

                <p>
                  From modern websites and responsive web applications to
                  e-commerce platforms, graphic design, digital marketing, and
                  ongoing technical support, we focus on quality, performance,
                  attention to detail, and transparent communication throughout
                  the project.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-blue-950 py-20 text-white md:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"
          />

          <div className="container relative mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              {...animationProps}
              className="mx-auto max-w-4xl text-center"
            >
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
                Let's Work Together
              </p>

              <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-6xl lg:text-7xl">
                Have something
                <span className="block text-white/50">worth building?</span>
              </h2>

              <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-white/75 sm:text-base">
                Whether you're starting something new or looking to improve what
                already exists, we'd love to hear about it. Let's explore what
                StackGSB Studio can build with you.
              </p>

              <button
                ref={openButtonRef}
                type="button"
                onClick={() => {
                  setFormError("");
                  setIsModalOpen(true);
                }}
                className="group mt-9 inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-blue-950 transition-all hover:-translate-y-1 hover:bg-blue-50 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Start a Project
                <ArrowRight
                  size={19}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* PROJECT ENQUIRY MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/65 px-4 py-6 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsModalOpen(false);
              }
            }}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              aria-describedby="project-modal-description"
              initial={
                reduceMotion ? false : { opacity: 0, scale: 0.96, y: 20 }
              }
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.96, y: 15 }
              }
              transition={{ duration: 0.25 }}
              className="relative my-auto max-h-[calc(100dvh-3rem)] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 text-gray-900 shadow-2xl sm:p-8"
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close project form"
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-blue-700"
              >
                <X size={20} />
              </button>

              <div className="mb-7 pr-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                  Start a Project
                </p>

                <h2
                  id="project-modal-title"
                  className="text-2xl font-bold leading-tight text-blue-950 sm:text-3xl"
                >
                  Start Your Project with StackGSB Studio
                </h2>

                <p
                  id="project-modal-description"
                  className="mt-3 text-sm leading-7 text-gray-600"
                >
                  Share a few details and continue the conversation directly on
                  WhatsApp.
                </p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="project-client-name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Your Name
                  </label>

                  <input
                    ref={nameInputRef}
                    id="project-client-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    maxLength={100}
                    required
                    value={clientData.name}
                    onChange={(event) => {
                      setFormError("");
                      setClientData((previous) => ({
                        ...previous,
                        name: event.target.value,
                      }));
                    }}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:bg-white focus:ring-4 focus:ring-blue-900/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="project-client-message"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Tell us about your project
                  </label>

                  <textarea
                    id="project-client-message"
                    name="message"
                    rows={5}
                    maxLength={2000}
                    required
                    value={clientData.message}
                    onChange={(event) => {
                      setFormError("");
                      setClientData((previous) => ({
                        ...previous,
                        message: event.target.value,
                      }));
                    }}
                    placeholder="What would you like to build?"
                    className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:bg-white focus:ring-4 focus:ring-blue-900/10"
                  />
                </div>

                {formError && (
                  <p role="alert" className="text-sm font-medium text-red-600">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-3.5 font-semibold text-white transition-all hover:bg-[#20bd5a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                >
                  Continue on WhatsApp
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <p className="text-center text-xs text-gray-500">
                  Your message will open directly in WhatsApp. It will only be
                  sent after you confirm it there.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
