import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MoreHorizontal } from "lucide-react";


import { navigate } from "@/actions/manageRefresh";
import { Doc } from "../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../convex/_generated/api";

function PendRejSheet({ idea }: { idea: Doc<"ideas"> }) {
  // render based on whether user is a councilMember or not.


  return (<Sheet>
    
    <SheetTrigger>
    <MoreHorizontal className="h-4 w-4" />
    </SheetTrigger>
    {
    idea.status =="rejected"?
    <div>
        <span>{idea.rejectedReason}</span> 

    </div> 
  
  : <div>
    Awaiting Approval. If rejected, the reason will be shown here.
  </div>
  
  }</Sheet>);
}

export default PendRejSheet
