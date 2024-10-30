import React from "react";
import {Button} from "./ui/button";
import Link from "next/link";
import {Archive} from "lucide-react";
function Header() {
  return (
    <header className=" md:p-4 p-2 border-b sticky top-0 z-[20] bg-black self-start w-full ">
      <div className="flex flex-row gap-4 ">
        <Link href="/homefeed">
          <h1 className="text-white self-center text-2xl font-bold">
            UniCollab
          </h1>
        </Link>
        <Link
          href="/archive"
          className=" ml-auto justify-center flex   self-center">
          <Archive color="white" className="self-center" size={24} />
        </Link>
        <Link href="/shareidea" className="self-end   ">
          <Button
            variant={"outline"}
            className="ml-auto flex font-cinzel  "
            size="sm">
            Share Idea
          </Button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
