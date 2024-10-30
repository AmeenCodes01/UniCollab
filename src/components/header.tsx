import React from "react";
import {Button} from "./ui/button";
import Link from "next/link";
import {Archive} from "lucide-react";
function Header() {
  return (
    <header className="  border-b sticky h-16 top-0 z-[20] self-start w-full ">
      <div className="flex flex-row gap-4  bg-black h-full md:p-4 p-2 items-center">
        <Link href="/homefeed">
          <h1 className="text-white self-center text-2xl font-bold">
            UniCollab
          </h1>
        </Link>
        <Link
          href="/archive"
          className=" ml-auto justify-center flex  my-auto self-center">
          <Archive color="white" className="self-center" size={24} />
        </Link>
        <Link href="/shareidea" className="self-center  justify-center  ">
          <Button
            variant={"outline"}
            className="ml-auto flex font-cinzel self-center  "
            size="sm">
            Share Idea
          </Button>
        </Link>
      </div>
      <span className="italic pl-2 text-gray-700  text-sm bg-gray-100">
        *example data taken from ChatGPT and Claude
      </span>
    </header>
  );
}

export default Header;
