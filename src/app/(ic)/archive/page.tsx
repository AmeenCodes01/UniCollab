import IdeaCard from "../../components/IdeaCard";
import {fetchQuery} from "convex/nextjs";
import {api} from "../../../../convex/_generated/api";
import ContactBtn from "@/app/components/ContactBtn";
async function page() {
  //fetch all ideas with status !== "open".
  const archived = await fetchQuery(api.ideas.getAllIdeas, {
    status: "open",
  });
  // can change getAllIdeas later on
  return (
    <div className="flex w-full h-full   justify-center items-center">
      <div className="grid md:grid-cols-3 gap-4 md:auto-rows-fr">
        {archived.length !== 0
          ? archived.slice(3).map((idea, i) => (
              <div key={i} className="h-full ">
                <IdeaCard
                  title={idea.title}
                  shortDesc={idea.shortDesc}
                  desc={idea.description}
                  author={idea?.user[0]?.firstName}
                  course={idea?.user[0]?.course}
                  email={idea?.user[0]?.email}
                  lookingFor={idea.lookingFor}
                  meetingFormat={idea.meetingFormat}
                  btn={<ContactBtn ideaId={idea._id} title={idea.title} />}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default page;
