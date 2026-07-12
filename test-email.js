const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

// Simple manual .env.local parser
let smtpUser = "karamcharhr@gmail.com";
let smtpPass = "";

try {
  const envPath = path.join(__dirname, ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    content.split("\n").forEach((line) => {
      const cleanLine = line.trim();
      if (cleanLine && !cleanLine.startsWith("#")) {
        const parts = cleanLine.split("=");
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const value = parts.slice(1).join("=").trim();
          if (key === "SMTP_USER") smtpUser = value;
          if (key === "SMTP_PASS") smtpPass = value;
        }
      }
    });
  }
} catch (e) {
  console.error("Error reading .env.local:", e);
}

// STRIP SPACES from Google App Password
const cleanPass = smtpPass.replace(/\s+/g, "");

console.log("Starting SMTP Test...");
console.log("SMTP User:", smtpUser);
console.log("SMTP Pass configured (original length):", smtpPass ? smtpPass.length : 0);
console.log("SMTP Pass cleaned (length):", cleanPass ? cleanPass.length : 0);

if (!cleanPass) {
  console.error("Error: SMTP_PASS is missing or empty.");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: smtpUser,
    pass: cleanPass, // Use the cleaned 16-character password without spaces
  },
});

const mailOptions = {
  from: smtpUser,
  to: "karamcharhr@gmail.com",
  subject: "SMTP Local Test (Space Stripped) - KaramcharHR",
  text: "This is a local SMTP test with space-stripping to verify if the App Password works.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Test Failed!");
    console.error("Error Details:", error);
  } else {
    console.log("Test Succeeded!");
    console.log("Server Response:", info.response);
  }
});
