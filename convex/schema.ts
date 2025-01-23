import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    clerkUserId: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    year: v.optional(v.number()),
    course: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    councilMember : v.optional( v.boolean()),
    displayName:v.optional(v.string())
  }).index("byClerkUserId", ["clerkUserId"]),

  ideas: defineTable({
    title: v.string(),
    authorId: v.id("users"),
    shortDesc: v.string(),
    description: v.string(),
    lookingFor: v.string(),
    meetingFormat: v.string(),
    limit: v.number(),
    status: v.union(
      v.literal("open"),
      v.literal("closed"),
      v.literal("completed"),
      v.literal("pending"),
      v.literal("rejected")
    ),
    endedAt: v.optional(v.number()),
    rejectedReason: v.optional(v.string()),
    councilMemberId: v.optional(v.id("users"))
  })
    .index("authorId", ["authorId"])
    .index("by_title", ["title"])
    .index("by_status",["status"])
    ,

  // get all saved ideas for a certain user  ideaid_userId_type
  // get all interested ideas for a certain user  ideaId_userId_type
  // above 2 willl be filtered on client server comp, so no need for type.
  // get all interested users for a idea  ideaId_type

  interested: defineTable({
    userId: v.id("users"),
    ideaId: v.id("ideas"),
    type: v.union(v.literal("interested"), v.literal("saved")),
  })
    .index("by_ideaId_type", ["ideaId", "type"])
    .index("by_userId_ideaId", ["userId", "ideaId"]),

  teams: defineTable({
    userId: v.id("users"),
    ideaId: v.id("ideas"),
    owner: v.boolean(),
  })
    .index("by_userId", ["userId"])
    .index("by_ideaId", ["ideaId"])
    .index("by_ideaId_userId", ["ideaId", "userId"]),
});
