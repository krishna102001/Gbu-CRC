import nodemailer from "nodemailer";
export const sendMail = async (recievers, otp, content) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    // OTP Template
    const otpTemplate = `
<div style="text-align: center; font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
  <img src="https://www.gbu.ac.in/Content/img/logo_gbu.png" alt="Logo" style="max-width: 150px; margin-bottom: 20px;">
  <h1 style="color: blue">GAUTAM BUDDHA UNIVERSITY</h1>
  <h2 style="color: #333;">${content.title || "Your OTP Code"}</h2>
  <p style="color: #555; font-size: 16px;">
    ${content.message || "Use the OTP below to proceed with verification."}
  </p>
  <div>
    <a
      href='#'
      style='display: inline-block; padding: 10px 20px; background: #007BFF; color: #fff; text-decoration: none; font-size: 18px; border-radius: 5px; margin: 20px 0;'
    >
      ${otp}
    </a>
    <p style='color: #999; font-size: 14px;'>This OTP is valid for 10 minutes.</p>
  </div>
</div>
`;

    const customTemplate = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
  ${content.title && `<h2 style="color: #333;">${content.title}</h2>`}
  ${
    content.message &&
    `<p style="font-size: 16px; color: #555;">${content.message}</p>`
  }
  ${
    content.buttonText && content.buttonUrl
      ? `
    <a href="${content.buttonUrl}" style="display: inline-block; padding: 10px 20px; background: #28a745; color: #fff; text-decoration: none; border-radius: 5px;">
      ${content.buttonText}
    </a>`
      : ""
  }
</div>
`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recievers,
      subject:
        content.subject || (otp ? "OTP Verification" : "Notification from GBU"),
      html: otp ? otpTemplate : customTemplate,
    };
    await transporter.sendMail(mailOptions);
    return { success: true, message: "OTP Sent Successfully" };
  } catch (error) {
    console.log("Failed to send email", error);
    return { success: false, message: "Failed to send OTP email" };
  }
};
