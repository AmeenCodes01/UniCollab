import {v} from "convex/values";
import {query, mutation} from "./_generated/server";
import {getCurrentUserOrThrow} from "./users";
import {asyncMap} from "convex-helpers";
import {getAll, getManyFrom} from "convex-helpers/server/relationships";

export const get = query({
  args: {
    ideaId: v.id("ideas"),
  },
  handler: async (ctx, {ideaId}) => {
    //move to team with ideaId
    //   const user = await getCurrentUserOrThrow(ctx);
    const team = await getManyFrom(ctx.db, "teams", "by_ideaId", ideaId);

    const userIds = [...new Set(team.map((t) => t.userId))];
    const users = getAll(ctx.db, userIds);

    return users;
    // again need to get users and then add in their id.
  },
});

export const accept = mutation({
  args: {
    ideaId: v.id("ideas"),
    interestedId: v.id("interested"),
  },
  handler: async (ctx, {ideaId, interestedId}) => {
    //move to team with ideaId
    const user = await getCurrentUserOrThrow(ctx);
    await ctx.db.insert("teams", {userId: user._id, ideaId});
    await ctx.db.delete(interestedId);
  },
});
