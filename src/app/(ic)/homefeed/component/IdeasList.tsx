"use client";
import React, {useState} from "react";
import {Search, Code, SearchCode} from "lucide-react";
import InterestBtn from "@/app/components/InterestBtn";
import IdeaCard from "@/app/components/IdeaCard";
import {Doc, Id} from "../../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

function IdeasList({
  ideasArr,
}: {
  ideasArr: (Doc<"ideas"> & {
    user: {firstName?: string; course?: string; email?: string}[];
  })[];
}) {
  
  const interested = useQuery(api.interested.user)
  const intset = new Map(interested?.map(i=>[i._id,i.type]))
  const [search, setSearch] = useState("");
  let filter = "all";

  const filteredIdeas =
    search !== ""
      ? ideasArr.filter((idea) =>
          idea.title.toLowerCase().includes(search.toLowerCase())
        )
      : ideasArr;

//we get interested ideas here & if alr interested/saved disable ?

//for each project, search.

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
                : ""
            }`}
            //  onClick={() => setFilter("project")}
          >
            <SearchCode size={20} />
            
          </button>
        </div>
      </div>

      {/* rows messed up with header, cols does not.  */}
      <div className="grid md:grid-cols-1   md:auto-cols-max gap-4 w-full  justify-center md:justify-normal items-center pb-4  ">
        {filteredIdeas.length !== 0
          ? filteredIdeas.map((idea, i: number) => {
           const interest = intset.get(idea._id) 
            
            return(
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
                    disableInterest={interest && interest == "interested"}
                    disableSave={interest && interest == "saved"}
                    ideaId={idea._id}
                    authId={idea.authorId as Id<"users">}

                  />
                }
              />
            )})
          : null}
      </div>
    </div>
  );
}

export default IdeasList;
