import React from "react";
import IdeaCard from "../../components/IdeaCard";
import {Search, Code} from "lucide-react";
import InterestBtn from "@/app/components/InterestBtn";
import {fetchQuery} from "convex/nextjs";
import {api} from "../../../../convex/_generated/api";
import {getAuthToken} from "@/auth";
import {Id} from "../../../../convex/_generated/dataModel";

async function HomeFeed() {
  const token = await getAuthToken();
  const ideas = await fetchQuery(
    api.ideas.getAllIdeas,
    {status: "open"},
    {token}
  );
  const user = await fetchQuery(api.users.current);
  let filter = "all";
  //what about the ideas user is already a team member of.
  return (
    <div className=" w-full h-[100%] flex flex-col max-w-7xl mx-auto  ">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
        <h2 className="font-medium text-lg">👋 Welcome to UniCollab!</h2>
        <p className="text-gray-600 mt-1">
          Find project partners, share ideas, and build cool stuff together. No
          experience required - just bring your enthusiasm!
        </p>
      </div>
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              filter === "project"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
            //  onClick={() => setFilter("project")}
          >
            <Code size={20} />
            Projects
          </button>
        </div>
      </div>

      {/* rows messed up with header, cols does not.  */}
      <div className="grid md:grid-cols-1   md:auto-cols-max gap-4 w-full  justify-center md:justify-normal items-center pb-4  ">
        {ideas.length !== 0
          ? ideas.map((idea, i) => (
              <IdeaCard
                key={i}
                title={idea.title}
                shortDesc={idea.shortDesc}
                desc={idea.description}
                // tags={idea.tags}
                lookingFor={idea.lookingFor}
                author={idea?.user[0]?.firstName}
                course={idea?.user[0]?.course}
                email={idea?.user[0]?.email}
                meetingFormat={idea.meetingFormat}
                btn={
                  <InterestBtn
                    title={idea.title}
                    ideaId={idea._id}
                    authId={idea.authorId as Id<"users">}
                  />
                }
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default HomeFeed;
