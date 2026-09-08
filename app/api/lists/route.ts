import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { writeClient } from "@/sanity/lib/write-client";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const lists = await writeClient.fetch(
    `*[_type == "wineList" && userId == $userId] | order(createdAt desc) {
      _id,
      name,
      createdAt,
      updatedAt,
      "wines": wines[]->{
        _id,
        name,
        "slug": slug.current,
        vintage,
        bottleImage,
        approxPrice,
        producer->{name}
      }
    }`,
    { userId }
  );

  return NextResponse.json({ lists });
}

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  if (!name) {
    return NextResponse.json(
      { error: "Le nom de la liste est requis." },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();

  const list = await writeClient.create({
    _type: "wineList",
    userId,
    name,
    wines: [],
    createdAt: now,
    updatedAt: now,
  });

  return NextResponse.json({ list }, { status: 201 });
}
