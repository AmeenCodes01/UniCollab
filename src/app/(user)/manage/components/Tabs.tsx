import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {DataTable} from "./Table";
import {columns} from "./columns";
import {Doc} from "../../../../../convex/_generated/dataModel";
import {fetchQuery} from "convex/nextjs";
import {api} from "../../../../../convex/_generated/api";
import {getAuthToken} from "@/auth";

const ProjectManage = async ({
  data,
}: {
  data: (Doc<"ideas"> & {type: "interested" | "saved" | "member" | "author"})[];
}) => {
  const token = await getAuthToken();

  const open = data.filter(
    (idea) => idea.type == "author" && idea.status == "open"
  );
  const closed = data.filter(
    (idea) =>
      idea.status == "closed" &&
      (idea.type == "member" || idea.type == "author")
  );
  // const interestSave = (await fetchQuery(
  //   api.interested.user,
  //   {},
  //   {token}
  // )) as (Doc<"ideas"> & {type: "saved" | "interested"})[];
  const interested = data.filter((idea) => idea.type === "interested");
  const saved = data.filter((idea) => idea.type === "saved");
  console.log(saved, "save");
  console.log(open, "open");

  return (
    <Tabs defaultValue="pitched" className=" w-[70%]  ">
      <TabsList className="w-full ">
        <TabsTrigger value="pitched" className="w-full">
          Pitched
        </TabsTrigger>

        <TabsTrigger value="saved/interested" className="w-full">
          Saved/Interested
        </TabsTrigger>
      </TabsList>
      <TabsContent value="pitched" className="w-full">
        {/* <DataTable columns={columns} data={open} /> */}
        <Tabs defaultValue="open">
          <TabsList className="w-full ">
            <TabsTrigger value="open" className="w-full">
              Open
            </TabsTrigger>
            <TabsTrigger value="ongoing" className="w-full">
              Ongoing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="open" className="w-full">
            <DataTable columns={columns} data={open} />
          </TabsContent>
          <TabsContent value="ongoing">
            <DataTable columns={columns} data={closed} />
          </TabsContent>
        </Tabs>
      </TabsContent>
      <TabsContent value="saved/interested">
        <Tabs defaultValue="interested">
          <TabsList className="w-full ">
            <TabsTrigger value="interested" className="w-full">
              Interested
            </TabsTrigger>
            <TabsTrigger value="saved" className="w-full">
              Saved
            </TabsTrigger>
          </TabsList>
          <TabsContent value="saved" className="w-full">
            <DataTable columns={columns} data={saved} />
          </TabsContent>
          <TabsContent value="interested">
            {" "}
            <DataTable columns={columns} data={interested} />
          </TabsContent>
        </Tabs>
      </TabsContent>
      {/* <TabsContent value="completed">
        <DataTable columns={columns} data={completed} />
      </TabsContent> */}
    </Tabs>
  );
};

export default ProjectManage;
