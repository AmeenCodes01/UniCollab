import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";

import Link from "next/link";
function ShareIdea() {
  return (
    <div className="justify-center items-center flex flex-col h-full w-full mt-10  ">
      <form className="flex flex-col gap-4  items-center self-center w-[90%] md:w-[60%] ">
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label>title</Label>
          <Input
            type="text"
            placeholder="Virtual Card Maker "
            className="w-full"
          />
        </div>
        {/* <div className="grid w-full max-w-sm items-center gap-1">
          <Label>type</Label>

          <Input  2
            type="text"
            placeholder="personal, mobile app"
            className="w-full"
          />
        </div> */}
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label className="text-xs ">Would love collaborating with:</Label>
          <Input type="text" placeholder="artist / web dev / 3d" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label className="text-xs ">Meeting format</Label>
          <Input type="text" placeholder="weekly 3 hrs " />
        </div>
        <div className="grid w-full max-w-sm items-center gap-4">
          <Input type="text" placeholder="short description" />
          <Textarea
            placeholder="description"
            className=" px-2 min-h-16  border-[1.5px] "
          />
        </div>
        {/* <Input
          type="text"
          placeholder="anything"
          className="placeholder:text-xs placeholder:text-wrap placeholder:py-2"
        /> */}
        <Link href={"/homefeed"} className="w-full flex max-w-sm mt-4">
          <Button className="w-full ">Share Idea</Button>
        </Link>
      </form>
    </div>
  );
}

export default ShareIdea;
