import React from "react";
import projects from "@/../projects.json";
import IdeaCard from "../../components/IdeaCard";
function page() {
  return (
    <div className="flex w-full h-full   justify-center items-center">
      <div className="grid md:grid-cols-3 gap-4 md:auto-rows-fr">
        {projects.length !== 0
          ? projects.slice(3).map((idea, i) => (
              <div key={i} className="h-full ">
                <IdeaCard
                  title={idea.title}
                  shortDesc={idea.shortDesc}
                  desc={idea.description}
                  author={idea.author}
                  course={idea.course}
                  // type={idea.type}
                  lookingFor={idea.lookingFor}
                  email={idea.email}
                  meetingFormat={idea.meetingFormat}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default page;
