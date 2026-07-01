import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getMembership, isPremiumStatus } from "@/lib/membership";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({
      signedIn: false,
      premium: false,
      membership: null,
    });
  }

  const membership = await getMembership(userId);

  return NextResponse.json({
    signedIn: true,
    premium: isPremiumStatus(membership.status),
    membership,
  });
}
