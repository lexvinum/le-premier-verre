import { NextResponse } from "next/server";
import Stripe from "stripe";
import { upsertMembership } from "@/lib/membership";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    return NextResponse.json({ error: "Stripe non configuré." }, { status: 400 });
  }

  const stripe = new Stripe(secretKey);
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Signature manquante." }, { status: 400 });
  }

  const body = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Webhook invalide." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId || session.client_reference_id;

    if (userId && session.subscription) {
      const subscription = await stripe.subscriptions.retrieve(String(session.subscription));

      await upsertMembership({
        userId,
        status: subscription.status as any,
        stripeCustomerId: String(subscription.customer),
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0]?.price.id ?? null,
        currentPeriodEnd: new Date(((subscription as any).current_period_end ?? 0) * 1000),
      });
    }
  }

  if (
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    const subscription = event.data.object as Stripe.Subscription;
    const userId = subscription.metadata?.userId;

    if (userId) {
      await upsertMembership({
        userId,
        status: subscription.status as any,
        stripeCustomerId: String(subscription.customer),
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0]?.price.id ?? null,
        currentPeriodEnd: new Date(((subscription as any).current_period_end ?? 0) * 1000),
      });
    }
  }

  return NextResponse.json({ received: true });
}
