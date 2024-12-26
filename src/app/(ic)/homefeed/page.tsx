import React from "react";

import {fetchQuery} from "convex/nextjs";
import {api} from "../../../../convex/_generated/api";
import {getAuthToken} from "@/auth";
import IdeasList from "./component/IdeasList";
import {Doc} from "../../../../convex/_generated/dataModel";

async function HomeFeed() {
  const token = await getAuthToken();
  const ideas = await fetchQuery(
    api.ideas.getAllIdeas,
    {status: "open"},
    {token}
  );
  const user = await fetchQuery(api.users.current);

  //what about the ideas user is already a team member of.
  return (
    <div className=" w-full h-[100%] flex flex-col max-w-7xl mx-auto  ">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
        <h2 className="font-medium text-lg text-black">
          👋 Welcome to UniCollab!
        </h2>
        <p className="text-gray-600 mt-1">
          Find project partners, share ideas, and build cool stuff together. No
          experience required - just bring your enthusiasm!
        </p>
      </div>
      <IdeasList
        ideasArr={
          ideas as (Doc<"ideas"> & {
            user: {firstName?: string; course?: string; email?: string}[];
          })[]
        }
      />
    </div>
  );
}

export default HomeFeed;
