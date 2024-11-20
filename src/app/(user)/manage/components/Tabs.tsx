import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {DataTable} from "./Table";
import {columns} from "./columns";
import {Doc} from "../../../../../convex/_generated/dataModel";

const ProjectManage = ({data}: {data: Doc<"ideas">[]}) => {
  const open = data.filter((idea) => idea.status == "open");
  const closed = data.filter((idea) => idea.status == "closed");
  const completed = data.filter((idea) => idea.status == "completed");
  return (
    <Tabs defaultValue="open" className=" w-[70%]  ">
      <TabsList className="w-full ">
        <TabsTrigger value="open" className="w-full">
          Open
        </TabsTrigger>
        <TabsTrigger value="closed" className="w-full">
          Closed
        </TabsTrigger>
        <TabsTrigger value="completed" className="w-full">
          Completed
        </TabsTrigger>
      </TabsList>
      <TabsContent value="open" className="w-full">
        <DataTable columns={columns} data={open} />
      </TabsContent>
      <TabsContent value="closed">
        <DataTable columns={columns} data={closed} />
      </TabsContent>

      <TabsContent value="completed">
        <DataTable columns={columns} data={completed} />
      </TabsContent>
    </Tabs>
  );
};

export default ProjectManage;
