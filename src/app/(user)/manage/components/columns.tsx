"use client";
import { ColumnDef } from "@tanstack/react-table";

import { Doc  } from "../../../../../convex/_generated/dataModel";

import SheetComp from "./SheetComp";
import DialogueComp from "./DialogueComp";
export const columns: ColumnDef<
  Doc<"ideas"> & { type: "interested" | "saved" | "member" | "author" }
>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "_creationTime",
    header: "Start",
    cell: ({ row }) => {
      const idea = row.original;
      if (
        row.getValue("_creationTime") &&
        idea.status !== "pending" &&
        idea.status !== "rejected"
      ) {
        const date = new Date(Math.floor(row.getValue("_creationTime")));
        const dateOnly = date.toISOString().split("T")[0];
        return <span>{dateOnly}</span>;
      }
    },
  },

  {
    accessorKey: "endedAt",
    header: "End",
    cell: ({ row }) => {
      const idea = row.original;
      console.log(idea, "idea");
      if (
        row.getValue("endedAt") &&
        idea.status !== "pending" &&
        idea.status !== "rejected"
      ) {
        const date = new Date(Math.floor(row.getValue("endedAt")));
        const dateOnly = date.toISOString().split("T")[0];
        return <span>{dateOnly}</span>;
      }
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
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
