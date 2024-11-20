"use client";

import {Button} from "@/components/ui/button";
import {Id} from "../../../convex/_generated/dataModel";
import {useMutation} from "convex/react";
import {api} from "../../../convex/_generated/api";

Button;

const InterestBtn = ({title, ideaId}: {title: string; ideaId: Id<"ideas">}) => {
  const emailInterest = (ideaTitle: string) => {
    const email = "student@example.com";
    const subject = encodeURIComponent(
      `Interested in joining project ${ideaTitle} `
    );

    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  const interested = useMutation(api.interested.accept);
  const save = useMutation(api.saved.save);
  const onInterest = () => {
    interested({ideaId})
      .catch((error) => {
        console.error(error, "e");
      })
      .then((result) => {
        result?.status == "error"
          ? alert(result?.message)
          : emailInterest(title);
      });
  };
  const onSave = () => {
    save({ideaId})
      .catch((error) => {
        console.error(error, "e");
      })
      .then((result) => {
        result?.status == "error" ? alert(result?.message) : null;
      });
  };
  return (
    <>
      <Button onClick={onInterest} variant={"default"}>
        I'm Interested
      </Button>
      <Button onClick={onSave} variant={"outline"}>
        Save for later
      </Button>
    </>
  );
};
export default InterestBtn;
