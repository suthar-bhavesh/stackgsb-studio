import connectDB from "../lib/mongodb.js";
import UserModels from "../Models/UserModels.js";
import { parsePhoneNumberFromString } from "libphonenumber-js";

// ==========================================
// Allowed services
// ==========================================

const ALLOWED_SERVICES = [
  "Website Development",
  "Graphic Design",
  "Digital Marketing",
  "Other",
];

// ==========================================
// Vercel API Handler
// ==========================================

export default async function handler(req, res) {
  // Health check
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      message: "StackGSB Studio API is running",
    });
  }

  // Only POST allowed
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    // ========================================
    // Connect MongoDB
    // ========================================

    await connectDB();

    const { name, email, phonenumber, service, message } = req.body || {};

    // ========================================
    // 1. Required fields
    // ========================================

    if (!name || !email || !phonenumber || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ========================================
    // 2. Type validation
    // ========================================

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof phonenumber !== "string" ||
      typeof service !== "string" ||
      typeof message !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid form data",
      });
    }

    // ========================================
    // 3. Normalize
    // ========================================

    const normalizedName = name.trim();

    const normalizedEmail = email.toLowerCase().trim();

    const normalizedPhoneInput = phonenumber.trim();

    const normalizedService = service.trim();

    const normalizedMessage = message.trim();

    // ========================================
    // 4. Name validation
    // ========================================

    if (normalizedName.length < 2 || normalizedName.length > 80) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 2 and 80 characters",
      });
    }

    // Letters, spaces, apostrophe, dot and hyphen
    // Unicode letters are supported
    const nameRegex = /^[\p{L}\p{M} .'-]+$/u;

    if (!nameRegex.test(normalizedName)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid name",
      });
    }

    // ========================================
    // 5. Email validation
    // ========================================

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // ========================================
    // 6. Phone validation
    // ========================================

    const validatedPhone = parsePhoneNumberFromString(normalizedPhoneInput);

    if (!validatedPhone || !validatedPhone.isValid()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number",
      });
    }

    // Saves number in international E.164 format
    // Example: +919156105449
    const normalizedPhone = validatedPhone.number;

    // ========================================
    // 7. Service validation
    // ========================================

    if (!ALLOWED_SERVICES.includes(normalizedService)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid service",
      });
    }

    // ========================================
    // 8. Message validation
    // ========================================

    if (normalizedMessage.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Message must contain at least 10 characters",
      });
    }

    if (normalizedMessage.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Message cannot exceed 2000 characters",
      });
    }

    // ========================================
    // 9. Duplicate enquiry check
    // Same email + service within 24 hours
    // ========================================

    const existingEnquiry = await UserModels.findOne({
      email: normalizedEmail,
      service: normalizedService,

      createdAt: {
        $gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    });

    if (existingEnquiry) {
      return res.status(409).json({
        success: false,
        message:
          "You have already submitted an enquiry for this service recently. Our team will contact you shortly.",
      });
    }

    // ========================================
    // 10. Save enquiry
    // ========================================

    const contact = await UserModels.create({
      name: normalizedName,
      email: normalizedEmail,
      phonenumber: normalizedPhone,
      service: normalizedService,
      message: normalizedMessage,
    });

    console.log("✅ Enquiry saved:", contact._id);

    // ========================================
    // 11. Success
    // ========================================

    return res.status(201).json({
      success: true,
      message: "Your enquiry has been submitted successfully.",
      data: contact,
    });
  } catch (error) {
    console.error("❌ Enquiry API error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
}
