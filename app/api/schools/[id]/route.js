import sql from "@/lib/db.js";
import { getUserFromReq } from "@/lib/auth.js";

export async function DELETE(req, context) {
  try {
    // 🔒 Check authentication
    const user = getUserFromReq(req);
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401 }
      );
    }

    // Get ID from params
    const { params } = context;
    const { id } = params;

    const result = await sql`
      DELETE FROM public.schools WHERE id = ${id} RETURNING *;
    `;

    if (result.length === 0) {
      return new Response(
        JSON.stringify({ error: "School not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "School deleted", deleted: result[0] }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
