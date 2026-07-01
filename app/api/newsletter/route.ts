import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body?.email ?? "").trim().toLowerCase();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Courriel invalide." }, { status: 400 });
  }

  if (process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID) {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
        }),
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Erreur Beehiiv." }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true });
}
