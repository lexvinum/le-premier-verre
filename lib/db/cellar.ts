import { prisma } from "@/lib/prisma";

export async function getCellarByUser(userId: string) {
  return prisma.cellarBottle.findMany({
    where: {
      userId,
    },
    include: {
      wine: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function addBottleToCellar(
  userId: string,
  wineId: string,
  quantity = 1
) {
  return prisma.cellarBottle.create({
    data: {
      userId,
      wineId,
      quantity,
    },
    include: {
      wine: true,
    },
  });
}
