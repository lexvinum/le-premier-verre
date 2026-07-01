import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Connexion requise." }, { status: 401 });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PREMIUM_PRICE_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (!secretKey || !priceId) {
    return NextResponse.json(
      {
        error: "Stripe n’est pas encore configuré.",
        missing: ["STRIPE_SECRET_KEY", "STRIPE_PREMIUM_PRICE_ID"],
      },
      { status: 400 }
    );
  }

  const stripe = new Stripe(secretKey);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/premium?success=1`,
    cancel_url: `${appUrl}/premium?canceled=1`,
    client_reference_id: userId,
    metadata: { userId },
  });

  return NextResponse.json({ url: session.url });
}
