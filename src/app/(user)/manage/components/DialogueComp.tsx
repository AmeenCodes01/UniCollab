import React from "react";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {MoreHorizontal} from "lucide-react";
import IdeaDialogue from "@/app/components/IdeaDialogue";
import InterestBtn from "@/app/components/InterestBtn";
import DelBtn from "./DelButton";
import {IdeaWithType} from "../../../../../env";
import { DialogTitle } from "@radix-ui/react-dialog";

type Props = {idea: IdeaWithType};

function DialogueComp({idea}: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        <MoreHorizontal className="h-4 w-4" />
      </DialogTrigger>
      <DialogTitle></DialogTitle>
      <IdeaDialogue
        title={idea.title}
        desc={idea.description}
        btn={
          idea.type == "interested" ? (
            <DelBtn ideaId={idea._id} title={idea.title} />
          ) : (
            <InterestBtn ideaId={idea._id} title={idea.title} mode="del" />
          )
        }
      />
    </Dialog>
  );
}

export default DialogueComp;
