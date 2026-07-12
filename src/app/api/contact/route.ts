import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, companySize, message } = await req.json();

    const smtpUser = process.env.SMTP_USER || "karamcharhr@gmail.com";
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpPass) {
      return NextResponse.json(
        { 
          error: "SMTP_PASS is not set in environment variables.", 
          code: "MISSING_CREDENTIALS" 
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass, // Gmail App Password
      },
    });

    const mailOptions = {
      from: `"KaramcharHR Portal" <${smtpUser}>`,
      to: "karamcharhr@gmail.com",
      subject: `New Demo Booking Request - ${name}`,
      text: `
        New Demo Request:
        -----------------
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Company Size: ${companySize}
        Message: ${message}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #111;">
          <h2 style="color: #4B3AA4; border-bottom: 2px solid #E8577B; padding-bottom: 8px;">
            KaramcharHR Demo Request
          </h2>
          <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 140px;">Name:</td>
              <td style="padding: 6px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 6px 0;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Company Size:</td>
              <td style="padding: 6px 0;">${companySize} employees</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background-color: #f7f7fa; border-radius: 8px;">
            <p style="margin: 0; font-weight: bold; font-size: 13px; color: #555; text-transform: uppercase;">Message / Requirements:</p>
            <p style="margin-top: 8px; font-size: 14px; line-height: 1.5; color: #222;">${message.replace(/\n/g, "<br/>")}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Nodemailer error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email." },
      { status: 500 }
    );
  }
}
