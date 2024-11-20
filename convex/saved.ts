import {v} from "convex/values";
import {query, mutation} from "./_generated/server";
import {
  getAll,
  getOneFrom,
  getManyFrom,
  getManyVia,
} from "convex-helpers/server/relationships";
import {getCurrentUserOrThrow} from "./users";

export const get = query({
  //ideas user is interested in.
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUserOrThrow(ctx);

    return await ctx.db
      .query("interested")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();
  },
});

export const save = mutation({
  args: {ideaId: v.id("ideas")},
  handler: async (ctx, {ideaId}) => {
    const user = await getCurrentUserOrThrow(ctx);
    const existingSave = await ctx.db
      .query("saved")
      .withIndex("by_ideaId_userId", (q) =>
        q.eq("ideaId", ideaId).eq("userId", user._id)
      )
      .unique();

    if (existingSave) {
      return {status: "error", message: "You've already saved this idea"};
    }
    await ctx.db.insert("saved", {ideaId, userId: user._id});
    return {status: "success", message: ""};

    //insert to interested with userId & ideaId.
    //patch interest.
  },
});
