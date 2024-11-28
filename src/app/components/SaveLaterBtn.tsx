"use client";

import {Button} from "@/components/ui/button";

type Props = {
  onPress: (type: "saved") => void;
  disabled: boolean;
};

function SaveLaterBtn({onPress, disabled}: Props) {
  return (
    <Button
      onClick={() => onPress("saved")}
      variant={"outline"}
      disabled={disabled}>
      Save for later
    </Button>
  );
}

export default SaveLaterBtn;
