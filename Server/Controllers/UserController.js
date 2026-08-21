import MailTransfer from "../config/mailer.js";
import UserModels from "../Models/UserModels.js";

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

    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (!name || !email || !phonenumber || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please proivde a valid email address",
      });
    }

    const ExitingEnquiry = await UserModels.findOne({
      email: email.toLowerCase(),
      service: service,
      createdAt: {
        $gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    });

    if (ExitingEnquiry) {
      return res.status(400).json({
        success: false,
        message:
          "You have already submitted an enquiry for this service recently. Our team will contact you shortly.",
      });
    }

    const contact = await UserModels.create({
      name,
      email,
      phonenumber,
      service,
      message,
    });

    //   Admin Order Notification
    try {
      await MailTransfer.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "🔔 New Contact Form Submission - StackGSB Studio",

        html: `
                  <h2>New Enquiry Submission</h2>
  
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phonenumber}</p>
  
          <h3>Message</h3>
          <p>${message}</p>
  
          <hr>
  
          <p>New inquiry received from StackGSB Studio website.</p>
  
                  `,
      });

      //   Client Email confirmation

      await MailTransfer.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Thank You for Contacting StackGSB Studio",

        html: `
                  <h2>Hi ${name}</h2>
  
                  <p>Thank you for contacting StackGSB Studio.<p/>
                  <p>We have successfully received your enquiry regarding ${service}<p/>
                  <p>Our team will review your requirements and get back to you shortly.<p/>
  
                  <h3>Your Enquiry Details</h3>
                  <p>Name: ${name}</p>
                  <p>Service: ${service}</p>
                  <p>Message: ${message}</p>
  
  
                  <p>Thank your for choosing StackGSB Studio</p>
  
                  <p>Regards</p>
                  <p>StackGSB Studio</p>
                  `,
      });

      return res.status(201).json({
        success: true,
        message: "Your messsage has been submitted successfully",
        data: contact,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }
    return res.status(201).json({
      success: true,
      message: "Your message has been submitted successfully",
      data: contact,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default CreateContact;
