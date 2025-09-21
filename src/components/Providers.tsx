"use client";

import AuthScreen from "@/app/auth/component/AuthScreen";
import {ClerkProvider} from "@clerk/nextjs";
import {useAuth} from "@clerk/nextjs";
import {ConvexProviderWithClerk} from "convex/react-clerk";
import {ConvexReactClient} from "convex/react";
import {Authenticated, Unauthenticated} from "convex/react";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {/* Show AuthScreen for unauthenticated users */}
        <Unauthenticated>
          <div className="w-full h-[100%] px-4 flex flex-col mx-auto text-center justify-center items-center gap-2">
            <h1 className="text-6xl font-bold">UniCollab</h1>
            <p className="sm:text-xl text-md text-primary italic">A space for Reading students to share ideas, find teammates, and build projects together

      </p>

            <AuthScreen />
          </div>
        </Unauthenticated>

        {/* Render children for authenticated users */}
        <Authenticated>{children}</Authenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
