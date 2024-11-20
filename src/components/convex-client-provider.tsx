"use client";

import {ReactNode} from "react";
import {useAuth} from "@clerk/nextjs";
import {ConvexReactClient} from "convex/react";
import {ConvexProviderWithClerk} from "convex/react-clerk";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function ConvexClientProvider({children}: {children: ReactNode}) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
export default ConvexClientProvider;
