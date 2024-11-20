import {v} from "convex/values";
import {query, mutation} from "./_generated/server";
import {
  getAll,
  getOneFrom,
  getManyFrom,
  getManyVia,
} from "convex-helpers/server/relationships";
import {getCurrentUserOrThrow} from "./users";

export const user = query({
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

export const get = query({
  // GETTING ALL USERS INTERESTED IN THE IDEA BY IDEA_ID
  args: {ideaId: v.id("ideas")},
  handler: async (ctx, {ideaId}) => {
    const interested = await getManyFrom(
      ctx.db,
      "interested",
      "by_ideaId",
      ideaId
    );
    //interested ids.
    const userIds = [...new Set(interested.map((i) => i.userId))];
    //got userIds. now i just need to return their emails.
    const users = await getAll(ctx.db, userIds);
    //add interestedId
    console.log(users, "u s e r s");

    const usersInterestedId = users.map((user) => {
      const interestedRecord = interested.find((i) => i.userId === user?._id);
      return {...user, interestedId: interestedRecord?._id};
    });

    //return user + interestedId
    return usersInterestedId;
  },
});

export const accept = mutation({
  args: {ideaId: v.id("ideas")},
  handler: async (ctx, {ideaId}) => {
    const user = await getCurrentUserOrThrow(ctx);
    const existingInterest = await ctx.db
      .query("interested")
      .withIndex("by_ideaId_userId", (q) =>
        q.eq("ideaId", ideaId).eq("userId", user._id)
      )
      .unique();

    if (existingInterest) {
      return {status: "error", message: "You've already expressed interest"};
    }
    await ctx.db.insert("interested", {ideaId, userId: user._id});
    return {status: "success", message: ""};

    //insert to interested with userId & ideaId.
    //patch interest.
  },
});

//look at accept
export const reject = mutation({
  args: {interestedId: v.id("interested")},
  handler: async (ctx, {interestedId}) => {
    //move to team with ideaId
    const user = await getCurrentUserOrThrow(ctx);
    await ctx.db.delete(interestedId);
  },
});
