import { prisma } from "@/lib/prisma";
import { getMonthWindow } from "@/lib/usage/month";

export type UsageFeature = "sommelier" | "scanner";

export async function countMonthlyUsage(userId: string, feature: UsageFeature) {
  const { start, end } = getMonthWindow();

  return prisma.usageEvent.count({
    where: {
      userId,
      feature,
      createdAt: {
        gte: start,
        lt: end,
      },
    },
  });
}

export async function recordUsage(userId: string, feature: UsageFeature) {
  return prisma.usageEvent.create({
    data: {
      userId,
      feature,
    },
  });
}
