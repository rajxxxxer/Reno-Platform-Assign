"use client";

import Cookies from "js-cookie";

export function getUserClient() {
  const token = Cookies.get("token");
  if (!token) return null;

  try {
    // JWT decode without verifying (only client UI ke liye)
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (err) {
    return null;
  }
}
