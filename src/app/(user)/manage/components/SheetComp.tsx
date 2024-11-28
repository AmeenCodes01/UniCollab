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
import Link from "next/link";

function SheetComp({idea}: {idea: Doc<"ideas">}) {
  const interested =
    idea.status === "open"
      ? useQuery(api.interested.get, {ideaId: idea._id})
      : null;

  const team = useQuery(api.teams.get, {ideaId: idea._id});
  const accept = useMutation(api.teams.accept);
  const reject = useMutation(api.interested.reject);
  const remove = useMutation(api.teams.del);
  const acceptUser = (id: Id<"interested">) =>
    accept({ideaId: idea._id, interestedId: id});

  const rejectUser = (id: Id<"interested">) =>
    reject({ideaId: idea._id, type: "interested"});

  const onRemove = (id: Id<"users">) => {
    remove({ideaId: idea._id, userId: id});
  };
  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  return (
    <Sheet>
      <SheetTrigger>
        {/* <Button variant="ghost" className="h-8 w-8 p-0"> */}
        <MoreHorizontal className="h-4 w-4" />
        {/* </Button> */}
      </SheetTrigger>
      <SheetContent className="w-[400px] flex flex-col ">
        <SheetHeader>
          <SheetDescription className=" w-full">
            {/* {interested?.[0]?.email ?? ""} */}
          </SheetDescription>
        </SheetHeader>
        <div className="w-full h-auto min-h-[100px] ">
          <SheetTitle className="text-2xl md:text-3xl pb-4">
            Team Members
          </SheetTitle>
          {team
            ? team.map((u, i) => (
                <div
                  key={u?._creationTime}
                  className={`border-t-[2px] py-2 px-2 w-full flex flex-row gap-2
                         ${i == team.length - 1 ? "border-b-[2px]" : null}
                          `}>
                  <span className="">
                    <span>{u?.email}</span>
                  </span>
                  <Button
                    className="w-fit justify-end"
                    variant={"destructive"}
                    onClick={() => onRemove(u?._id as Id<"users">)}>
                    Remove
                  </Button>
                </div>
              ))
            : ""}
        </div>
        <div className="w-full h-auto min-h-[100px]">
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
                      <Button
                        onClick={() =>
                          rejectUser(u?.interestedId as Id<"interested">)
                        }>
                        Reject
                      </Button>
                    </div>
                  ) : null}
                </div>
              ))}
            </>
          ) : (
            ""
          )}
        </div>
        <div
          className="mb-3 flex flex-col mt-auto
           gap-3      w-full
        ">
          <Link href={"/shareidea?" + createQueryString("id", idea._id)}>
            <Button className="w-full">Edit</Button>
          </Link>
          <Button className="w-full" variant={"destructive"}>
            Delete{" "}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SheetComp;
