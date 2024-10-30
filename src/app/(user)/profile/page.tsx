import IdeaCard from "@/app/(ic)/homefeed/component/IdeaCard";
import React from "react";
import projects from "@/../projects.json";
import {CardTitle} from "@/components/ui/card";
import {Dialog} from "@/components/ui/dialog";
import {DialogTrigger} from "@radix-ui/react-dialog";
import IdeaDialogue from "@/app/components/IdeaDialogue";

//display interested projects
//your ideas. interest shown.
function profile() {
  return (
    <div className="w-full  flex flex-col">
      <h1 className="text-black"> History</h1>
      <div className=" ">
        <h1 className="text-2xl font-bold ">Ideas pitched</h1>
        <div className="grid md:grid-rows-3   items-center ">
          {projects.length !== 0
            ? projects.slice(0, 3).map((idea, i) => (
                <Dialog key={i}>
                  <DialogTrigger>
                    <CardTitle className="font-cinzel text-md font-medium  p-2 text-start ">
                      {idea.title}
                    </CardTitle>
                  </DialogTrigger>
                  <IdeaDialogue title={idea.title} desc={idea.description} />
                </Dialog>
              ))
            : null}
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold ">Ideas Interested In</h1>
        <div className="grid md:grid-rows-3   items-center ">
          {projects.length !== 0
            ? projects.slice(0, 3).map((idea, i) => (
                <Dialog key={i}>
                  <DialogTrigger>
                    <CardTitle className="font-cinzel text-md font-medium border-[1.5px]  p-2 text-start ">
                      {idea.title}
                    </CardTitle>
                  </DialogTrigger>
                  <IdeaDialogue title={idea.title} desc={idea.description} />
                </Dialog>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default profile;
