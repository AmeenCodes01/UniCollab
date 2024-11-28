"use client";

import {Button} from "@/components/ui/button";
import {Id} from "../../../convex/_generated/dataModel";
import {useMutation, useQuery} from "convex/react";
import {api} from "../../../convex/_generated/api";
import SaveLaterBtn from "./SaveLaterBtn";
import {navigate} from "@/actions/manageRefresh";
import {emailInterest} from "@/lib/emailInterest";

const InterestBtn = ({
  title,
  ideaId,
  mode,
  authId,
}: {
  title: string;
  ideaId: Id<"ideas">;
  mode?: string;
  authId: Id<"users">;
}) => {
  const express = useMutation(api.interested.accept);
  const del = useMutation(api.interested.reject);
  const user = useQuery(api.ideas.userByIdea, {ideaId});
  console.log("u s e r", user);
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
                ? emailInterest(title, user?.email as string)
                : null;
          })
      : del({ideaId, type: "saved"});
    console.log("down here, before navigate", type);
    type == "del" || mode == "del" ? navigate() : null;
    console.log("down here, after navigate", type);
  };
  console.log(user?._id === authId, "useridchecking", user?._id, ideaId);
  //NEED TO SEND TYPE
  return (
    <>
      <Button
        onClick={() => onPress("interested")}
        variant={"default"}
        disabled={user?._id ? user._id === authId : false}>
        I'm Interested
      </Button>
      {mode === "del" ? (
        <Button variant={"destructive"} onClick={() => onPress("del")}>
          Delete
        </Button>
      ) : (
        <SaveLaterBtn
          onPress={onPress}
          disabled={user?._id ? user._id === authId : false}
        />
      )}
    </>
  );
};
export default InterestBtn;
