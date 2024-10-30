import {Button} from "@/components/ui/button";
import Link from "next/link";
function AuthScreen() {
  return (
    <div>
      <Link href="/homefeed" className="flex items-center justify-center">
        <Button>Login</Button>
      </Link>
      <p className="text-xs mt-4 text-blue-500">
        Implementing Microsoft login soon
      </p>
    </div>
  );
}

export default AuthScreen;
