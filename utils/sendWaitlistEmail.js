const transporter = require("../config/mail");

async function sendWaitlistEmail({ email, fullName }) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    body { margin:0; padding:0; background-color:#f5f7fb; font-family:Arial, Helvetica, sans-serif; }
    .container { max-width:600px; margin:40px auto; background:#fff; border-radius:10px; padding:32px; }
    h2 { color:#111827; }
    p, ul { color:#374151; line-height:1.6; font-size:15px; }
    ul { padding-left:18px; }
    .btn { display:inline-block; margin:30px 0; padding:14px 24px; background:#25D366; color:#fff !important; text-decoration:none; border-radius:6px; font-weight:bold; }
    .footer { margin-top:30px; font-size:13px; color:#6b7280; }
    @media (prefers-color-scheme: dark) {
      body { background-color:#0b0f19; }
      .container { background-color:#111827; }
      h2, p, ul { color:#e5e7eb; }
    }
  </style>
</head>
<body>
  <div class="container">
    <picture>
      <source srcset="https://ayonaire.com/assets/logos/full-logo-dark.svg" media="(prefers-color-scheme: dark)">
      <img src="https://ayonaire.com/_next/image?url=%2Fassets%2Flogos%2Ffull-logo-light.png&w=1920&q=75" alt="Ayonaire" style="max-width:160px; margin-bottom:20px;">
    </picture>
    <h2>You’re In! One More Step 🚀</h2>
    <p>Hi ${fullName || "there"},</p>
    <p>Congratulations on taking the first step, welcome aboard!</p>
    <p>You now have access to:</p>
    <ul>
      <li>Live support, Q&A, and guidance as you grow your tech skills</li>
      <li>Weekly tips, resources, and learning materials</li>
      <li>Scholarships, internships, and job alerts</li>
      <li>A serious community focused on growth</li>
      <li>A safe space to ask questions and get real help</li>
    </ul>
    <p>Join the community for instant updates and support:</p>
    <a href="https://chat.whatsapp.com/IAz4IQXr22020WcNDfpPiA" class="btn">👉 CLICK HERE TO JOIN INSTANTLY</a>
    <p>We have only a few slots left before we’re full.</p>
    <p>See you inside,<br /><strong>— The Ayonaire Team</strong></p>
    <div class="footer">© ${new Date().getFullYear()} Ayonaire. All rights reserved.</div>
  </div>
</body>
</html>
`;

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "You’re In! One More Step",
      html,
    });

    console.log(`✅ Email sent to ${email}: ${info.messageId}`);
    console.log(`Preview URL (if using ethereal): ${nodemailer.getTestMessageUrl(info) || "N/A"}`);
  } catch (error) {
    console.error(`❌ Failed to send email to ${email}`);
    console.error("Error details:", error);
    if (error.response) console.error("SMTP Response:", error.response);
    if (error.code) console.error("Error Code:", error.code);
  }
}

module.exports = sendWaitlistEmail;
