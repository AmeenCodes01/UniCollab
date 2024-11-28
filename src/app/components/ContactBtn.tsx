"use client";
import React from "react";
import {emailInterest} from "@/lib/emailInterest";
import {Id} from "../../../convex/_generated/dataModel";
import {useQuery} from "convex/react";
import {api} from "../../../convex/_generated/api";
import {Button} from "@/components/ui/button";

function ContactBtn({ideaId, title}: {title: string; ideaId: Id<"ideas">}) {
  const user = useQuery(api.ideas.userByIdea, {ideaId});
  const onContact = () => {
    emailInterest(title, user?.email as string);
  };
  return (
    <Button variant={"outline"} onClick={onContact}>
      Contact
    </Button>
  );
}

export default ContactBtn;
