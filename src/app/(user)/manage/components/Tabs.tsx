import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {DataTable} from "./Table";
import {columns} from "./columns";
import {Doc} from "../../../../../convex/_generated/dataModel";


const ProjectManage = async ({
  data,
}: {
  data: (Doc<"ideas"> & {type: "interested" | "saved" | "member" | "author"})[];
}) => {

  const pitched = data.filter(
    (idea) => idea.type == "author" 
  );
  const member = data.filter(
    (idea) => idea.type == "member" 
  );
  
  const interested= data.filter((idea) => idea.type === "interested" );
  const saved = data.filter((idea) => idea.type === "saved");

  
  return (
    <Tabs defaultValue="pitched" className=" w-[70%]  ">
      <TabsList className="w-full ">
        <TabsTrigger value="pitched" className="w-full">
          Pitched
        </TabsTrigger>

        <TabsTrigger value="saved/interested" className="w-full">
          Saved/Interested
        </TabsTrigger>

        <TabsTrigger value="member" className="w-full">
          Member
        </TabsTrigger>
      </TabsList>
      <TabsContent value="pitched" className="w-full">
        {/* <DataTable columns={columns} data={open} /> */}
        {/* <Tabs defaultValue="open">
          <TabsList className="w-full ">
            <TabsTrigger value="open" className="w-full">
              Open
            </TabsTrigger>
            <TabsTrigger value="ongoing" className="w-full">
              Ongoing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="open" className="w-full"> */}
            <DataTable columns={columns} data={pitched} />
          {/* </TabsContent> */}
          {/* <TabsContent value="ongoing">
            <DataTable columns={columns} data={closed} /> 
          </TabsContent> 
        </Tabs>
            */}
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
            <DataTable columns={columns} data={interested} />
            {" "}
          </TabsContent>
        </Tabs>
      </TabsContent>
      <TabsContent value="member">

      <DataTable columns={columns} data={member} />
      </TabsContent> 
      
    </Tabs>
  );
};

export default ProjectManage;

