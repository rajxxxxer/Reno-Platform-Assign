import sql from "@/lib/db.js";

export async function DELETE(req, context) {
  try {
    const { params } = await context;
    const { id } = params;

    const result = await sql`
      DELETE FROM public.schools WHERE id = ${id} RETURNING *;
    `;

    if (result.length === 0) {
      return new Response(JSON.stringify({ error: "School not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "School deleted", deleted: result[0] }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
