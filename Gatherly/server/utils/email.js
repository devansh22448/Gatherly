const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendBookingEmail = async (userEmail, userName, eventTitle) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Booking Confirmed: ${eventTitle}`,
      html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', Arial, sans-serif; background: #0B0A14; }
        .container { max-width: 600px; margin: 0 auto; background: #0B0A14; padding: 24px; }
        .card { background: #141428; border: 1px solid #3B365D; border-radius: 16px; padding: 40px 32px; text-align: center; }
        .logo { font-size: 28px; font-weight: 700; color: #8B5CF6; margin-bottom: 24px; font-family: 'Sora', Arial; letter-spacing: 0.5px; }
        h2 { color: #F8FAFC; font-size: 24px; margin-bottom: 16px; font-family: 'Sora', Arial; }
        .event-title { background: #1E1B35; border: 1px solid #3B365D; border-radius: 12px; padding: 16px; margin: 16px 0; color: #8B5CF6; font-size: 18px; font-weight: 600; }
        p { color: #9CA3AF; font-size: 16px; line-height: 1.7; margin: 12px 0; }
        .button { display: inline-block; background: #8B5CF6; color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; margin-top: 24px; transition: all 0.3s; }
        .button:hover { background: #7C3AED; }
        .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #3B365D; font-size: 12px; color: #6B7280; }
        .checkmark { display: inline-flex; width: 48px; height: 48px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 16px; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="checkmark">✓</div>
            <div class="logo">Gatherly</div>
            <h2>Booking Confirmed!</h2>
            <p>Hi ${userName},</p>
            <p>Your booking for the event</p>
            <div class="event-title">"${eventTitle}"</div>
            <p>is successfully confirmed. We're excited to see you there!</p>
            <a href="https://gatherly.app/dashboard" class="button">View Your Booking</a>
            <div class="footer">
                <p>This is an automated email from Gatherly.</p>
                <p style="margin-top: 8px;">© 2026 Gatherly. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>
            `,
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to", userEmail);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendOTPEmail = async (userEmail, otp, type) => {
  try {
    const title =
      type === "account_verification"
        ? "Verify your Gatherly Account"
        : "Gatherly Booking Verification";
    const msg =
      type === "account_verification"
        ? "Please use the following OTP to verify your new Gatherly account."
        : "Please use the following OTP to verify and confirm your event booking.";

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: title,
      html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', Arial, sans-serif; background: #0B0A14; }
        .container { max-width: 600px; margin: 0 auto; background: #0B0A14; padding: 24px; }
        .card { background: #141428; border: 1px solid #3B365D; border-radius: 16px; padding: 40px 32px; text-align: center; }
        .logo { font-size: 28px; font-weight: 700; color: #8B5CF6; margin-bottom: 24px; font-family: 'Sora', Arial; letter-spacing: 0.5px; }
        h2 { color: #F8FAFC; font-size: 24px; margin-bottom: 16px; font-family: 'Sora', Arial; }
        p { color: #9CA3AF; font-size: 16px; line-height: 1.7; margin: 12px 0; }
        .otp-box { background: #1E1B35; border: 2px solid #8B5CF6; border-radius: 12px; margin: 28px 0; padding: 24px; font-size: 36px; font-weight: 700; color: #8B5CF6; letter-spacing: 12px; font-family: 'Courier New', monospace; }
        .warning { color: #FBBF24; font-size: 14px; margin-top: 16px; }
        .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #3B365D; font-size: 12px; color: #6B7280; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="logo">🔐 Gatherly</div>
            <h2>${title}</h2>
            <p>${msg}</p>
            <div class="otp-box">${otp}</div>
            <p class="warning">⏱️ This code expires in 5 minutes.</p>
            <p style="color: #6B7280; font-size: 14px; margin-top: 16px;">If you didn't request this, please ignore this email.</p>
            <div class="footer">
                <p>This is an automated email from Gatherly.</p>
                <p style="margin-top: 8px;">© 2026 Gatherly. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>
            `,
    };
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${userEmail} for ${type}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};

module.exports = { sendBookingEmail, sendOTPEmail };
