export type PlanKey = "free" | "premium";

export const PLANS = {
  free: {
    key: "free",
    name: "Gratuit",
    sommelierMonthlyLimit: 3,
    scannerMonthlyLimit: 3,
    cellarLimit: 12,
    listsLimit: 2,
  },
  premium: {
    key: "premium",
    name: "Premium",
    sommelierMonthlyLimit: null,
    scannerMonthlyLimit: null,
    cellarLimit: null,
    listsLimit: null,
  },
} as const;

export function getPlan(isPremium: boolean) {
  return isPremium ? PLANS.premium : PLANS.free;
}
