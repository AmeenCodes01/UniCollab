"use client";

import {Button} from "@/components/ui/button";

type Props = {
  onPress: (type: "saved") => void;
  disabled: boolean;
  saved?:boolean
};

function SaveLaterBtn({onPress, disabled,saved}: Props) {
  return (
    <Button
      onClick={() => onPress("saved")}
      variant={"outline"}
      disabled={saved || disabled}>
     {saved?"Saved":" Save for later"}
    </Button>
  );
}

export default SaveLaterBtn;
