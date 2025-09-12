// app/api/send-otp/route.js
import redis from "@/lib/redis";
import bcrypt from "bcryptjs";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
      });
    }

    // Rate-limit (max 5 requests per hour per email)
    const count = await redis.incr(`otp_req:${email}`);
    if (count === 1) {
      await redis.expire(`otp_req:${email}`, 3600); // 1 hour
    }
    if (count > 5) {
      return new Response(
        JSON.stringify({ error: "Too many OTP requests. Try later." }),
        { status: 429 }
      );
    }

    // Generate 6-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const hash = await bcrypt.hash(otp, 10);

    // Store hashed OTP in Redis (10 min expiry)
    await redis.set(`otp:${email}`, hash, "EX", 600);

    // Send email
    await sgMail.send({
      to: email, // user email
      from: process.env.SEND_FROM_EMAIL, // must be verified in SendGrid
      subject: "Your OTP Code for Login",
      text: `Your OTP is ${otp}`,
      html: `<p>Your OTP is <strong>${otp}</strong>. It is valid for 10 minutes.</p>`,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });

  } catch (err) {
    console.error("OTP send error:", err);
    return new Response(
      JSON.stringify({ error: "Internal error. Try again later." }),
      { status: 500 }
    );
  }
}
