import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

import Link from "next/link";
function AuthScreen() {
  return (
    <div className="flex items-center mt-8 flex-col justify-center">
      {/* <Link href="/homefeed" className=""> */}

      <SignInButton forceRedirectUrl="/homefeed">
        <Button className="w-full flex min-w-[300px]">Login</Button>
      </SignInButton>
      
      {/* </Link> */}
      {/* <p className="text-xs mt-4 text-blue-500">
        Implementing Microsoft login soon
      </p> */}
    </div>
  );
}

export default AuthScreen;
