import nodemailer from "nodemailer";

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS loaded:", Boolean(process.env.EMAIL_PASS));

const MailTransfer = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

MailTransfer.verify((error) => {
  if (error) {
    console.error("❌ SMTP CONNECTION FAILED");
    console.error(error);
  } else {
    console.log("✅ SMTP server is ready to send emails");
  }
});

export default MailTransfer;
