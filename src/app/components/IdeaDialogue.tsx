import React from "react";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
type Props = {
  title: string;
  desc: string;
  shortDesc?: string;
  btn?: React.ReactElement;
};

function IdeaDialogue({title, shortDesc, desc, btn}: Props) {
  return (
    <DialogContent className="flex flex-col  border-blue-300 border-2">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <DialogDescription className="font-light leading-7">
        {desc}
      </DialogDescription>

      {/* <p className="font-light leading-7">{desc}</p> */}
      {/* <div className="flex flex-row  py-2">
            {tags
              ? tags.map((tag: string, i: number) => (
                  <Badge
                    variant="secondary"
                    className="mx-[2px] text-xs font-extralight"
                    key={i}>
                    {tag}
                  </Badge>
                ))
              : null}
          </div> */}
      <DialogFooter className="flex flex-col">
        <DialogClose asChild>{btn && btn}</DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}

export default IdeaDialogue;
