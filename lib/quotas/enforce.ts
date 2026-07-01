import { getFeatureQuota } from "@/lib/quotas/premium";
import { recordUsage } from "@/lib/usage/server";

export type FeatureName = "sommelier" | "scanner";

export async function enforceQuota(feature: FeatureName) {
  return getFeatureQuota(feature);
}

export async function consumeQuota(feature: FeatureName, userId: string) {
  await recordUsage(userId, feature);
}
