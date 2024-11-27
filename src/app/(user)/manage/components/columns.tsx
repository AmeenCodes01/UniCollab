"use client";
import {ColumnDef} from "@tanstack/react-table";

import {Button} from "@/components/ui/button";
import {Doc, Id} from "../../../../../convex/_generated/dataModel";

import {useMutation, useQuery} from "convex/react";
import {api} from "../../../../../convex/_generated/api";
import SheetComp from "./SheetComp";
import IdeaDialogue from "@/app/components/IdeaDialogue";
import DialogueComp from "./DialogueComp";
export const columns: ColumnDef<
  Doc<"ideas"> & {type: "interested" | "saved" | "member" | "author"}
>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "_creationTime",
    header: "Start",
    cell: ({row}) => {
      const date = new Date(Math.floor(row.getValue("_creationTime")));
      const dateOnly = date.toISOString().split("T")[0];
      return <span>{dateOnly}</span>;
    },
  },
  {
    accessorKey: "endedAt",
    header: "End",
    cell: ({row}) => {
      if (row.getValue("endedAt")) {
        const date = new Date(Math.floor(row.getValue("endedAt")));
        const dateOnly = date.toISOString().split("T")[0];
        return <span>{dateOnly}</span>;
      }
    },
  },
  {
    id: "actions",
    cell: ({row}) => {
      // queries based on status.

      const idea = row.original;
      // we need I D E A.
      //disaster: INTERESTED HAS USERIDs, NEED INTERESTED ID.
      return (
        <>
          {/* Sheet for open & ongoing. */}
          {idea.type == "member" || idea.type == "author" ? (
            <SheetComp idea={idea} />
          ) : (
            <DialogueComp idea={idea} />
          )}
          {/* <IdeaDialogue title={idea.title} /> */}
        </>
      );
    },
  },
];
