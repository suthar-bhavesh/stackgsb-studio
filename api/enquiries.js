import connectDB from "../lib/mongodb.js";
import UserModels from "../Models/UserModels.js";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import nodemailer from "nodemailer";

// ==========================================
// Configuration
// ==========================================

const ADMIN_EMAIL = "stackgsbstudio@gmail.com";

const ALLOWED_SERVICES = [
  "Website Development",
  "Graphic Design",
  "Digital Marketing",
  "Other",
];

// ==========================================
// Helper: Escape HTML
// ==========================================

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}

// ==========================================
// Helper: Send Email Notifications
// ==========================================

async function sendEnquiryEmails(enquiry) {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    console.error("❌ Gmail SMTP credentials missing");

    return {
      admin: false,
      client: false,
    };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const { name, email, phonenumber, service, message } = enquiry;

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phonenumber);
  const safeService = escapeHtml(service);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  const fromEmail = `"StackGSB Studio" <${smtpUser}>`;

  // ==========================================
  // Admin Email
  // ==========================================

  const adminEmail = {
    from: fromEmail,
    to: ADMIN_EMAIL,
    replyTo: email,
    subject: `New Enquiry - ${service} | StackGSB Studio`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#222;">

        <div style="background:#2563eb;padding:24px;color:#fff;">
          <h2 style="margin:0;">New Client Enquiry</h2>
          <p style="margin:8px 0 0;">StackGSB Studio</p>
        </div>

        <div style="padding:24px;border:1px solid #e5e7eb;">
          <p>A new enquiry has been submitted through your website.</p>

          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Service:</strong> ${safeService}</p>

          <h3>Client Message</h3>
          <p style="white-space:pre-wrap;">${safeMessage}</p>
        </div>

      </div>
    `,
  };

  // ==========================================
  // Client Confirmation Email
  // ==========================================

  const clientEmail = {
    from: fromEmail,
    to: email,
    replyTo: ADMIN_EMAIL,
    subject: "We've Received Your Enquiry | StackGSB Studio",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#222;">

        <div style="background:#2563eb;padding:28px;color:#fff;">
          <h2 style="margin:0;">StackGSB Studio</h2>
          <p style="margin:8px 0 0;">
            Web Development | Graphic Design | Digital Marketing
          </p>
        </div>

        <div style="padding:28px;border:1px solid #e5e7eb;">

          <h2>Thank You for Reaching Out!</h2>

          <p>Hi ${safeName},</p>

          <p>
            Thank you for contacting StackGSB Studio.
            We have successfully received your enquiry.
          </p>

          <p>
            <strong>Service Requested:</strong> ${safeService}
          </p>

          <p>
            Our team will review your requirements and
            get back to you as soon as possible.
          </p>

          <p>
            If you have any additional information,
            feel free to reply to this email.
          </p>

          <p>
            Best regards,<br>
            <strong>StackGSB Studio</strong><br>
            <a href="mailto:stackgsbstudio@gmail.com">
              stackgsbstudio@gmail.com
            </a>
          </p>

        </div>

        <div style="text-align:center;padding:16px;color:#666;font-size:12px;">
          © StackGSB Studio. All rights reserved.
        </div>

      </div>
    `,
  };

  // ==========================================
  // Send Admin + Client Emails
  // ==========================================

  const results = await Promise.allSettled([
    transporter.sendMail(adminEmail),
    transporter.sendMail(clientEmail),
  ]);

  const statuses = {
    admin: false,
    client: false,
  };

  results.forEach((result, index) => {
    const recipient = index === 0 ? "admin" : "client";

    if (result.status === "rejected") {
      console.error(`❌ ${recipient} Gmail SMTP error:`, result.reason);
      return;
    }

    const response = result.value;

    const accepted = response.accepted || [];

    statuses[recipient] = accepted.length > 0;

    console.log(
      `${statuses[recipient] ? "✅" : "❌"} ${recipient} email SMTP result:`,
      {
        messageId: response.messageId,
        accepted: response.accepted,
        rejected: response.rejected,
      },
    );
  });

  return statuses;
}

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
    res.setHeader("Allow", ["GET", "POST"]);

    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    // ========================================
    // 1. Required fields
    // ========================================

    const { name, email, phonenumber, service, message } = req.body || {};

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

    if (normalizedEmail.length > 254 || !emailRegex.test(normalizedEmail)) {
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

    if (normalizedMessage.length < 10 || normalizedMessage.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Message must contain between 10 and 2000 characters",
      });
    }

    // ========================================
    // 9. Connect MongoDB
    // ========================================

    await connectDB();

    // ========================================
    // 10. Duplicate enquiry check
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
    // 11. Save enquiry to MongoDB
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
    // 12. Send Admin + Client Emails
    // ========================================

    let emailStatus = {
      admin: false,
      client: false,
    };

    try {
      emailStatus = await sendEnquiryEmails({
        name: normalizedName,
        email: normalizedEmail,
        phonenumber: normalizedPhone,
        service: normalizedService,
        message: normalizedMessage,
      });
    } catch (emailError) {
      console.error("❌ Unexpected email notification error:", emailError);
    }

    console.log("📧 Email status:", emailStatus);

    // ========================================
    // 13. Success response
    // ========================================

    return res.status(201).json({
      success: true,
      message: "Your enquiry has been submitted successfully.",
      data: {
        id: contact._id,
      },
    });
  } catch (error) {
    console.error("❌ Enquiry API error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
}
