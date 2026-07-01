import { auth } from "@clerk/nextjs/server";
import { getMembership, isPremiumStatus } from "@/lib/membership";
import { getPlan } from "@/lib/plans/premium";

export type PremiumAccess = {
  signedIn: boolean;
  userId: string | null;
  isPremium: boolean;
  plan: ReturnType<typeof getPlan>;
};

export async function getPremiumAccess(): Promise<PremiumAccess> {
  const { userId } = await auth();

  if (!userId) {
    return {
      signedIn: false,
      userId: null,
      isPremium: false,
      plan: getPlan(false),
    };
  }

  const membership = await getMembership(userId);
  const isPremium = isPremiumStatus(membership.status);

  return {
    signedIn: true,
    userId,
    isPremium,
    plan: getPlan(isPremium),
  };
}

export async function requirePremiumAccess() {
  const access = await getPremiumAccess();
  return access;
}

export function canUseSommelier(access: PremiumAccess) {
  return access.signedIn;
}

export function canUseScanner(access: PremiumAccess) {
  return access.signedIn;
}

export function canUseCellar(access: PremiumAccess) {
  return access.signedIn;
}

export function canUseLists(access: PremiumAccess) {
  return access.signedIn;
}

export function canSeePremiumContent(access: PremiumAccess) {
  return access.isPremium;
}
