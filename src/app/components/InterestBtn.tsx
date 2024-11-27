"use client";

import {Button} from "@/components/ui/button";
import {Id} from "../../../convex/_generated/dataModel";
import {useMutation} from "convex/react";
import {api} from "../../../convex/_generated/api";
import SaveLaterBtn from "./SaveLaterBtn";
import {navigate} from "@/actions/manageRefresh";

const InterestBtn = ({
  title,
  ideaId,
  mode,
}: {
  title: string;
  ideaId: Id<"ideas">;
  mode?: string;
}) => {
  const emailInterest = (ideaTitle: string) => {
    const email = "student@example.com";
    const subject = encodeURIComponent(
      `Interested in joining project ${ideaTitle} `
    );
    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  const express = useMutation(api.interested.accept);
  const del = useMutation(api.interested.reject);
  const onPress = (type: "interested" | "saved" | "del") => {
    type !== "del"
      ? express({ideaId, type})
          .catch((error) => {
            console.error(error, "e");
          })
          .then((result) => {
            result?.status == "error"
              ? alert(result?.message)
              : type == "interested"
                ? emailInterest(title)
                : null;
          })
      : del({ideaId, type: "saved"});
    console.log("down here, before navigate", type);
    type == "del" || mode == "del" ? navigate() : null;
    console.log("down here, after navigate", type);
  };
  //NEED TO SEND TYPE
  return (
    <>
      <Button onClick={() => onPress("interested")} variant={"default"}>
        I'm Interested
      </Button>
      {mode === "del" ? (
        <Button variant={"destructive"} onClick={() => onPress("del")}>
          Delete
        </Button>
      ) : (
        <SaveLaterBtn onPress={onPress} />
      )}
    </>
  );
};
export default InterestBtn;
