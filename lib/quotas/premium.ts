import { getPremiumAccess } from "@/lib/access/premium";
import { countMonthlyUsage, type UsageFeature } from "@/lib/usage/server";

type QuotaResult = {
  signedIn: boolean;
  isPremium: boolean;
  feature: UsageFeature;
  used: number;
  limit: number | null;
  remaining: number | null;
  allowed: boolean;
};

export async function getFeatureQuota(feature: UsageFeature): Promise<QuotaResult> {
  const access = await getPremiumAccess();

  if (!access.signedIn || !access.userId) {
    return {
      signedIn: false,
      isPremium: false,
      feature,
      used: 0,
      limit: 0,
      remaining: 0,
      allowed: false,
    };
  }

  const limit =
    feature === "sommelier"
      ? access.plan.sommelierMonthlyLimit
      : access.plan.scannerMonthlyLimit;

  if (limit === null) {
    return {
      signedIn: true,
      isPremium: true,
      feature,
      used: 0,
      limit: null,
      remaining: null,
      allowed: true,
    };
  }

  const used = await countMonthlyUsage(access.userId, feature);
  const remaining = Math.max(limit - used, 0);

  return {
    signedIn: true,
    isPremium: access.isPremium,
    feature,
    used,
    limit,
    remaining,
    allowed: used < limit,
  };
}
