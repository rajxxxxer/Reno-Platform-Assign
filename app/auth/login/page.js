'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function send(e) {
    e.preventDefault();
    console.log("SENDGRID_API_KEY:", process.env.SENDGRID_API_KEY);
console.log("REDIS_URL:", process.env.REDIS_URL);

    setMsg("Sending...");
    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
    } else {
      setMsg(data.error || "Failed to send OTP");
    }
  }

  return (
    <form onSubmit={send} className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Login with Email</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
        className="w-full mb-3 p-3 border rounded"
        placeholder="you@example.com"
      />
      <button className="w-full py-2 bg-blue-600 text-white rounded">Send OTP</button>
      <p className="mt-2 text-sm text-red-600">{msg}</p>
    </form>
  );
}
