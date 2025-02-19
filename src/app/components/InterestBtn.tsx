"use client";

import {Button} from "@/components/ui/button";
import {Id} from "../../../convex/_generated/dataModel";
import {useMutation, useQuery} from "convex/react";
import {api} from "../../../convex/_generated/api";
import SaveLaterBtn from "./SaveLaterBtn";
import {navigate} from "@/actions/manageRefresh";
import {emailInterest} from "@/lib/emailInterest";
import {useClipboardWithToast} from"@/hooks/useCopyEmail"
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

  const user = useQuery(api.users.current);
  const {copyToClipboard}= useClipboardWithToast()
  const onPress = (type: "interested" | "saved" | "del") => {
    type !== "del"
      ? express({ideaId, type})
          .catch((error) => {
            console.error(error, "e");
          })
          .then((result) => {



            if (result?.status === "error") {
              alert(result?.message);
            } else {
              if (type === "interested") {
                emailInterest(title, user?.email as string);
                copyToClipboard(user?.email as string);
              }
            }
          })
      : del({ideaId, type: "saved"});
    type == "del" || mode == "del" ? navigate() : null;
  };
  //NEED TO SEND TYPE
  console.log(authId, user?._id)
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
