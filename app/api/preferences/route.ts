import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

type UserPreferences = {
  _id: string;
  mainWineType: string;
  budget: string;
  bodyPreference: number;
  stylePreference: string;
  mainOccasion: string;
};

const allowedWineTypes = [
  "white",
  "red",
  "sparkling",
  "rose",
  "orange",
  "everything",
];

const allowedBudgets = [
  "under-20",
  "20-30",
  "30-50",
  "50-plus",
];

const allowedStyles = [
  "classic",
  "adventurous",
  "both",
];

const allowedOccasions = [
  "weeknight",
  "hosting",
  "discovering",
  "gifting",
  "special-occasions",
];

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Connexion requise." },
      { status: 401 }
    );
  }

  const preferences = await client.fetch<UserPreferences | null>(
    `*[
      _type == "userPreferences" &&
      userId == $userId
    ][0]{
      _id,
      mainWineType,
      budget,
      bodyPreference,
      stylePreference,
      mainOccasion
    }`,
    { userId }
  );

  return NextResponse.json({ preferences });
}

export async function PUT(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Connexion requise." },
      { status: 401 }
    );
  }

  const body = await request.json();

  const mainWineType = String(body.mainWineType || "").trim();
  const budget = String(body.budget || "").trim();
  const bodyPreference = Number(body.bodyPreference);
  const stylePreference = String(body.stylePreference || "").trim();
  const mainOccasion = String(body.mainOccasion || "").trim();

  if (!allowedWineTypes.includes(mainWineType)) {
    return NextResponse.json(
      { error: "Le type de vin sélectionné est invalide." },
      { status: 400 }
    );
  }

  if (!allowedBudgets.includes(budget)) {
    return NextResponse.json(
      { error: "Le budget sélectionné est invalide." },
      { status: 400 }
    );
  }

  if (
    !Number.isInteger(bodyPreference) ||
    bodyPreference < 1 ||
    bodyPreference > 5
  ) {
    return NextResponse.json(
      { error: "La préférence léger/généreux est invalide." },
      { status: 400 }
    );
  }

  if (!allowedStyles.includes(stylePreference)) {
    return NextResponse.json(
      { error: "Le style sélectionné est invalide." },
      { status: 400 }
    );
  }

  if (!allowedOccasions.includes(mainOccasion)) {
    return NextResponse.json(
      { error: "L'occasion sélectionnée est invalide." },
      { status: 400 }
    );
  }

  const existing = await client.fetch<{ _id: string } | null>(
    `*[
      _type == "userPreferences" &&
      userId == $userId
    ][0]{
      _id
    }`,
    { userId }
  );

  const now = new Date().toISOString();

  const preferences = existing
    ? await writeClient
        .patch(existing._id)
        .set({
          mainWineType,
          budget,
          bodyPreference,
          stylePreference,
          mainOccasion,
          updatedAt: now,
        })
        .commit()
    : await writeClient.create({
        _type: "userPreferences",
        userId,
        mainWineType,
        budget,
        bodyPreference,
        stylePreference,
        mainOccasion,
        createdAt: now,
        updatedAt: now,
      });

  return NextResponse.json({ preferences });
}
