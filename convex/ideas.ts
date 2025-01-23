import {v} from "convex/values";
import {query, mutation, action} from "./_generated/server";
import {getCurrentUserOrThrow} from "./users";
import {getAll} from "convex-helpers/server/relationships";
import {api} from "./_generated/api";
import {promises} from "dns";
import {Id} from "./_generated/dataModel";

// GET USER IDEAS
export const get = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUserOrThrow(ctx);

    // Fetch pitched ideas (user is the author)
    const authoredIdeas = await ctx.db
      .query("ideas")
      .filter((i) => i.eq(i.field("authorId"), user._id))
      .collect();

     const authoredIds = authoredIdeas.map(idea=> idea._id) 
    const authored = authoredIdeas.map((idea) => ({
      ...idea,
      type: "author",
    }));

    // Fetch ideas where the user is a team member
    const userTeams = await ctx.db
      .query("teams")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    const teamIdeaIds = userTeams.filter(Boolean).map((u) =>  authoredIds.includes(u.ideaId)? null : u.ideaId).filter(Boolean)

    const teamIdeas = await getAll(ctx.db, teamIdeaIds as Id<"ideas">[]);

    const member = teamIdeas
      .filter(Boolean)
      .map((idea) =>
        idea!.status !== "closed"
          ? {
              ...idea,
              type: "member",
            }
          : null
      )
      .filter(Boolean);

    // Fetch user's interested/saved ideas
    const userInterest = await ctx.db
      .query("interested")
      .withIndex("by_userId_ideaId", (q) => q.eq("userId", user._id))
      .collect();
    const interestIdeaIds = userInterest.map((u) => u.ideaId);

    const interestedIdeas = await getAll(ctx.db, interestIdeaIds);

    const interested = userInterest
      .map(({ideaId, type}) => {
        const idea = interestedIdeas.find((i) => i?._id === ideaId);
        if (!idea) return null;
        return {
          ...idea,
          type,
        };
      })
      .filter(Boolean);

    // Combine all ideas into a single list
    const allIdeas = [...authored, ...member, ...interested];
    // Return the combined list
    return allIdeas;
  },
});

export const getIdea = query({
  args: {ideaId: v.id("ideas")},
  handler: async ({db}, {ideaId}) => {
    return await db.get(ideaId);
  },
});



//for archive & for homefeed
export const getAllIdeas = query({
  args: {
    status: v.union(
      v.literal("open"),
      v.literal("closed"),
      v.literal("completed"),
      v.literal("pending")
    ),
  },

  handler: async ({db}, {status}) => {
    //status closed comes from archive only, currently.
    const ideas =
      status !== "closed"
        ? 
        //homefeed
        await db
            .query("ideas")
            .withIndex(("by_status"), i=> i.eq("status", status)    
          )
            .collect()
        :
        //archive
        await db
            .query("ideas")
            .filter((i) => i.neq(i.field("status"), "open"))
            .filter((i) => i.neq(i.field("status"), "pending"))
            .filter((i) => i.neq(i.field("status"), "rejected"))  
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

export const getPendRej = query({
  args: {}, 
  handler: async (ctx,db)=>{
    const user = await getCurrentUserOrThrow(ctx)
    if(user.councilMember){
      const ideas = await ctx.db.query("ideas")
      .withIndex("by_status", i=> i.eq("status", "pending"))
       .collect()
      return ideas
    }
  }
})


export const changeStatus = mutation({
args:{status:v.union(v.literal("open"), v.literal("rejected")),
rejectedReason: v.optional(v.string()), ideaId:v.id("ideas")
 },
 handler: async(ctx, args)=>{
  const user = await getCurrentUserOrThrow(ctx)
  if(user.councilMember){
    await ctx.db.patch(args.ideaId, {
      status : args.status,
      councilMemberId: user._id, 
      rejectedReason: args.status =="rejected"? args.rejectedReason: undefined


     })
  }


 }

})




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
      status: "pending" as "open" | "closed" | "completed" | "pending",
    };
    console.log(newIdea, "new idea");
    const existingIdea = await ctx.db
      .query("ideas")
      .withIndex("by_title", (q) => q.eq("title", args.title))
      .unique();
    if (existingIdea) {
      return {status: "error", message: "Idea of same title exists"};
    }
    const ideaId = await ctx.db.insert("ideas", newIdea);
    if (ideaId)
      await ctx.db.insert("teams", {ideaId, userId: user._id, owner: true});

    //check if same title idea exists alreaady ? so index by title then ?
  },
});

export const userByIdea = query({
  args: {ideaId: v.id("ideas")},
  handler: async (ctx, args) => {
    const idea = await ctx.db.get(args.ideaId);
    if (idea) {
      const user = await ctx.db.get(idea.authorId);
      return user;
    }
  },
});

export const editIdea = mutation({
  args: {
    title: v.string(),
    shortDesc: v.string(),
    description: v.string(),
    lookingFor: v.string(),
    meetingFormat: v.string(),
    limit: v.number(),
    id: v.id("ideas"),
  },
  handler: async (ctx, args) => {
    const {id, ...ideaData} = args;

    // Patch the idea with the remaining fields
    await ctx.db.patch(id, ideaData);

    //check if same title idea exists alreaady ? so index by title then ?
  },
});

export const delRelations = mutation({
  args: {id: v.id("ideas")},
  handler: async ({db}, {id}) => {
    const ideaInterested = await db
      .query("interested")
      .withIndex("by_ideaId_type", (i) => i.eq("ideaId", id))
      .collect();

    const ideaTeam = await db
      .query("teams")
      .withIndex("by_ideaId", (i) => i.eq("ideaId", id))
      .collect();
    const interestedIds = ideaInterested.map((i) => i._id);
    const teamIds = ideaTeam.map((i) => i._id);
    return {ideaInterested, ideaTeam};
    //ideas table, del id.
  },
});

export const del = mutation({
  args: {id: v.id("ideas")},
  handler: async ({db}, {id}) => {
    await db.delete(id);
  },
});

export const delIdeasAndRelated = action({
  args: {id: v.id("ideas")},
  handler: async (ctx, {id}) => {
    const relations = await ctx.runMutation(api.ideas.delRelations, {id});
    const interestedIds = relations.ideaInterested.map((i) => i._id);
    const teamIds = relations.ideaTeam.map((i) => i._id);
    const InterestPromises = Promise.allSettled(
      interestedIds.map(async (InterestId: Id<"interested">) =>
        ctx.runMutation(api.interested.del, {id: InterestId})
      )
    );
    const TeamPromises = Promise.allSettled(
      teamIds.map(async (id: Id<"teams">) =>
        ctx.runMutation(api.teams.del, {id})
      )
    );
    const Istatus = await InterestPromises;
    const Tpromises = await TeamPromises;
    await ctx.runMutation(api.ideas.del, {id});
    //ideas table, del id.
  },
});
