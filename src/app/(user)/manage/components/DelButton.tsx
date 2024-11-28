"use client";

import {Button} from "@/components/ui/button";

import {useMutation, useQuery} from "convex/react";
import {api} from "../../../../../convex/_generated/api";
import {Id} from "../../../../../convex/_generated/dataModel";
import {navigate} from "@/actions/manageRefresh";
import {emailInterest} from "@/lib/emailInterest";
import ContactBtn from "@/app/components/ContactBtn";

const DelBtn = ({ideaId, title}: {title: string; ideaId: Id<"ideas">}) => {
  const del = useMutation(api.interested.reject);

  const onDel = () => {
    del({ideaId, type: "interested"});
    navigate();
  };

  return (
    <>
      <ContactBtn ideaId={ideaId} title={title} />
      <Button variant={"destructive"} onClick={onDel}>
        Delete
      </Button>
    </>
  );
};
export default DelBtn;
