import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";

import Link from "next/link";
function ShareIdea() {
  return (
    <div className="justify-center items-center flex  flex-col w-full  h-full  ">
      <form className="flex flex-col gap-4  md:gap-6  items-center self-center w-[90%] md:w-[80%]  ">
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label>title</Label>
          <Input
            type="text"
            placeholder=" Idea title i.e Virtual Card Maker "
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
          <Input
            type="text"
            placeholder="artist / web dev / 3d / psychology etc"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label className="text-xs ">Meeting format</Label>
          <Input type="text" placeholder="weekly 3 hrs / bi-weekly 2hrs /  " />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label className="text-xs ">short description:</Label>

          <Input type="text" placeholder="short description" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-4">
          <Textarea
            placeholder="Share more about your idea, from which school you'd like teammates to be or the skills you need help with etc.
             It is completely fine to say `I'll disclose more about my idea upon meeting.`
            "
            className=" px-2 min-h-32  border-[1.5px] "
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
