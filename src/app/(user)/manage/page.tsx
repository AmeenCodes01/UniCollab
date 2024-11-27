import React from "react";
import {fetchQuery} from "convex/nextjs";
import {api} from "../../../../convex/_generated/api";
import {DataTable} from "./components/Table";
import {columns} from "./components/columns";
import {getAuthToken} from "@/auth";
import ProjectManage from "./components/Tabs";
import {Doc} from "../../../../convex/_generated/dataModel";

async function Manage() {
  // get open tasks
  // display in a table
  // open a sheet onPress
  // const preloadedIdeas = await preloadQuery(api.ideas.get);
  const token = await getAuthToken();
  const ideas = (await fetchQuery(
    api.ideas.get,
    {},
    {token}
  )) as (Doc<"ideas"> & {type: "interested" | "saved" | "member" | "author"})[];

  console.log(ideas, "ideas");
  return (
    <div className="w-full h-full pt-[30px] justify-center items-start flex  ">
      <ProjectManage data={ideas} />
    </div>
  );
}

export default Manage;
