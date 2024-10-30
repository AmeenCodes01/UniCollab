"use client";
import React from "react";
import IdeaCard from "../../components/IdeaCard";
import ideas from "@/../ideas.json";
import {Search, PlusCircle, BookOpen, Users, Code, Star} from "lucide-react";
import projects from "@/../projects.json";
import {Button} from "@/components/ui/button";
function HomeFeed() {
  const data = ideas || [];
  let filter = "all";

  const emailInterest = (title: string) => {
    const email = "student@example.com";
    const subject = encodeURIComponent(
      `Interested in joining project ${title}`
    );

    window.location.href = `mailto:${email}?subject=${subject}`;
  };

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
        {projects.length !== 0
          ? projects.map((idea, i) => (
              <IdeaCard
                key={i}
                title={idea.title}
                shortDesc={idea.shortDesc}
                desc={idea.description}
                // tags={idea.tags}
                author={idea.author}
                course={idea.course}
                lookingFor={idea.lookingFor}
                email={idea.email}
                meetingFormat={idea.meetingFormat}
                btn={
                  <>
                    <Button
                      onClick={() => emailInterest(idea.title)}
                      variant={"default"}>
                      I'm Interested
                    </Button>
                    <Button variant={"outline"}>Save for later</Button>
                  </>
                }
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default HomeFeed;
