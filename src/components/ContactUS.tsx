import { motion } from "framer-motion";
import { Send, ArrowRight } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { CountrySelector, defaultCountries } from "react-international-phone";
import "react-international-phone/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import StackGSBpic from "../assets/image/StackGSB.png";

const EnquiryApi = import.meta.env.VITE_API_URL;

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
  const [errors, setErrors] = useState("");

  const [fieldErrors, setfieldErrors] = useState({
    name: "",
    email: "",
    phonenumber: "",
    service: "",
    message: "",
  });

  const [country, setcountry] = useState("in");
  const [dialCode, setdialCode] = useState("91");
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setfieldErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSuccess("");
    setErrors("");

    const newErrors = {
      name: "",
      email: "",
      phonenumber: "",
      service: "",
      message: "",
    };

    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone Validation
    const fullPhoneNumber = `+${dialCode}${formData.phonenumber}`;
    const phoneNumber = parsePhoneNumberFromString(fullPhoneNumber);

    if (!formData.phonenumber.trim()) {
      newErrors.phonenumber = "Please enter your phone number.";
    } else if (!phoneNumber || !phoneNumber.isValid()) {
      newErrors.phonenumber = "Please enter a valid phone number.";
    }

    // Service Validation
    if (!formData.service) {
      newErrors.service = "Please select a service.";
    }

    // Message Validation
    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
    }

    setfieldErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      (errorMessage) => errorMessage !== "",
    );

    if (hasErrors) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${EnquiryApi}/api/enquiries`, {
        ...formData,
        phonenumber: phoneNumber!.number,
      });

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

        setfieldErrors({
          name: "",
          email: "",
          phonenumber: "",
          service: "",
          message: "",
        });
      }
    } catch (err) {
      console.error("Contact form error:", err);

      setErrors(
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
      <div className="container mx-auto px-2 md:px-5 lg:px-12">
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
        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className=" grid grid-cols-1 2xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1
    
    bg-white
    overflow-hidden
    border border-gray-100
    rounded-2xl
    shadow-md
  "
        >
          {/* Left Image */}
          <div
            className="
      w-full
      overflow-hidden
      bg-white
      md:relative
      md:min-h-162.5
    "
          >
            <img
              src={StackGSBpic}
              alt="StackGSB Studio - Design, Development and Digital Solutions"
              className="
        block
        w-full
        h-auto

        md:absolute
        md:inset-0
        md:w-full
        md:h-full
        md:object-fill
        lg:object-fill
        lg:w-full
        lg:h-full
      "
            />
          </div>

          {/* Right Content */}
          <div className="flex flex-col h-full w-full p-3.5 md:p-8">
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

            {/* API Error Message */}
            {errors && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errors}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Full Name */}
              <div className="flex flex-col w-full">
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
                  className="
              w-full
              px-4
              py-3
              border border-gray-200
              rounded-lg
              outline-none
              focus:border-blue-900
              focus:ring-1
              focus:ring-blue-900
              transition
            "
                />

                {fieldErrors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

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
                  className="
              w-full
              h-12.5
              px-4
              border border-gray-200
              rounded-lg
              outline-none
              focus:border-blue-900
              focus:ring-1
              focus:ring-blue-900
              transition
            "
                />

                {fieldErrors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phonenumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>

                <div
                  className="
              flex
              w-full
              h-12.5
              border border-gray-200
              rounded-lg
              bg-white
              focus-within:border-blue-900
              focus-within:ring-1
              focus-within:ring-blue-900
              transition
            "
                >
                  <CountrySelector
                    selectedCountry={country}
                    onSelect={(countryData) => {
                      setcountry(countryData.iso2);
                      setdialCode(countryData.dialCode);

                      setFormData((prev) => ({
                        ...prev,
                        phonenumber: "",
                      }));

                      setfieldErrors((prev) => ({
                        ...prev,
                        phonenumber: "",
                      }));
                    }}
                    countries={defaultCountries}
                    renderButtonWrapper={({ children, rootProps }) => (
                      <button
                        {...rootProps}
                        type="button"
                        className="
                    h-full
                    flex
                    items-center
                    gap-2
                    px-3
                    border-r border-gray-200
                    bg-gray-50
                    hover:bg-gray-100
                    rounded-l-lg
                    shrink-0
                  "
                      >
                        {children}

                        <span className="text-sm text-gray-700">
                          +{dialCode}
                        </span>
                      </button>
                    )}
                  />

                  <input
                    type="tel"
                    id="phonenumber"
                    name="phonenumber"
                    value={formData.phonenumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");

                      setFormData((prev) => ({
                        ...prev,
                        phonenumber: value,
                      }));

                      setfieldErrors((prev) => ({
                        ...prev,
                        phonenumber: "",
                      }));
                    }}
                    placeholder="Enter phone number"
                    inputMode="numeric"
                    autoComplete="tel"
                    className="
                flex-1
                min-w-0
                px-4
                outline-none
                bg-transparent
                text-sm
                text-gray-900
                placeholder:text-gray-400
              "
                  />
                </div>

                {fieldErrors.phonenumber && (
                  <p className="mt-1 text-xs text-red-500">
                    {fieldErrors.phonenumber}
                  </p>
                )}
              </div>

              {/* Service */}
              <div className="w-full min-w-0">
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="
      block
      w-full
      max-w-full
      min-w-0
      h-12.5
      px-4
      pr-10
      text-sm
      border
      border-gray-200
      rounded-lg
      outline-none
      bg-white
      focus:border-blue-900
      focus:ring-1
      focus:ring-blue-900
      transition
    "
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

                {fieldErrors.service && (
                  <p className="mt-1 text-xs text-red-500">
                    {fieldErrors.service}
                  </p>
                )}
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
                  className="
              w-full
              px-4
              py-3
              border border-gray-200
              rounded-lg
              outline-none
              focus:border-blue-900
              focus:ring-1
              focus:ring-blue-900
              transition
              resize-none
            "
                />

                {fieldErrors.message && (
                  <p className="mt-1 text-xs text-red-500">
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="
            group
            w-full
            flex
            items-center
            justify-center
            gap-2
            px-6
            py-3
            bg-blue-950
            text-white
            font-medium
            rounded-lg
            hover:bg-blue-900
            hover:scale-[1.02]
            active:scale-[0.98]
            transition
            disabled:opacity-60
            disabled:cursor-not-allowed
            disabled:hover:scale-100
          "
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
        </motion.div>
      </div>
    </section>
  );
}
