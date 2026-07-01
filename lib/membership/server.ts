import { prisma } from "@/lib/prisma";

export type MembershipStatus = "free" | "active" | "trialing" | "past_due" | "canceled" | "incomplete";

export type Membership = {
  userId: string;
  status: MembershipStatus;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripePriceId: string | null;
  currentPeriodEnd: Date | null;
};

type RawMembership = {
  user_id: string;
  status: MembershipStatus;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  current_period_end: Date | null;
};

function mapMembership(row: RawMembership): Membership {
  return {
    userId: row.user_id,
    status: row.status,
    stripeCustomerId: row.stripe_customer_id,
    stripeSubscriptionId: row.stripe_subscription_id,
    stripePriceId: row.stripe_price_id,
    currentPeriodEnd: row.current_period_end,
  };
}

export function isPremiumStatus(status?: string | null) {
  return status === "active" || status === "trialing";
}

export async function getMembership(userId: string): Promise<Membership> {
  const rows = await prisma.$queryRaw<RawMembership[]>`
    select *
    from memberships
    where user_id = ${userId}
    limit 1
  `;

  if (!rows[0]) {
    return {
      userId,
      status: "free",
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      stripePriceId: null,
      currentPeriodEnd: null,
    };
  }

  return mapMembership(rows[0]);
}

export async function upsertMembership(input: {
  userId: string;
  status: MembershipStatus;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  stripePriceId?: string | null;
  currentPeriodEnd?: Date | null;
}) {
  await prisma.$executeRaw`
    insert into memberships (
      user_id,
      status,
      stripe_customer_id,
      stripe_subscription_id,
      stripe_price_id,
      current_period_end
    )
    values (
      ${input.userId},
      ${input.status},
      ${input.stripeCustomerId ?? null},
      ${input.stripeSubscriptionId ?? null},
      ${input.stripePriceId ?? null},
      ${input.currentPeriodEnd ?? null}
    )
    on conflict (user_id)
    do update set
      status = excluded.status,
      stripe_customer_id = coalesce(excluded.stripe_customer_id, memberships.stripe_customer_id),
      stripe_subscription_id = coalesce(excluded.stripe_subscription_id, memberships.stripe_subscription_id),
      stripe_price_id = coalesce(excluded.stripe_price_id, memberships.stripe_price_id),
      current_period_end = excluded.current_period_end
  `;
}
