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
    userId: v.id("users")
  },
  handler: async (ctx, {ideaId, interestedId, userId}) => {
    //move to team with ideaId
    const user = await getCurrentUserOrThrow(ctx);


    await ctx.db.insert("teams", {userId: userId, ideaId, owner: false});
    await ctx.db.delete(interestedId);
  },
});

export const delUser = mutation({
  args: {ideaId: v.id("ideas"), userId: v.id("users")},
  handler: async (ctx, {ideaId, userId}) => {
    const teamUser = await ctx.db
      .query("teams")
      .withIndex("by_ideaId_userId", (t) =>
        t.eq("ideaId", ideaId).eq("userId", userId)
      )
      .unique();
    if (teamUser) {
      await ctx.db.delete(teamUser._id);
    }
  },
});

export const del = mutation({
  args: {id: v.id("teams")},
  handler: async ({db}, {id}) => {
    await db.delete(id);
  },
});
