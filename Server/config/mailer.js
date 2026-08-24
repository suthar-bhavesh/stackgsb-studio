import nodemailer from "nodemailer";
import dns from "node:dns";

// Prefer IPv4 over IPv6
dns.setDefaultResultOrder("ipv4first");

const MailTransfer = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000,
});

MailTransfer.verify((error) => {
  if (error) {
    console.error("❌ SMTP VERIFY FAILED");
    console.error("Code:", error.code);
    console.error("Command:", error.command);
    console.error("Message:", error.message);
  } else {
    console.log("✅ SMTP server is ready to send emails");
  }
});

export default MailTransfer;
