import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {MoreHorizontal} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Doc, Id} from "../../../../../convex/_generated/dataModel";

import {useMutation, useQuery} from "convex/react";
import {api} from "../../../../../convex/_generated/api";
function SheetComp({idea}: {idea: Doc<"ideas">}) {
  const interested =
    idea.status === "open"
      ? useQuery(api.interested.get, {ideaId: idea._id})
      : null;

  const team = useQuery(api.teams.get, {ideaId: idea._id});
  const accept = useMutation(api.teams.accept);
  const acceptUser = (id: Id<"interested">) =>
    accept({ideaId: idea._id, interestedId: id});

  return (
    <Sheet>
      <SheetTrigger>
        {/* <Button variant="ghost" className="h-8 w-8 p-0"> */}
        <MoreHorizontal className="h-4 w-4" />
        {/* </Button> */}
      </SheetTrigger>
      <SheetContent className="w-[400px]">
        <SheetHeader>
          <SheetDescription className=" w-full">
            {/* {interested?.[0]?.email ?? ""} */}
          </SheetDescription>
        </SheetHeader>
        <div className="w-full h-[50%]">
          <SheetTitle className="text-2xl md:text-3xl pb-4">
            Team Members
          </SheetTitle>
          {team
            ? team.map((u, i) => (
                <div
                  key={u?._creationTime}
                  className={`border-t-[2px] py-2 px-2 w-full flex flex-col gap-2
                         ${i == team.length - 1 ? "border-b-[2px]" : null}
                          `}>
                  <span className="">
                    <span>{u?.email}</span>
                  </span>
                </div>
              ))
            : ""}
        </div>
        <div className="w-full h-[50%]">
          {interested ? (
            <>
              <SheetTitle className="text-2xl md:text-3xl pb-4">
                Interested
              </SheetTitle>
              {interested.map((u, i) => (
                <div
                  key={u?._creationTime}
                  className={`border-t-[2px] py-2 px-2 w-full flex flex-col gap-2
                         ${i == interested.length - 1 ? "border-b-[px]" : null}
                          `}>
                  <span className="">
                    <span>{u?.email}</span>
                  </span>
                  {idea.status === "open" ? (
                    <div className="flex gap-2 flex-row justify-end ">
                      <Button
                        onClick={() =>
                          acceptUser(u?.interestedId as Id<"interested">)
                        }>
                        Accept
                      </Button>
                      <Button>Reject</Button>
                    </div>
                  ) : null}
                </div>
              ))}
            </>
          ) : (
            ""
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SheetComp;
