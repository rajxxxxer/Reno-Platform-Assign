import sql from "@/lib/db.js";



export async function POST(req) {
  try {
    const { name, address, city, state, contact, image, email_id } = await req.json();

    const inserted = await sql`
      INSERT INTO public.schools (name, address, city, state, contact, image, email_id)
      VALUES (${name}, ${address}, ${city}, ${state}, ${contact}, ${image}, ${email_id})
      RETURNING *;
    `;

    return new Response(JSON.stringify(inserted[0]), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function GET() {
  try {
    const rows = await sql`SELECT id, name, address, city, state, contact, image, email_id, created_at FROM public.schools ORDER BY id DESC;`;
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
