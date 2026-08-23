import MailTransfer from "../config/mailer.js";
import UserModels from "../Models/UserModels.js";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const escapeHtml = (value = "") => {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const CreateContact = async (req, res) => {
  try {
    const { name, email, phonenumber, service, message } = req.body;

    // =========================
    // Required fields
    // =========================

    if (!name || !email || !phonenumber || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // =========================
    // Normalize data
    // =========================

    const normalizedName = name.trim();
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedMessage = message.trim();

    // =========================
    // Email validation
    // =========================

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!isValidEmail) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // =========================
    // Phone validation
    // =========================

    const validatedPhone = parsePhoneNumberFromString(phonenumber);

    if (!validatedPhone || !validatedPhone.isValid()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number",
      });
    }

    const normalizedPhone = validatedPhone.number;

    // =========================
    // Duplicate enquiry
    // =========================

    const existingEnquiry = await UserModels.findOne({
      email: normalizedEmail,
      service,
      createdAt: {
        $gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    });

    if (existingEnquiry) {
      return res.status(400).json({
        success: false,
        message:
          "You have already submitted an enquiry for this service recently. Our team will contact you shortly.",
      });
    }

    // =========================
    // Save to MongoDB
    // =========================

    const contact = await UserModels.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phonenumber: validatedPhone.number,
      service,
      message: message.trim(),
    });

    console.log("✅ Enquiry saved:", contact._id);

    // ========================================
    // SEND ADMIN + CLIENT EMAIL
    // ========================================

    try {
      const emailResults = await Promise.allSettled([
        // ========================================
        // 1. ADMIN EMAIL
        // ========================================

        MailTransfer.sendMail({
          from: `"StackGSB Studio" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,

          subject: "🔔 New Contact Form Submission - StackGSB Studio",

          html: `
        <h2>New Enquiry Submission</h2>

        <p>
          <strong>Name:</strong>
          ${escapeHtml(name)}
        </p>

        <p>
          <strong>Email:</strong>
          ${escapeHtml(email)}
        </p>

        <p>
          <strong>Phone:</strong>
          ${escapeHtml(validatedPhone.number)}
        </p>

        <p>
          <strong>Service:</strong>
          ${escapeHtml(service)}
        </p>

        <h3>Message</h3>

        <p>${escapeHtml(message)}</p>

        <hr>

        <p>
          New enquiry received from StackGSB Studio website.
        </p>
      `,
        }),

        // ========================================
        // 2. CLIENT CONFIRMATION EMAIL
        // ========================================

        MailTransfer.sendMail({
          from: `"StackGSB Studio" <${process.env.EMAIL_USER}>`,

          to: email.toLowerCase().trim(),
          replyTo: process.env.EMAIL_USER,

          subject: "Thank You for Contacting StackGSB Studio",

          html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            color: #1f2937;
            line-height: 1.6;
          "
        >

          <h2 style="color: #172554;">
            Hi ${escapeHtml(name.trim())},
          </h2>

          <p>
            Thank you for contacting
            <strong>StackGSB Studio</strong>.
          </p>

          <p>
            We have successfully received your enquiry regarding
            <strong>${escapeHtml(service)}</strong>.
          </p>

          <p>
            Our team will review your requirements and get back
            to you shortly.
          </p>

          <div
            style="
              background: #f8fafc;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 20px;
              margin: 24px 0;
            "
          >
            <h3
              style="
                margin-top: 0;
                color: #172554;
              "
            >
              Your Enquiry Details
            </h3>

            <p>
              <strong>Name:</strong>
              ${escapeHtml(name.trim())}
            </p>

            <p>
              <strong>Email:</strong>
              ${escapeHtml(email.toLowerCase().trim())}
            </p>

            <p>
              <strong>Phone:</strong>
              ${escapeHtml(validatedPhone.number)}
            </p>

            <p>
              <strong>Service:</strong>
              ${escapeHtml(service)}
            </p>

            <p>
              <strong>Message:</strong><br>
              ${escapeHtml(message.trim())}
            </p>
          </div>

          <p>
            Thank you for choosing StackGSB Studio.
          </p>

          <p>
            Regards,<br>
            <strong>StackGSB Studio</strong>
          </p>

        </div>
      `,
        }),
      ]);

      // ========================================
      // EMAIL RESULT LOGS
      // ========================================

      const adminResult = emailResults[0];
      const clientResult = emailResults[1];

      if (adminResult.status === "fulfilled") {
        console.log("✅ Admin email sent successfully");
      } else {
        console.error("❌ Admin email failed:", adminResult.reason);
      }

      if (clientResult.status === "fulfilled") {
        console.log("✅ Client confirmation email sent successfully");
      } else {
        console.error(
          "❌ Client confirmation email failed:",
          clientResult.reason,
        );
      }
    } catch (emailError) {
      console.error("❌ Email processing error:", emailError);
    }

    // ========================================
    // SUCCESS RESPONSE
    // ========================================

    return res.status(201).json({
      success: true,
      message: "Your enquiry has been submitted successfully.",
      data: contact,
    });
  } catch (err) {
    console.error("Create contact error:", err);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

export default CreateContact;
