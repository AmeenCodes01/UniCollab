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
  args: {},
  handler: async (ctx, {}) => {
    const user = await getCurrentUserOrThrow(ctx);

    // Get all "interested" entries for the user
    const userInterest = await ctx.db
      .query("interested")
      .withIndex("by_userId_ideaId", (q) => q.eq("userId", user._id))
      .collect();

    // Extract idea IDs from userInterest
    const ideaIds = userInterest.map((u) => u.ideaId);

    // If no user interests, return an empty array early
    if (ideaIds.length === 0) return [];

    // Fetch the ideas corresponding to the IDs
    const ideas = await getAll(ctx.db, ideaIds);

    // Map the ideas and attach the `type` from userInterest
    const ideaTypes = ideas.map((idea) => {
      // Find the matching interest entry
      const userInt = userInterest.find((u) => u.ideaId === idea!._id);

      // Attach the `type` field (this should always exist since we're mapping)
      return {...idea, type: userInt!.type};
    });

    // Return the processed list of ideas with the `type` field
    return ideaTypes;
  },
});

export const get = query({
  // GETTING ALL USERS INTERESTED IN THE IDEA BY IDEA_ID
  args: {ideaId: v.id("ideas")},
  handler: async (ctx, {ideaId}) => {
    const interested = await ctx.db
      .query("interested")
      .withIndex("by_ideaId_type", (q) =>
        q.eq("ideaId", ideaId).eq("type", "interested")
      )
      .collect();
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
  args: {
    ideaId: v.id("ideas"),
    type: v.union(v.literal("interested"), v.literal("saved")),
  },
  handler: async (ctx, {ideaId, type}) => {
    const user = await getCurrentUserOrThrow(ctx);
    const existingInterest = await ctx.db
      .query("interested")
      .withIndex("by_userId_ideaId", (q) =>
        q.eq("userId", user._id).eq("ideaId", ideaId)
      )
      .unique();
    //if existingInterest exists with type "saved" & arg type is "interested", simply change type.
    //if existingInterest exist with type"interested" & arg type is "Interested", send back message
    //if doesn't exist,

    // what if you're already a team member ? need to check in team as well.

    const existingMember = await ctx.db
      .query("teams")
      .withIndex("by_ideaId_userId", (t) =>
        t.eq("ideaId", ideaId).eq("userId", user._id)
      )
      .unique();

    if (existingInterest?.type == "interested" && type == "interested") {
      return {status: "error", message: "You've already expressed interest"};
    }
    if (existingMember) {
      return {
        status: "error",
        message: "You're already a member of this project",
      };
    }
    if (existingInterest?.type == "saved" && type == "interested") {
      return await ctx.db.patch(existingInterest._id, {type});
    }

    await ctx.db.insert("interested", {
      ideaId,
      userId: user._id,
      type,
    });
    return {status: "success", message: ""};

    //insert to interested with userId & ideaId.
    //patch interest.
  },
});

//look at accept
export const reject = mutation({
  args: {
    ideaId: v.id("ideas"),
    type: v.union(v.literal("interested"), v.literal("saved")),
  },
  handler: async (ctx, {ideaId, type}) => {
    //move to team with ideaId
    const user = await getCurrentUserOrThrow(ctx);
    const interest = await ctx.db
      .query("interested")
      .withIndex("by_userId_ideaId", (i) =>
        i.eq("userId", user._id).eq("ideaId", ideaId)
      )
      .filter((q) => q.eq(q.field("type"), type))
      .unique();
    if (interest) {
      await ctx.db.delete(interest?._id);
    }
  },
});

export const del = mutation({
  args: {id: v.id("interested")},
  handler: async ({db}, {id}) => {
    await db.delete(id);
  },
});
// export const delete = mutation({
//   args: {interestedId: v.id("interested")},
//   handler: async (ctx, {interestedId}) => {
//     //move to team with ideaId
//     const user = await getCurrentUserOrThrow(ctx);
//     await ctx.db.delete(interestedId);
//   },
// });
