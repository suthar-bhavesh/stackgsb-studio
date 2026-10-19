import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  X,
  Plus,
  Minus,
  RotateCcw,
  Layers3,
  MousePointer2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

type Category =
  | "All Projects"
  | "Web Development"
  | "Graphic Design"
  | "Digital Marketing";

type ProjectType =
  | "Project"
  | "Concept Project"
  | "Personal Project"
  | "Client Project";

type Project = {
  id: number;
  title: string;
  category: Exclude<Category, "All Projects">;
  description: string;
  image: string;
  tags: string[];
  type: ProjectType;
  featured?: boolean;
  challenge: string;
  solution: string;
  outcome: string;
  liveUrl?: string;
};

const categories: Category[] = [
  "All Projects",
  "Web Development",
  "Graphic Design",
  "Digital Marketing",
];

const projects: Project[] = [
  {
    id: 1,
    title: "GolfImpact – Membership & Rewards Platform",
    category: "Web Development",
    description:
      "A modern golf membership platform featuring subscription plans, monthly prize draws, charity initiatives, and an engaging digital experience.",
    image: "/portfolio/golfimpact.png",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    type: "Project",
    featured: true,
    challenge:
      "Create an engaging digital platform where golf enthusiasts can explore membership benefits, understand monthly prize draws, and discover charitable initiatives.",
    solution:
      "Developed a responsive golf membership experience featuring subscription information, prize draw sections, featured charities, FAQs, and intuitive navigation.",
    outcome:
      "A deployed web application demonstrating modern interface design and membership-focused user journeys.",
    liveUrl: "https://golf-impact-cma7.vercel.app/",
  },
  {
    id: 2,
    title: "Real Estate Property Website",
    category: "Web Development",
    description:
      "A responsive property listing website concept designed to simplify property discovery and enquiries.",
    image: "/portfolio/real-estate.webp",
    tags: ["React", "Tailwind CSS", "UI/UX"],
    type: "Concept Project",
    challenge:
      "Property buyers need an easy way to explore listings and contact property agents.",
    solution:
      "A proposed website featuring property cards, listing details, responsive layouts, and enquiry actions.",
    outcome:
      "A concept illustrating a streamlined property discovery experience.",
  },
  {
    id: 3,
    title: "Product Showcase Website",
    category: "Web Development",
    description:
      "A product catalogue website concept with categories, product specifications, and customer enquiry options.",
    image: "/portfolio/product-showcase.webp",
    tags: ["Product Catalogue", "React", "Responsive Design"],
    type: "Concept Project",
    challenge:
      "Businesses need to display products and specifications clearly.",
    solution:
      "A proposed responsive catalogue with product categories, specification sections, and contact actions.",
    outcome:
      "A concept demonstrating structured product presentation and enquiry-focused design.",
  },
  {
    id: 4,
    title: "Restaurant Digital Experience",
    category: "Web Development",
    description:
      "A restaurant website concept featuring menus, food imagery, and mobile-friendly navigation.",
    image: "/portfolio/restaurant.webp",
    tags: ["React", "Mobile First", "UI/UX"],
    type: "Concept Project",
    challenge:
      "Restaurant visitors need convenient access to menus and contact information.",
    solution:
      "A proposed website with organized menus, restaurant information, and prominent contact options.",
    outcome:
      "A concept demonstrating an accessible restaurant browsing experience.",
  },
  {
    id: 5,
    title: "NOVA Skincare Website Design",
    category: "Web Development",
    description:
      "A modern skincare website concept featuring a clean blue-and-white aesthetic, elegant product presentation, and a responsive layout designed to create a premium shopping experience.",
    tags: ["Web Design", "UI/UX", "Responsive Design"],
    image: "/portfolio/NOVA%20Skincare%20Website.png",
    type: "Concept Project",
    challenge:
      "Skincare shoppers need a clear, appealing way to explore products and understand the brand.",
    solution:
      "A proposed website layout with a coordinated blue-and-white visual style, product presentation, and responsive page structure.",
    outcome:
      "A website design concept; the live website has not been represented as developed or launched.",
  },
  {
    id: 6,
    title: "Digital Campaign Creative Strategy",
    category: "Digital Marketing",
    description:
      "A sample digital marketing campaign strategy combining content planning and promotional creative direction.",
    image: "/portfolio/marketing.webp",
    tags: ["Campaign Planning", "Content Strategy", "Digital Marketing"],
    type: "Concept Project",
    challenge:
      "Businesses need structured marketing messages and consistent content planning.",
    solution:
      "A proposed campaign framework with content themes, creative direction, and measurement goals.",
    outcome: "A strategy concept without claimed live campaign results.",
  },
  {
    id: 7,
    title: "Brand Identity Design",
    category: "Graphic Design",
    description:
      "A brand identity concept exploring logo usage, typography, a coordinated colour palette, and branded visual applications.",
    image: "/portfolio/brand-identity.webp",
    tags: ["Brand Identity", "Typography", "Visual Design"],
    type: "Concept Project",
    challenge:
      "A business needs a consistent visual identity that can be recognised across its digital touchpoints.",
    solution:
      "A proposed identity system bringing together logo presentation, typography, colour direction, and sample brand applications.",
    outcome:
      "A visual concept showing how consistent brand elements can work together; it does not represent a commissioned client result.",
  },
  {
    id: 8,
    title: "Social Media Creative Design",
    category: "Graphic Design",
    description:
      "A set of sample social media creatives designed to present products, promotions, and brand messages in a clear visual format.",
    image: "/portfolio/social-media-creatives.webp",
    tags: [
      "Social Media Design",
      "Promotional Creatives",
      "Visual Communication",
    ],
    type: "Concept Project",
    challenge:
      "Brands need visually consistent posts that communicate key messages quickly across social platforms.",
    solution:
      "A proposed creative set using a consistent layout, readable typography, and coordinated brand styling.",
    outcome:
      "A sample creative direction for social content, without claiming campaign performance or client results.",
  },
  {
    id: 9,
    title: "SEO & Content Marketing Plan",
    category: "Digital Marketing",
    description:
      "A digital marketing concept outlining search visibility priorities, content themes, and a practical publishing roadmap.",
    image: "/portfolio/seo-content-strategy.webp",
    tags: ["SEO Strategy", "Content Planning", "Keyword Research"],
    type: "Concept Project",
    challenge:
      "Businesses need a structured way to plan useful content around their audience and search intent.",
    solution:
      "A proposed roadmap covering topic clusters, on-page SEO priorities, content formats, and measurement checkpoints.",
    outcome:
      "A strategy concept only; no traffic, ranking, or conversion results are claimed.",
  },
];

function ProjectImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 p-6 text-center text-blue-800 ${className}`}
        role="img"
        aria-label={`${alt} image unavailable`}
      >
        <div className="flex flex-col items-center gap-3">
          <Layers3 size={32} />
          <span className="text-sm font-medium">
            Project Preview Coming Soon
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(100);
  const previewRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const zoomIn = () => {
    setZoom((current) => Math.min(250, current + 25));
  };

  const zoomOut = () => {
    setZoom((current) => Math.max(100, current - 25));
  };

  const resetZoom = () => {
    setZoom(100);

    if (previewRef.current) {
      previewRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    }
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab" || !dialogRef.current) {
      return;
    }

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => element.getClientRects().length > 0);

    if (!focusable.length) return;

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

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-6"
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        aria-describedby="case-study-description"
        onKeyDown={handleKeyDown}
        initial={
          shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 15 }
        }
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={
          shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 15 }
        }
        transition={{ duration: 0.22 }}
        className="relative flex h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:h-[90dvh] sm:rounded-3xl"
      >
        {/* MODAL HEADER */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">
              Project Case Study
            </p>
            <p className="truncate text-sm font-semibold text-gray-900 sm:text-base">
              {project.title}
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close project case study"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-800 transition-colors hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* SCROLLABLE MODAL CONTENT */}
        <div className="portfolio-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {/* WEBSITE PREVIEW */}
          <div className="bg-[#07111f] p-3 sm:p-6">
            <div className="mx-auto max-w-4xl">
              {/* PREVIEW TOOLBAR */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-white">
                  <MousePointer2 size={16} className="text-blue-300" />
                  <span className="text-sm font-semibold">Website Preview</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={zoomOut}
                    disabled={zoom <= 100}
                    aria-label="Zoom out"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="min-w-[48px] text-center text-xs font-semibold tabular-nums text-white">
                    {zoom}%
                  </span>

                  <button
                    type="button"
                    onClick={zoomIn}
                    disabled={zoom >= 250}
                    aria-label="Zoom in"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Plus size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={resetZoom}
                    aria-label="Reset image zoom"
                    className="flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-3 text-xs font-semibold text-white transition-colors hover:bg-blue-500"
                  >
                    <RotateCcw size={14} />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                </div>
              </div>

              {/* INDEPENDENT SCREENSHOT SCROLLER */}
              <div
                ref={previewRef}
                tabIndex={0}
                aria-label={`Scrollable screenshot of ${project.title}`}
                className="portfolio-scroll h-[340px] w-full overflow-auto overscroll-contain rounded-xl border border-white/10 bg-[#020817] outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:h-[480px] lg:h-[540px]"
              >
                <div
                  className="bg-white"
                  style={{
                    width: `${zoom}%`,
                    minWidth: "100%",
                  }}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} project image`}
                    draggable={false}
                    className="block h-auto w-full max-w-none"
                  />
                </div>
              </div>

              <p className="mt-3 text-center text-xs leading-5 text-gray-400">
                Scroll inside the preview to explore the image. Use + and − to
                zoom.
              </p>
            </div>
          </div>

          {/* PROJECT INFORMATION */}
          <div className="mx-auto max-w-4xl space-y-7 px-5 py-8 sm:px-8 sm:py-10">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {project.category}
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                  {project.type}
                </span>
              </div>

              <h2
                id="case-study-title"
                className="text-2xl font-bold leading-tight text-[#071B49] sm:text-3xl"
              >
                {project.title}
              </h2>

              <p
                id="case-study-description"
                className="mt-4 text-sm leading-7 text-gray-600 sm:text-base"
              >
                {project.description}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: "The Challenge",
                  text: project.challenge,
                },
                {
                  title: "Our Solution",
                  text: project.solution,
                },
                {
                  title: "Project Outcome",
                  text: project.outcome,
                },
              ].map((section) => (
                <div
                  key={section.title}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
                >
                  <h3 className="mb-3 text-base font-bold text-[#071B49]">
                    {section.title}
                  </h3>

                  <p className="text-sm leading-7 text-gray-600">
                    {section.text}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold text-[#071B49]">
                Technologies & Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-blue-600"
              >
                View Live Website
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("All Projects");

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Our Work | StackGSB Studio";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  const filteredProjects =
    activeCategory === "All Projects"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <>
      <main className="min-h-screen bg-white text-gray-900">
        {/* PREMIUM PORTFOLIO HERO */}
        <section className="relative isolate overflow-hidden bg-[#071B49] px-4 pb-20 pt-32 text-white sm:px-6 md:pb-28 md:pt-40 lg:px-12">
          {/* Background effects */}
          <div className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-[110px]" />
          <div className="pointer-events-none absolute -bottom-40 left-1/4 h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-[100px]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-16">
            {/* LEFT CONTENT */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
                  Selected Work / Portfolio
                </span>
              </div>

              <h1 className="max-w-2xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-[58px]">
                We Build Digital
                <span className="mt-2 block bg-gradient-to-r from-blue-300 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                  Experiences That
                  <br />
                  Drive Growth.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-blue-100/75">
                Explore our web development, creative design, and digital
                solutions. Discover how we transform ideas into engaging, modern
                digital experiences.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-4 font-semibold text-white shadow-lg shadow-blue-900/30 transition-all hover:-translate-y-1 hover:bg-blue-500"
                >
                  Explore Our Work
                  <ArrowUpRight size={19} />
                </a>

                <a
                  href="#whatsapp-contact"
                  onClick={(e) => {
                    e.preventDefault();

                    document
                      .getElementById("whatsapp-contact")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                  }}
                  className="inline-flex items-center gap-3 rounded-full border border-white/25 px-7 py-4 font-semibold text-white transition-all hover:border-blue-300 hover:bg-white/10"
                >
                  Start a Project
                  <ArrowRight size={19} />
                </a>
              </div>

              {/* SERVICE HIGHLIGHTS */}
              <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-6">
                <span className="text-sm text-blue-200">✓ Web Development</span>
                <span className="text-sm text-blue-200">✓ Graphic Design</span>
                <span className="text-sm text-blue-200">
                  ✓ Digital Marketing
                </span>
              </div>
            </motion.div>

            {/* RIGHT VISUAL */}
            <motion.div
              initial={
                shouldReduceMotion ? false : { opacity: 0, x: 35, scale: 0.96 }
              }
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative mx-auto w-full max-w-[580px]"
            >
              <div className="absolute -inset-5 rounded-[40px] bg-blue-500/15 blur-3xl" />

              {/* Browser mockup */}
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0B152A] shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
                {/* Browser header */}
                <div className="flex items-center gap-3 border-b border-white/10 bg-[#101E38] px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  </div>

                  <div className="mx-auto max-w-[220px] flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-center text-[10px] text-white/50">
                    golf-impact-cma7.vercel.app
                  </div>
                </div>

                {/* Actual GolfImpact screenshot */}
                <div className="aspect-[4/3] overflow-hidden bg-[#020817]">
                  <img
                    src="/portfolio/golfimpact.png"
                    alt="GolfImpact website project screenshot"
                    className="h-full w-full object-cover object-top"
                    fetchPriority="high"
                  />
                </div>
              </div>

              {/* Floating project label */}
              <div className="absolute -bottom-5 left-3 right-3 flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-[#112A59]/95 p-4 shadow-2xl backdrop-blur-md sm:-bottom-7 sm:left-8 sm:right-8">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-300">
                    Featured Project
                  </p>
                  <h3 className="mt-1 truncate text-sm font-bold text-white sm:text-base">
                    GolfImpact – Membership Platform
                  </h3>
                </div>

                <a
                  href="https://golf-impact-cma7.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View GolfImpact live website"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-500"
                >
                  <ArrowUpRight size={20} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROJECT SECTION */}
        <section
          id="projects"
          className="scroll-mt-24 bg-gray-50 py-16 md:py-24"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="mb-10 max-w-3xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                Selected Work
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Explore Our <span className="text-blue-700">Projects</span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base">
                Explore selected digital work and clearly labelled concepts
                across web development, graphic design, and digital marketing.
              </p>
            </div>

            {/* CATEGORY FILTERS */}
            <div
              role="group"
              aria-label="Filter projects"
              className="mb-10 flex flex-wrap gap-3"
            >
              {categories.map((category) => {
                const active = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                      active
                        ? "border-blue-700 bg-blue-700 text-white shadow-md"
                        : "border-gray-200 bg-white text-gray-700 hover:border-blue-400 hover:text-blue-700"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* PREMIUM PROJECT CARDS */}
            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => (
                <motion.article
                  key={project.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-[26px] border border-[#183A76] bg-[#071B49] shadow-[0_18px_50px_rgba(7,27,73,0.13)] transition-shadow hover:shadow-[0_24px_65px_rgba(7,27,73,0.25)]"
                >
                  {/* PREMIUM BROWSER MOCKUP */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-[#173F86] via-[#102B62] to-[#06132E] p-5 sm:p-6">
                    <div className="pointer-events-none absolute -left-10 top-8 h-44 w-44 rounded-full bg-blue-400/20 blur-3xl" />
                    <div className="pointer-events-none absolute -right-12 bottom-0 h-48 w-48 rounded-full bg-indigo-400/20 blur-3xl" />
                    <div className="relative overflow-hidden rounded-xl border border-white/20 bg-[#09162E] shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02]">
                      <div className="flex items-center gap-2 border-b border-white/10 bg-[#152748] px-3 py-2.5">
                        <div
                          className="flex shrink-0 gap-1.5"
                          aria-hidden="true"
                        >
                          <span className="h-2 w-2 rounded-full bg-[#FF6A68]" />
                          <span className="h-2 w-2 rounded-full bg-[#F8C64F]" />
                          <span className="h-2 w-2 rounded-full bg-[#42C784]" />
                        </div>
                        <span className="mx-auto max-w-[70%] truncate rounded bg-white/10 px-2 py-0.5 text-center text-[9px] text-blue-100/75">
                          {project.liveUrl
                            ? new URL(project.liveUrl).hostname
                            : project.title}
                        </span>
                      </div>
                      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-[#eaf3ff] via-white to-[#cbdffb]">
                        <ProjectImage
                          src={project.image}
                          alt={`${project.title} project preview`}
                          className={`h-full w-full ${project.featured ? "object-cover object-top" : "object-contain"} transition-transform duration-700 group-hover:scale-[1.035]`}
                        />
                        {!project.featured && (
                          <span className="pointer-events-none absolute bottom-2 right-2 rounded-md border border-blue-100 bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-blue-800 shadow-sm backdrop-blur">
                            Design Concept
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="relative mt-4 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-medium text-blue-100/80">
                        {project.category}
                      </span>
                      <span className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-blue-100">
                        {project.type}
                      </span>
                    </div>
                  </div>

                  {/* CARD CONTENT */}
                  <div className="flex flex-1 flex-col p-6 text-white">
                    {project.featured && (
                      <span className="mb-4 w-fit rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-200">
                        Featured Project
                      </span>
                    )}
                    <h3 className="text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-blue-100/75">
                      {project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-blue-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
                      >
                        View Case Study <ArrowUpRight size={16} />
                      </button>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-semibold text-blue-200 transition-colors hover:text-white"
                        >
                          Live Website <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="rounded-2xl bg-white p-10 text-center text-gray-600">
                No projects available in this category yet.
              </div>
            )}
          </div>
        </section>

        {/* VALUE SECTION */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="mx-auto max-w-3xl text-center">
              <Layers3 size={32} className="mx-auto mb-5 text-blue-700" />

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                More Than Just Great Design
              </h2>

              <p className="mt-5 text-sm leading-8 text-gray-600 sm:text-base">
                We combine creative thinking, technical expertise, and business
                understanding to build digital experiences that support
                meaningful business goals.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-950 px-4 py-20 text-white sm:px-6 md:py-28">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
              Let's Build Together
            </p>

            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
              Have a Project in Mind?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-white/75 sm:text-base">
              Tell us about your business and the digital experience you want to
              create. Let's explore the possibilities together.
            </p>

            <div id="whatsapp-contact" className="scroll-mt-28">
              <Link
                to="/#contact"
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-blue-950 transition-colors hover:bg-blue-50"
              >
                Discuss Your Project
                <ArrowRight size={19} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* CASE STUDY MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
