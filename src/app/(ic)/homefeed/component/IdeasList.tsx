"use client";
import React, {useState} from "react";
import {Search, Code} from "lucide-react";
import InterestBtn from "@/app/components/InterestBtn";
import IdeaCard from "@/app/components/IdeaCard";
import {Doc, Id} from "../../../../../convex/_generated/dataModel";

function IdeasList({
  ideasArr,
  
}: {
  ideasArr: (Doc<"ideas"> & {
    user: {firstName?: string; course?: string; email?: string;displayName?:string;}[];
  })[];
}) {
  const [search, setSearch] = useState("");
  let filter = "all";

  const filteredIdeas =
    search !== ""
      ? ideasArr.filter((idea) =>
          idea.title.toLowerCase().includes(search.toLowerCase())
        )
      : ideasArr;

  console.log(ideasArr,"ideasArr")    
  return (
    <div>
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
        {filteredIdeas.length !== 0
          ? filteredIdeas.map((idea, i: number) => (
              <IdeaCard
                key={i}
                title={idea.title}
                shortDesc={idea.shortDesc}
                desc={idea.description}
                // tags={idea.tags}
                lookingFor={idea.lookingFor}
                author={idea?.user[0]?.displayName ??idea?.user[0]?.firstName}
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

export default IdeasList;
