import IdeaCard from "../../components/IdeaCard";
import {fetchQuery} from "convex/nextjs";
import {api} from "../../../../convex/_generated/api";
import ContactBtn from "@/app/components/ContactBtn";
import { getAuthToken } from "@/auth";
async function page() {
  //fetch all ideas with status !== "open".
  const archived = await fetchQuery(api.ideas.getAllIdeas, {
    status: "closed",
  });
  const token = await getAuthToken()
  const user = await fetchQuery(api.users.current,{},{token})
  // can change getAllIdeas later on
  return (
    <div className="flex w-full h-full   justify-center items-center">
      <div className="grid md:grid-cols-3 gap-4 md:auto-rows-fr justify-center items-center">
        {archived.length !== 0
          ? archived.map((idea, i) => (
              <div key={i} className={`h-full  `}>
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
                  style={user?._id == idea.authorId ? "border-2 border-green-300":""}
                
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default page;
