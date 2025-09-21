"use client";

import {Button} from "@/components/ui/button";
import {Id} from "../../../convex/_generated/dataModel";
import {useMutation, useQuery} from "convex/react";
import {api} from "../../../convex/_generated/api";
import SaveLaterBtn from "./SaveLaterBtn";
import {navigate} from "@/actions/manageRefresh";
import {emailInterest} from "@/lib/emailInterest";
import {useClipboardWithToast} from"@/hooks/useCopyEmail"
import { useState } from "react";
const InterestBtn = ({
  title,
  ideaId,
  mode,
  authId,
  disableInterest,
  disableSave
}: {
  title: string;
  ideaId: Id<"ideas">;
  mode?: string;
  authId: Id<"users">;
  disableInterest?:boolean;
  disableSave?:boolean;
}) => {
  const express = useMutation(api.interested.accept);
  const del = useMutation(api.interested.reject);
  const user = useQuery(api.users.current);
  const isUser = ( user?._id ? user._id === authId : false)
  const [txt,setTxt]=useState("I'm Interested")
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
            //    emailInterest(title, user?.email as string);
                copyToClipboard(user?.email as string);
                setTxt("Email copied to clipboard!")
                setTimeout(()=>setTxt("I'm Interested"),2000)
              }
            }
          })
      : del({ideaId, type: "saved"});
    type == "del" || mode == "del" ? navigate() : null;
  };
  //NEED TO SEND TYPE
  return (
    <>
{!isUser ? 
<>

<Button
        onClick={() => onPress("interested")}
        variant={"default"}
        disabled={disableInterest && disableInterest == true || isUser}>
        { (!isUser && disableInterest) ?"Interest shown!" :txt  }
      </Button>
      {mode === "del" ? (
        <Button variant={"destructive"} onClick={() => onPress("del")}>
          Delete
        </Button>
      ) : (
        <>
        {disableInterest ==false || disableInterest==undefined  ?<SaveLaterBtn
          onPress={onPress}
          saved = {disableSave}
          disabled={isUser || disableInterest&&disableInterest==true ?true:false}
          />:null}
          </>
      )}
      </>
      : null
      }
    </>
  );
};
export default InterestBtn;
