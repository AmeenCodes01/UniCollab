"use client";

import {Button} from "@/components/ui/button";

type Props = {
  onPress: (type: "saved") => void;
};

function SaveLaterBtn({onPress}: Props) {
  return (
    <Button onClick={() => onPress("saved")} variant={"outline"}>
      Save for later
    </Button>
  );
}

export default SaveLaterBtn;
