import {fetchQuery} from "convex/nextjs";
import {api} from "../../convex/_generated/api";
import {getAuthToken} from "@/auth";
import {redirect} from "next/navigation";

export default async function Home() {
  //from signin/login I can directed here & then from here, if year exist, take to homefeed. else, direct to homefeed
  const token = await getAuthToken();
  const user = await fetchQuery(api.users.current, {}, {token});

  if (user?.year && user?.course) {
    redirect("/homefeed");
  } else {
    redirect("/profile");
  }
}
