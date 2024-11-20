import {v} from "convex/values";
import {query, mutation} from "./_generated/server";
import {getCurrentUserOrThrow} from "./users";
import {getAll} from "convex-helpers/server/relationships";

// GET USER IDEAS
export const get = query({
  args: {
    //  token: v.any(),
    //status: v.string(), id: v.id("users")
  },
  handler: async (
    ctx,
    {
      //  status
    }
  ) => {
    const user = await getCurrentUserOrThrow(ctx);
    // const {tokenIdentifier, name, email} = identity!;
    ///   console.log(tokenIdentifier, "tk");

    return await ctx.db
      .query("ideas")
      .filter((i) => i.eq(i.field("authorId"), user._id))
      .collect();
    // .filter(
    //   (q) => q.eq(q.field("ownerId"), id) && q.eq(q.field("status"), status)
    // );
  },
});

export const getAllIdeas = query({
  args: {},
  handler: async ({db}) => {
    const ideas = await db
      .query("ideas")
      .filter((i) => i.eq(i.field("status"), "open"))
      .collect();
    const userIds = [...new Set(ideas.map((i) => i.authorId))];
    const users = await getAll(db, userIds);

    const ideaUsers = ideas.map((idea) => {
      const user = users.filter((u) => u?._id === idea.authorId);
      return {...idea, user};
    });
    return ideaUsers;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    shortDesc: v.string(),
    description: v.string(),
    lookingFor: v.string(),
    meetingFormat: v.string(),
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    const newIdea = {
      ...args,
      authorId: user._id,
      status: "open" as "open" | "closed" | "completed",
    };
    console.log(newIdea, "new idea");
    const existingIdea = await ctx.db
      .query("ideas")
      .withIndex("by_title", (q) => q.eq("title", args.title))
      .unique();
    if (existingIdea) {
      return {status: "error", message: "Idea of same title exists"};
    }
    await ctx.db.insert("ideas", newIdea);
    //check if same title idea exists alreaady ? so index by title then ?
  },
});
