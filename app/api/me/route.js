import { getUserFromReq } from "@/lib/auth";

export async function GET(req) {
  const user = getUserFromReq(req);
  return new Response(JSON.stringify({ user }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
