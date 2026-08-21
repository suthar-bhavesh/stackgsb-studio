import { motion } from "framer-motion";
import { Send, ArrowRight } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

import StackGSBpic from "../assets/image/StackGSB.png";

const EnquiryApi = import.meta.env.VITE_API_URL;

if (!EnquiryApi) {
  throw new Error("VITE_API_URL is not configured.");
}

export function ContactUS() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "phonenumber" ? value.replace(/\D/g, "") : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await axios.post(
        `${EnquiryApi}/api/enquiries`,
        formData,
      );

      if (response.data.success) {
        setSuccess(
          "Thank you! Your enquiry has been submitted successfully. We'll get back to you soon.",
        );

        setFormData({
          name: "",
          email: "",
          phonenumber: "",
          service: "",
          message: "",
        });
      }
    } catch (err) {
      console.error("Contact form error:", err);

      setError(
        (err as any).response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="py-9 md:py-24 bg-[#f5f5f5] overflow-hidden"
      id="contact"
    >
      <div className="container mx-auto px-2 md:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col justify-center items-center"
        >
          <h2 className="text-[18px] md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Contact Us
          </h2>

          <p className="text-gray-600 max-w-xl text-[13px] text-center">
            Have a project in mind? Get in touch with StackGSB Studio and let's
            build something great together.
          </p>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 bg-white overflow-hidden border border-gray-100 rounded-2xl"
        >
          {/* Left Image */}
          <div className="relative min-h-87.5 lg:min-h-162.5 overflow-hidden bg-white">
            <img
              src={StackGSBpic}
              alt="StackGSB Studio"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>

          {/* Right Content */}
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="flex flex-col h-full">
              {/* Badge */}
              <div className="inline-flex w-fit items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200 mb-5">
                <Send size={16} className="text-blue-950" />

                <span className="text-xs font-semibold tracking-wider text-blue-900 uppercase">
                  Contact Us
                </span>
              </div>

              {/* Heading */}
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Send Us a Message
                </h2>

                <p className="text-gray-600 text-sm leading-6">
                  Fill in the details and we'll get back to you within 24 hours.
                </p>
              </div>

              {/* Success Message */}
              {success && (
                <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {success}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition"
                    required
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      id="phonenumber"
                      name="phonenumber"
                      value={formData.phonenumber}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      inputMode="numeric"
                      autoComplete="tel"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition"
                      required
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Service
                  </label>

                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition bg-white"
                    required
                  >
                    <option value="">Select a service</option>

                    <option value="Website Development">
                      Website Development
                    </option>

                    <option value="Graphic Design">Graphic Design</option>

                    <option value="UI/UX Design">UI/UX Design</option>

                    <option value="Digital Marketing">Digital Marketing</option>

                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition resize-none"
                    required
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full items-center justify-center gap-2 px-6 py-3 bg-blue-950 text-white font-medium rounded-lg hover:bg-blue-900 transition flex hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
