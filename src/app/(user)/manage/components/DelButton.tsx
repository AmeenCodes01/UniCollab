"use client";

import {Button} from "@/components/ui/button";

import {useMutation} from "convex/react";
import {api} from "../../../../../convex/_generated/api";
import {Id} from "../../../../../convex/_generated/dataModel";
import {navigate} from "@/actions/manageRefresh";

const DelBtn = ({ideaId}: {ideaId: Id<"ideas">}) => {
  const del = useMutation(api.interested.reject);
  const onPress = () => {
    del({ideaId, type: "interested"});
    navigate();
  };

  return (
    <>
      <Button variant={"destructive"} onClick={onPress}>
        Delete
      </Button>
    </>
  );
};
export default DelBtn;
