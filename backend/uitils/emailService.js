import nodemailer from "nodemailer";
import ContactSubmission from '../models/ContactSubmission.js';

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
  const { name, email, phone, reason, message } = data;
  const count = await ContactSubmission.countDocuments();

  const mailOptions = {
    from: `"Be Frank Website" <${process.env.SMTP_USER}>`, // Sender address
    to: process.env.ADMIN_EMAIL, // Admin address from .env
    replyTo: email, // Allows admin to reply directly to the user
    subject: `#${count} New Be Frank Website Contact Submission from ${name}`,
    html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Reason:</strong> ${reason}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #ccc;">
                ${message}
            </blockquote>
        `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendUserAutoReply = async (data) => {
  const { name, email, reason } = data;

  const mailOptions = {
    from: `"Be Frank Team" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `We’ve received your message | VSM Thane`,
    html: `
      <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;color:#333;line-height:1.6;">
        
        <p>Dear <strong>${name}</strong>,</p>

        <p>
          Thank you for contacting <strong>Vidyadaan Sahayak Mandal (VSM Thane)</strong>.
        </p>

        <p>
          We have received your inquiry regarding
          <strong>"${reason}"</strong>.
        </p>

        <p>
          One of our team members will review your message and get back to you
          as soon as possible.
        </p>

        <br />

        <p>
          Best regards,<br />
          <strong>Vidyadaan Sahayak Mandal (VSM Thane) Be Frank Team</strong>
        </p>

        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />

        <p style="font-size:12px;color:#777;">
          This is an automated message. Please do not reply directly to this email.
        </p>

      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
