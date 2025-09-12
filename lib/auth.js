import jwt from "jsonwebtoken";
import { parse } from "cookie"; // cleaner import

export function getUserFromReq(req) {
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = parse(cookieHeader); // no need to default empty string again
  const token = cookies.token;

  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.warn("JWT verification failed:", err.message); // optional but useful for debugging
    return null;
  }
}
