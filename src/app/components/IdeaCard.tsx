type Props = {
  title: string;
  shortDesc: string;
  desc: string;
  tags?: string[];
  author?: string;
  course?: string;
  type?: string;
  lookingFor?: string;
  email?: string;
  btn?: React.ReactElement;
  meetingFormat?: string;
};
import IdeaDialogue from "@/app/components/IdeaDialogue";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
function IdeaCard({
  title,
  shortDesc,
  desc,
  tags,
  author,
  course,
  type,
  lookingFor,
  email,
  meetingFormat,
  btn,
}: Props) {
  //a profile page for name + year.

  return (
    <div className="flex h-[100%] flex-col ">
      <Dialog>
        <Card className="border-[2px] h-full  border-blue-100 shadow-md hover:shadow-inner flex flex-col  ">
          <DialogTrigger asChild>
            <div>
              <CardHeader className="mt-0">
                <CardTitle className="font-cinzel text-md font-semibold ">
                  {title}
                </CardTitle>
                <CardDescription className="text-xs text-gray-400">
                  <span>
                    {author} • {course}
                  </span>

                  {/* <span>{shortDesc}</span> */}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4 flex-col">
                <p className="text-sm font-medium text-ellipsis overflow-hidden">
                  {shortDesc}
                </p>
                <div className="flex md:flex-row-reverse flex-col gap-4 md:gap-0 justify-between w-full   ">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-800 font-[400] pb-[4px]  ">
                      Seeking teammates eager to contribute or learn in:
                      <br />
                    </span>
                    <span className="text-xs font-extralight text-gray-600 italic">
                      {lookingFor}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-gray-800 font-[500] pb-[4px]  ">
                      {" "}
                      Collab:
                    </span>
                    <span className="text-xs font-extralight text-gray-600 italic md:self-end mt-auto">
                      {" "}
                      {meetingFormat}
                    </span>
                  </div>
                </div>
              </CardContent>
            </div>
          </DialogTrigger>
          <CardFooter className="flex md:flex-row flex-col gap-2  justify-between">
            <div className="flex gap-2">{btn && btn}</div>
            <div className="mt-auto ">
              <span className="text-gray-400 text-xs italic self-end mt-auto">
                Click for more details
              </span>
            </div>
          </CardFooter>
          {btn && (
            <span className="text-gray-400 text-xs italic self-start pl-6 pb-2 ">
              On clicking interest, your email app will open with project title
              and author's email.
            </span>
          )}
        </Card>
        <IdeaDialogue
          title={title}
          shortDesc={shortDesc}
          desc={desc}
          btn={btn}
        />
      </Dialog>
    </div>
  );
}

export default IdeaCard;
