import nodemailer from "nodemailer";

// Configure the transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendContactEmail = async (data) => {
  const { name, email, phone, message } = data;

  const mailOptions = {
    from: `"Be Frank Website Contact Form" <${process.env.SMTP_USER}>`, // Sender address
    to: process.env.ADMIN_EMAIL, // Admin address from .env
    replyTo: email, // Allows admin to reply directly to the user
    subject: `New Contact Submission from ${name}`,
    html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #ccc;">
                ${message}
            </blockquote>
        `,
  };

  await transporter.sendMail(mailOptions);
};
