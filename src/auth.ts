import {auth} from "@clerk/nextjs/server";

export async function getAuthToken() {
  const authInstance = await auth();
  return (await authInstance.getToken({template: "convex"})) ?? undefined;
}
