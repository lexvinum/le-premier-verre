import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { writeClient } from "@/sanity/lib/write-client";

type RouteProps = {
  params: Promise<{
    wineId: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteProps) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Connexion requise." },
      { status: 401 }
    );
  }

  const { wineId } = await params;

  const favorite = await writeClient.fetch<{ _id: string } | null>(
    `*[
      _type == "wineFavorite" &&
      userId == $userId &&
      wine._ref == $wineId
    ][0]{
      _id
    }`,
    { userId, wineId }
  );

  return NextResponse.json({
    favorite: Boolean(favorite),
  });
}

export async function PATCH(request: Request, { params }: RouteProps) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Connexion requise." },
      { status: 401 }
    );
  }

  const { wineId } = await params;
  const body = await request.json();
  const favorite = Boolean(body.favorite);

  const existing = await writeClient.fetch<{ _id: string } | null>(
    `*[
      _type == "wineFavorite" &&
      userId == $userId &&
      wine._ref == $wineId
    ][0]{
      _id
    }`,
    { userId, wineId }
  );

  if (favorite) {
    if (!existing) {
      await writeClient.create({
        _type: "wineFavorite",
        userId,
        wine: {
          _type: "reference",
          _ref: wineId,
        },
        createdAt: new Date().toISOString(),
      });
    }
  } else if (existing) {
    await writeClient.delete(existing._id);
  }

  return NextResponse.json({
    favorite,
  });
}
