import redis from "@/lib/redis.js";
import bcrypt from "bcryptjs";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ error: "Missing email" }), { status: 400 });
    }

    // Rate-limit: max 5 per hour
    const cnt = await redis.incr(`otp_req:${email}`);
    if (cnt === 1) await redis.expire(`otp_req:${email}`, 3600); // 1 hour
    if (cnt > 5) {
      return new Response(JSON.stringify({ error: "Too many requests" }), { status: 429 });
    }

    // Generate 6-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const hash = await bcrypt.hash(otp, 10);

    // Store hash in Redis for 10 min
    await redis.set(`otp:${email}`, hash, "EX", 600);

    // Send email via SendGrid
    try {
      await sgMail.send({
        to: email,
        from: process.env.SEND_FROM_EMAIL, // "abhishekraj2447@gmail.com" (verified sender)
        subject: "Your login OTP (valid 10 min)",
        text: `Your OTP is ${otp}`,
        html: `<p>Your OTP: <strong>${otp}</strong><br/>Expires in 10 minutes.</p>`,
      });
    } catch (e) {
      console.warn("SendGrid failed, OTP:", otp, e?.message);
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
