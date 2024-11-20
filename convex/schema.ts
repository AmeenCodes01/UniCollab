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
      v.literal("completed")
    ),
    endedAt: v.optional(v.number()),
  })
    .index("authorId", ["authorId"])
    .index("by_title", ["title"]),

  interested: defineTable({
    userId: v.id("users"),
    ideaId: v.id("ideas"),
  })
    .index("by_ideaId_userId", ["ideaId", "userId"])
    .index("by_ideaId", ["ideaId"])
    .index("by_userId", ["userId"]),

  teams: defineTable({
    userId: v.id("users"),
    ideaId: v.id("ideas"),
  })
    .index("by_userId", ["userId"])
    .index("by_ideaId", ["ideaId"]),

  saved: defineTable({
    ideaId: v.id("ideas"),
    userId: v.id("users"),
  })
    .index("by_userId", ["userId"])
    .index("by_ideaId_userId", ["ideaId", "userId"]),
});
