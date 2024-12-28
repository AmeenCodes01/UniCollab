import { useQueries, useQuery } from "convex/react"
import { pendRejcols } from "../manage/components/status/PendRejCols"
import { DataTable } from "../manage/components/Table"
import { api } from "../../../../convex/_generated/api"
import { fetchQuery } from "convex/nextjs"
import { getAuthToken } from "@/auth"

async function page () {
    const token = await getAuthToken()
    const ideas = await fetchQuery(api.ideas.getPendRej, {}, {token})
    console.log(ideas,"pending")
  return (
    <div>
<DataTable columns={pendRejcols} data={ideas} />

    </div>
  )
}

export default page
