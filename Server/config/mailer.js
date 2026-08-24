import nodemailer from "nodemailer";

console.log("=== PRODUCTION MAIL DEBUG ===");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS loaded:", Boolean(process.env.EMAIL_PASS));

const MailTransfer = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

MailTransfer.verify((error) => {
  if (error) {
    console.error("❌ SMTP VERIFY FAILED");
    console.error("Code:", error.code);
    console.error("Command:", error.command);
    console.error("Message:", error.message);
  } else {
    console.log("✅ SMTP READY");
  }
});

export default MailTransfer;
