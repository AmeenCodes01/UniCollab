import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {fetchMutation} from "convex/nextjs";

import Link from "next/link";
import {api} from "../../../../convex/_generated/api";
import {revalidatePath} from "next/cache";
import {FormEvent} from "react";

function ShareIdea() {
  async function createIdea(event: FormEvent<HTMLFormElement>) {
    "use server";
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // Helper function to validate form data
    const getField = (fieldName: string, required: boolean = true): string => {
      const value = formData?.get(fieldName) as string;
      if (
        required &&
        (value === null || (typeof value === "string" && value.trim() === ""))
      ) {
        throw new Error(`Field '${fieldName}' is required.`);
      }
      return value;
    };
    console.log("hello, trying to send");

    try {
      // Validate and get the fields from formData
      const title = getField("title");
      const shortDesc = getField("shortDesc");
      const description = getField("description");
      const lookingFor = getField("lookingFor");
      const meetingFormat = getField("meetingFormat");

      // Safely handle 'limit' as a number, with a fallback of 3
      const limitValue = formData.get("limit");
      const limit =
        limitValue !== null && !isNaN(Number(limitValue))
          ? parseInt(limitValue as string)
          : 3;

      // Send the request
      await fetchMutation(api.ideas.create, {
        title,
        shortDesc,
        description,
        lookingFor,
        meetingFormat,
        limit,
      });

      // Revalidate the path after successful creation
      revalidatePath("/homefeed");
    } catch (error) {
      // Handle errors (form validation or API errors)
      console.error("Error creating idea:", error);
      // Here you could show an alert or return an error response depending on your application flow.
    }
  }

  return (
    <div className="justify-center items-center flex  flex-col w-full  h-full  ">
      <form
        className="flex flex-col gap-4  md:gap-6  items-center self-center w-[90%] md:w-[80%]  "
        onSubmit={createIdea}>
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label>title</Label>
          <Input
            type="text"
            placeholder=" Idea title i.e Virtual Card Maker "
            className="w-full"
            name="title"
          />
        </div>
        {/* <div className="grid w-full max-w-sm items-center gap-1">
          <Label>type</Label>

          <Input  2
            type="text"
            placeholder="personal, mobile app"
            className="w-full"
          />
        </div> */}
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label className="text-xs ">Would love collaborating with:</Label>
          <Input
            type="text"
            name="collab"
            placeholder="artist / web dev / 3d / psychology etc"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label className="text-xs ">Meeting format</Label>
          <Input
            type="text"
            name="meetingFormat"
            placeholder="weekly 3 hrs / bi-weekly 2hrs /  "
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label className="text-xs ">No. of Team members</Label>
          <Input type="number" name="limit" placeholder="1" min={1} max={6} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label className="text-xs ">short description:</Label>

          <Input type="text" name="shortDesc" placeholder="short description" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-4">
          <Textarea
            placeholder="Share more about your idea, from which school you'd like teammates to be or the skills you need help with etc.
             It is completely fine to say `I'll disclose more about my idea upon meeting.`
            "
            name="description"
            className=" px-2 min-h-32  border-[1.5px] "
          />
        </div>
        {/* <Input
          type="text"
          placeholder="anything"
          className="placeholder:text-xs placeholder:text-wrap placeholder:py-2"
        /> */}
        {/* <Link href={"/homefeed"} className="w-full flex max-w-sm mt-4"> */}
        <Button className="w-full " type="submit">
          Share Idea
        </Button>
        {/* </Link> */}
      </form>
    </div>
  );
}

export default ShareIdea;
//Button goes into a client side right.
