import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { writeClient } from "@/sanity/lib/write-client";

type RouteContext = {
  params: Promise<{
    listId: string;
  }>;
};

async function getOwnedList(listId: string, userId: string) {
  return writeClient.fetch(
    `*[_type == "wineList" && _id == $listId && userId == $userId][0]{
      _id,
      userId,
      name,
      wines
    }`,
    { listId, userId }
  );
}

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { listId } = await context.params;
  const list = await getOwnedList(listId, userId);

  if (!list) {
    return NextResponse.json(
      { error: "Liste introuvable." },
      { status: 404 }
    );
  }

  await writeClient.delete(listId);

  return NextResponse.json({ ok: true });
}

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { listId } = await context.params;
  const list = await getOwnedList(listId, userId);

  if (!list) {
    return NextResponse.json(
      { error: "Liste introuvable." },
      { status: 404 }
    );
  }

  const body = await request.json();
  const action = body?.action;
  const wineId =
    typeof body?.wineId === "string" ? body.wineId.trim() : "";

  if (!wineId || !["add", "remove"].includes(action)) {
    return NextResponse.json(
      { error: "Action ou vin invalide." },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();

  if (action === "add") {
    const alreadyExists = await writeClient.fetch(
      `count(*[
        _type == "wineList" &&
        _id == $listId &&
        references($wineId)
      ]) > 0`,
      { listId, wineId }
    );

    if (!alreadyExists) {
      await writeClient
        .patch(listId)
        .setIfMissing({ wines: [] })
        .append("wines", [
          {
            _type: "reference",
            _ref: wineId,
            _key: crypto.randomUUID(),
          },
        ])
        .set({ updatedAt: now })
        .commit();
    }
  }

  if (action === "remove") {
    await writeClient
      .patch(listId)
      .unset([`wines[_ref=="${wineId}"]`])
      .set({ updatedAt: now })
      .commit();
  }

  return NextResponse.json({ ok: true });
}
