import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MoreHorizontal } from "lucide-react";

import { Doc } from "../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/compat/router";
import { redirect, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import {navigateApproval} from "@/actions/manageRefresh"
function PendRejSheet({ idea }: { idea: Doc<"ideas"> }) {
  const [reason, setReason] = useState("");
  // render based on whether user is a councilMember or not.

  const action = useMutation(api.ideas.changeStatus);
  const pathname = usePathname();



  console.log(pathname);
  //   const token = await getAuthToken()

  // const Content = () => {
  //   if (pathname == "/manage") { 
  //     return (
  //       <>
  //         {idea.status == "rejected" ? (
  //           <div>
  //             <span>{idea.rejectedReason}</span>
  //           </div>
  //         ) : (
  //           <div>
  //             Awaiting Approval. If rejected, the reason will be shown here.
  //           </div>
  //         )}
  //       </>
  //     );
  //   }

  //   if (pathname == "/approval") {
  //     return (
  //       <div className="flex gap-4  flex-col">
  //         <Button
  //           className="w-full"
  //           onClick={() => {
  //             action({ status: "open", ideaId: idea._id });
  //             navigateApproval();
  //           }}
  //         >
  //           Approve
  //         </Button>
  //         <Input
  //           value={reason}
  //           onChange={(e) => setReason(e.target.value)}
  //           placeholder="Give a reason for rejecting."
  //         />
  //         <Button
  //           variant={"destructive"}
  //           onClick={() => {
  //             if (reason !== "") {
  //               action({
  //                 status: "rejected",
  //                 ideaId: idea._id,
  //                 rejectedReason: reason,
  //               });
  //               navigateApproval();
  //             } else {
  //               alert("please give a reason.");
  //             }
  //           }}
  //         >
  //           Reject
  //         </Button>
  //       </div>
  //     );
  //   }
  // };

  return (
    <Sheet>
      <SheetTrigger>
        <MoreHorizontal className="h-4 w-4" />
      </SheetTrigger>
      <SheetDescription></SheetDescription>
      <SheetContent className="flex flex-col">
        <SheetTitle></SheetTitle>

        {pathname == "/manage" ? (
          <>
            {idea.status == "rejected" ? (
              <div>
                <span>{idea.rejectedReason}</span>
              </div>
            ) : (
              <div>
                Awaiting Approval. If rejected, the reason will be shown here.
              </div>
            )}
          </>
        ) : (
          <div className="flex gap-4  mt-auto flex-col">
            <Button
              className="w-full  "
              onClick={() => {
                action({ status: "open", ideaId: idea._id });
                navigateApproval();
              }}
            >
              Approve
            </Button>
            <Input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Give a reason for rejecting."
            />
            <Button
              variant={"destructive"}
              onClick={() => {
                if (reason !== "") {
                  action({
                    status: "rejected",
                    ideaId: idea._id,
                    rejectedReason: reason,
                  });
                  navigateApproval();
                } else {
                  alert("please give a reason.");
                }
              }}
            >
              Reject
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default PendRejSheet;
