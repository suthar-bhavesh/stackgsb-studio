import UserModels from "../Models/UserModels.js";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ========================================
// Prevent unsafe HTML
// ========================================

const escapeHtml = (value = "") => {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// ========================================
// Create Contact
// ========================================

export const CreateContact = async (req, res) => {
  try {
    const { name, email, phonenumber, service, message } = req.body;

    // ========================================
    // Required fields
    // ========================================

    if (!name || !email || !phonenumber || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ========================================
    // Normalize
    // ========================================

    const normalizedName = name.trim();
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedMessage = message.trim();

    // ========================================
    // Email validation
    // ========================================

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!isValidEmail) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // ========================================
    // Phone validation
    // ========================================

    const validatedPhone = parsePhoneNumberFromString(phonenumber);

    if (!validatedPhone || !validatedPhone.isValid()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number",
      });
    }

    const normalizedPhone = validatedPhone.number;

    // ========================================
    // Duplicate enquiry
    // ========================================

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

    // ========================================
    // Save to MongoDB
    // ========================================

    const contact = await UserModels.create({
      name: normalizedName,
      email: normalizedEmail,
      phonenumber: normalizedPhone,
      service,
      message: normalizedMessage,
    });

    console.log("✅ Enquiry saved:", contact._id);

    // ========================================
    // Send response immediately
    // ========================================

    res.status(201).json({
      success: true,
      message: "Your enquiry has been submitted successfully.",
      data: contact,
    });

    // ========================================
    // Emails using Resend API
    // ========================================

    Promise.allSettled([
      // ADMIN EMAIL
      resend.emails.send({
        from: "StackGSB Studio <onboarding@resend.dev>",
        to: ["stackgsbstudio@gmail.com"],
        replyTo: normalizedEmail,

        subject: "New Contact Form Submission - StackGSB Studio",

        html: `
          <h2>New Enquiry Submission</h2>

          <p>
            <strong>Name:</strong>
            ${escapeHtml(normalizedName)}
          </p>

          <p>
            <strong>Email:</strong>
            ${escapeHtml(normalizedEmail)}
          </p>

          <p>
            <strong>Phone:</strong>
            ${escapeHtml(normalizedPhone)}
          </p>

          <p>
            <strong>Service:</strong>
            ${escapeHtml(service)}
          </p>

          <h3>Message</h3>

          <p>
            ${escapeHtml(normalizedMessage)}
          </p>

          <hr>

          <p>
            New enquiry received from
            StackGSB Studio website.
          </p>
        `,
      }),

      // CLIENT EMAIL
      resend.emails.send({
        from: "StackGSB Studio <onboarding@resend.dev>",

        to: [normalizedEmail],

        subject: "Thank You for Contacting StackGSB Studio",

        html: `
          <div
            style="
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: auto;
              line-height: 1.6;
              color: #1f2937;
            "
          >

            <h2 style="color:#172554;">
              Hi ${escapeHtml(normalizedName)},
            </h2>

            <p>
              Thank you for contacting
              <strong>StackGSB Studio</strong>.
            </p>

            <p>
              We have successfully received your
              enquiry regarding
              <strong>
                ${escapeHtml(service)}
              </strong>.
            </p>

            <p>
              Our team will review your requirements
              and get back to you shortly.
            </p>

            <div
              style="
                background:#f8fafc;
                border:1px solid #e5e7eb;
                border-radius:8px;
                padding:20px;
                margin:24px 0;
              "
            >

              <h3 style="margin-top:0;">
                Your Enquiry Details
              </h3>

              <p>
                <strong>Name:</strong>
                ${escapeHtml(normalizedName)}
              </p>

              <p>
                <strong>Email:</strong>
                ${escapeHtml(normalizedEmail)}
              </p>

              <p>
                <strong>Phone:</strong>
                ${escapeHtml(normalizedPhone)}
              </p>

              <p>
                <strong>Service:</strong>
                ${escapeHtml(service)}
              </p>

              <p>
                <strong>Message:</strong><br>
                ${escapeHtml(normalizedMessage)}
              </p>

            </div>

            <p>
              Thank you for choosing
              StackGSB Studio.
            </p>

            <p>
              Regards,<br>
              <strong>StackGSB Studio</strong>
            </p>

          </div>
        `,
      }),
    ]).then((results) => {
      results.forEach((result, index) => {
        const type = index === 0 ? "Admin" : "Client";

        if (result.status === "fulfilled") {
          // IMPORTANT: Resend can return an error
          // inside a fulfilled promise.
          const { data, error } = result.value;

          if (error) {
            console.error(`❌ ${type} email failed:`, error);
          } else {
            console.log(`✅ ${type} email sent:`, data?.id);
          }
        } else {
          console.error(`❌ ${type} email failed:`, result.reason);
        }
      });
    });
  } catch (error) {
    console.error("❌ Create contact error:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again.",
      });
    }
  }
};

export default CreateContact;
