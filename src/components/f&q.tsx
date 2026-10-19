import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faq = [
  {
    question: "What services does StackGSB Studio offer?",
    answer:
      "StackGSB Studio provides Web Development, Graphic Design, and Digital Marketing services. We help businesses build professional digital experiences, create consistent visual identities, and strengthen their online presence.",
  },
  {
    question: "How much will my project cost?",
    answer:
      "Project pricing depends on the scope, complexity, features, design requirements, and services involved. Once we understand your requirements, we provide a clear estimate based on the actual work needed for your project.",
  },
  {
    question: "How long will it take to complete my project?",
    answer:
      "Timelines vary depending on the type and complexity of the project. A standard website or design project may take a few weeks, while custom development or larger digital projects may require more time. We define the expected timeline before starting the project.",
  },
  {
    question: "Can you work with my existing website or brand?",
    answer:
      "Yes. You don't always need to start from scratch. We can review your existing website, design assets, or digital presence and recommend improvements based on your current setup and business goals.",
  },
  {
    question: "Will my website be mobile-friendly and SEO-ready?",
    answer:
      "Yes. Our websites are built with responsive layouts, performance, usability, and SEO-friendly structure in mind. If you need ongoing search engine optimization and online growth support, we also provide Digital Marketing services.",
  },
  {
    question: "What happens after I contact StackGSB Studio?",
    answer:
      "We start by understanding your business, project requirements, goals, and expectations. Based on the discussion, we define the project scope, recommended approach, estimated timeline, and pricing before moving forward.",
  },
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((previous) => (previous === index ? null : index));
  };

  return (
    <section id="faq" className="bg-white py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
            FAQ
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
            Everything you need to know before starting your project with
            StackGSB Studio.
          </p>
        </motion.div>

        <div className="mx-auto flex max-w-4xl flex-col gap-3">
          {faq.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={item.question}
                className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
                  isOpen
                    ? "border-blue-400 shadow-sm"
                    : "border-gray-200 hover:border-blue-200"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-question-${index}`}
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="flex w-full items-center justify-between gap-5 p-5 text-left md:p-6"
                  >
                    <span className="text-base font-semibold text-gray-900 md:text-lg">
                      {item.question}
                    </span>

                    <ChevronDown
                      size={22}
                      aria-hidden="true"
                      className={`shrink-0 text-blue-800 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-7 text-gray-600 md:px-6 md:pb-6 md:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
