import redis from "@/lib/redis.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sql from "@/lib/db.js"; // your Neon/Postgres client

export async function POST(req) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    // Get OTP hash from Redis
    const hash = await redis.get(`otp:${email}`);
    if (!hash) {
      return new Response(JSON.stringify({ error: "OTP expired or missing" }), { status: 400 });
    }

    // Compare OTP
    const ok = await bcrypt.compare(String(otp), hash);
    if (!ok) {
      return new Response(JSON.stringify({ error: "Invalid OTP" }), { status: 401 });
    }

    // OTP verified → delete key
    await redis.del(`otp:${email}`);

    // Ensure user exists in DB
    const u = await sql`SELECT * FROM users WHERE email = ${email}`;
    let user = u && u[0];
    if (!user) {
      const created = await sql`
        INSERT INTO users (email)
        VALUES (${email})
        RETURNING *`;
      user = created[0];
    }

    // Create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set JWT in HttpOnly cookie
    const cookie = `token=${token}; Path=/; HttpOnly; Max-Age=${7*24*60*60}; SameSite=Lax`;

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json",
      },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
