import { motion } from "framer-motion";

import NehaShah from "../assets/image/neha-shah.png";
import SnehaJoshi from "../assets/image/Sneha-Joshi.png";
import PriyaDesai from "../assets/image/Priya-Desai.png";
import RohanShah from "../assets/image/Rohan-Shah.png";
import AmitPatel from "../assets/image/Amit-Patel.png";
import KaranPatel from "../assets/image/Karan-Patel.png";
import MehulDesai from "../assets/image/Mehul-Desai.png";
import VikramMehta from "../assets/image/Vikram-Mehta.png";

const Testimonial = [
  {
    name: "Rahul Sharma",
    description:
      "Working with StackGSB Studio was a great experience from the very beginning. They took the time to understand our business, our customers, and what we wanted our website to achieve before starting the development. The team transformed our ideas into a clean, modern, and responsive website that looks professional across all devices. We especially appreciated their attention to detail and willingness to incorporate our feedback throughout the process. Everything from the design and navigation to the overall user experience was thoughtfully handled. The final website has given our business a much stronger online presence and has made it much easier for customers to understand what we offer. We are extremely happy with the final result.",
  },
  {
    name: "Neha Shah",
    image: NehaShah,
    description:
      "We came to StackGSB Studio with an early-stage idea and needed someone who could turn our concept into a professional digital product. The team did an excellent job of understanding our vision and translating it into a website that feels modern, intuitive, and aligned with our brand. They helped us make better decisions around structure, user experience, and functionality while keeping the development process straightforward. Communication was consistent, and they were always open to suggestions and improvements. The final product looks polished and performs exactly the way we expected. StackGSB Studio gave us a strong digital foundation that we can continue building on as our business grows.",
  },
  {
    name: "Amit Patel",
    image: AmitPatel,
    description:
      "Our experience with StackGSB Studio was better than we expected. We needed an e-commerce website that could showcase our products beautifully while providing customers with a simple and convenient shopping experience. The team paid close attention to product presentation, navigation, responsive design, and overall usability. They understood that the website needed to look premium without becoming complicated for customers. Throughout the project, they listened carefully to our feedback and made improvements quickly. The final website feels professional, performs smoothly, and represents our brand much better than our previous online presence. We are very pleased with the work and the professionalism shown throughout the project.",
  },
  {
    name: "Vikram Mehta",
    image: VikramMehta,
    description:
      "StackGSB Studio helped us create a website that finally reflects the quality of our services. Our previous online presence did not communicate our professionalism clearly, so we wanted something modern, trustworthy, and easy for potential customers to navigate. The team understood our requirements quickly and helped us improve both the visual presentation and the structure of our content. They paid attention to every important detail and made sure the website worked properly across different screen sizes. The development process was transparent and collaborative, and we always felt that our feedback was being taken seriously. The finished website has made a noticeable difference in how our business is presented online.",
  },
  {
    name: "Priya Desai",
    image: PriyaDesai,
    description:
      "What impressed us most about StackGSB Studio was their ability to combine strong design thinking with reliable technical development. We had a very specific idea for how we wanted our brand to feel online, but bringing that vision to life required more than simply creating a good-looking website. The team understood our creative direction and turned it into a digital experience that feels distinctive, polished, and easy to use. They were thoughtful about typography, spacing, interactions, responsiveness, and the overall flow of the website. The result feels authentic to our brand while still maintaining excellent usability. It was a pleasure working with a team that genuinely cared about the final experience.",
  },
  {
    name: "Karan Patel",
    image: KaranPatel,
    description:
      "We were looking for a professional website that could present our real estate services and property listings in a clear and attractive way. StackGSB Studio understood our requirements and created a website that is both visually impressive and practical for our customers. The property information is easy to find, the navigation feels natural, and the website works smoothly on mobile devices as well as desktop. We also appreciated how patiently the team handled our revisions and suggestions during development. They maintained a professional approach throughout the project and delivered everything with great attention to detail. The new website has significantly improved the way we present our business to potential clients.",
  },
  {
    name: "Sneha Joshi",
    image: SnehaJoshi,
    description:
      "StackGSB Studio helped us build a website that makes our services much easier for students and visitors to understand. We wanted a clean and informative platform without overwhelming users with too much information, and the team achieved that balance very well. They organised the content into a clear structure and created an interface that feels modern, accessible, and easy to navigate. The website also performs well across mobile, tablet, and desktop devices. Throughout the project, the team was responsive to our feedback and always willing to improve the details. We are very satisfied with the final website and the overall experience of working with StackGSB Studio.",
  },
  {
    name: "Rohan Shah",
    image: RohanShah,
    description:
      "Professionalism and clarity were extremely important to us when developing our website, and StackGSB Studio understood that from day one. They created a clean and trustworthy digital experience that makes our services easier for customers to understand. The design is modern without being distracting, and the overall navigation is simple and intuitive. We particularly appreciated the technical attention given to responsiveness, performance, and functionality. The team communicated clearly throughout the development process and handled our requirements with patience and professionalism. The final website gives our business a much stronger digital identity and has helped us present our services with greater confidence.",
  },
  {
    name: "Mehul Desai",
    image: MehulDesai,
    description:
      "As a small business, we wanted a website that looked professional without losing the personality of our brand. StackGSB Studio understood exactly what we were looking for and made the entire process much easier than we expected. They guided us through the design and development process, listened to our ideas, and suggested improvements where necessary. The website turned out to be modern, fast, responsive, and very easy for our customers to use. We were especially impressed by the attention given to small design details that made the final result feel much more premium. It has given our business a professional online presence that we can confidently share with customers.",
  },
];

export function Testimonials() {
  return (
    <section className="py-9 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-2 md:px-5 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col justify-center items-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Testimonials
          </h2>

          <p className="text-muted-foreground max-w-2xl text-[14px] text-center">
            What our clients say about the digital experiences we've built
            together.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
          {Testimonial.map((ClientFeedback, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="p-6 rounded-2xl border-2 border-border bg-white hover:border-2 hover:border-blue-800 hover:transition-all hover:shadow-2xl"
            >
              {/* Client */}

              <div className="flex items-center gap-4 mb-5">
                {ClientFeedback.image && (
                  <img
                    src={ClientFeedback.image}
                    alt={ClientFeedback.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}

                <div>
                  <h3 className="font-semibold text-foreground">
                    {ClientFeedback.name}
                  </h3>

                  <div className="flex gap-1 text-yellow-500 text-sm">
                    ★★★★★
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-justify text-[14px]">
                "{ClientFeedback.description}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
