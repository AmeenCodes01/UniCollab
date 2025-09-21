import { pendRejcols } from "../manage/components/status/PendRejCols";
import { DataTable } from "../manage/components/Table";
import { api } from "../../../../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { getAuthToken } from "@/auth";

async function page() {
  const token = await getAuthToken();
  const ideas = await fetchQuery(api.ideas.getPendRej, {}, { token });
  const user = await fetchQuery(api.users.current, {}, { token });
  if(user?.councilMember !== true){
return <span className=" self-center pt-8 text-2xl mx-auto">Unauthorized</span>
  }
  return (
    <div>
      <DataTable columns={pendRejcols} data={ideas?? []} />
    </div>
  );
}

export default page;
