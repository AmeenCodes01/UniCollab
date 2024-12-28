"use client";
import { ColumnDef } from "@tanstack/react-table";

import { Doc } from "../../../../../../convex/_generated/dataModel";

import SheetComp from "../SheetComp";
import DialogueComp from "../DialogueComp";
import { Button } from "@/components/ui/button";
import PendRejSheet from "./Sheet";
export const pendRejcols: ColumnDef<
  Doc<"ideas"> 
>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      // queries based on status.

      const idea = row.original;
      // const { asPath } = useRouter()
      // console.log(asPath,"asPath")
      // we need I D E A.
      //disaster: INTERESTED HAS USERIDs, NEED INTERESTED ID.
      return (
        <div className="flex gap-2">
          <PendRejSheet idea={idea} />

          {/* Sheet for open & ongoing. */}
          {/* {idea.type == "member" || idea.type == "author" ? (
            <SheetComp idea={idea} />
          ) : (
            <DialogueComp idea={idea} />
          )} */}
          {/* <IdeaDialogue title={idea.title} /> */}
        </div>
      );
    },
  },
];
