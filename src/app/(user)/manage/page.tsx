import React from "react";
import {fetchQuery} from "convex/nextjs";
import {api} from "../../../../convex/_generated/api";
import {DataTable} from "./components/Table";
import {columns} from "./components/columns";
import {getAuthToken} from "@/auth";
import ProjectManage from "./components/Tabs";

async function Manage() {
  // get open tasks
  // display in a table
  // open a sheet onPress
  // const preloadedIdeas = await preloadQuery(api.ideas.get);
  const token = await getAuthToken();
  const ideas = await fetchQuery(api.ideas.get, {}, {token});

  return (
    <div className="w-full h-full pt-[30px] justify-center items-center flex  ">
      <ProjectManage data={ideas} />
    </div>
  );
}

export default Manage;
