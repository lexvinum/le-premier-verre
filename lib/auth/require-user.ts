import { redirect } from "next/navigation";
import { getCurrentPrismaUser } from "@/lib/auth/current-user";

export async function requireUser() {
  const user = await getCurrentPrismaUser();

  if (!user) {
    redirect("/connexion");
  }

  return user;
}
