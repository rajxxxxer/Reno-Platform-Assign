// app/api/verify-otp/route.js
import redis from "@/lib/redis";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sql from "@/lib/db";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return new Response(JSON.stringify({ error: "Missing email or OTP" }), {
        status: 400,
      });
    }

    // Get hashed OTP from Redis
    const hash = await redis.get(`otp:${email}`);
    if (!hash) {
      return new Response(JSON.stringify({ error: "OTP expired or not found" }), {
        status: 400,
      });
    }

    // Compare OTP
    const isValid = await bcrypt.compare(String(otp), hash);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid OTP" }), {
        status: 401,
      });
    }

    // OTP is valid, delete from Redis
    await redis.del(`otp:${email}`);

    // Check if user exists, if not, create one
    let user = (await sql`SELECT * FROM users WHERE email = ${email}`)[0];

    if (!user) {
      const inserted = await sql`
        INSERT INTO users (email)
        VALUES (${email})
        RETURNING *`;
      user = inserted[0];
    }

    // Create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set HttpOnly cookie
    const cookie = `token=${token}; Path=/; HttpOnly; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax`;

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json",
      },
    });

  } catch (err) {
    console.error("OTP verification error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
