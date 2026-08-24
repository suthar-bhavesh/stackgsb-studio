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

  const toggleFAQ = (index: number | SetStateAction<null>) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section>
      <div className="container mx-auto px-2 md:px-5 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-gray-500 mb-4">
            FAQ
          </p>

          <h2 className="text-[18px] md:text-5xl font-bold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto leading-7 md:text-[18px] text-[14px]">
            Everything you need to know before starting your project with
            StackGSB Studio.
          </p>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col mx-auto gap-2.5 max-w-244"
        >
          {faq.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className="border-2 border-gray-200 bg-white rounded-2xl"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="w-full flex justify-between gap-6 p-4"
                >
                  <h3 className="text-[18px] font-semibold text-gray-900 text-left">
                    {item.question}
                  </h3>

                  <ChevronDown
                    size={22}
                    className={`shrink-0 transition-transform duration-300 text-blue-900 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden px-4"
                    >
                      <p className="md:pb-6 md:pr-10 text-gray-600 leading-5 text-[14px] pb-4">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
