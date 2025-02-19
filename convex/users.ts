import {UserJSON} from "@clerk/backend";
import {v, Validator} from "convex/values";
import {
  action,
  internalMutation,
  mutation,
  query,
  QueryCtx,
} from "./_generated/server";
import {api, internal} from "./_generated/api";
import {Doc} from "./_generated/dataModel";

export const getUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getRecentUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").order("desc").take(5);
  },
});

export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

export const upsertFromClerk = internalMutation({
  args: {data: v.any() as Validator<UserJSON>},
  async handler(ctx, {data}) {
    console.log(data,"data for new user right")
    const userAttributes = {
      email: data.external_accounts
        ? (data.external_accounts[0].username as string)
        : data.email_addresses[0].email_address,
      clerkUserId: data.id,
      firstName: data.first_name ?? undefined,
      lastName: data.last_name ?? undefined,
      imageUrl: data.image_url ?? undefined,
    };
    if(userAttributes.email.includes("reading.ac.uk")){

      const user = await userByClerkUserId(ctx, data.id);
  
      if (user === null) {
        await ctx.db.insert("users", userAttributes);
      } else {
        await ctx.db.patch(user._id, userAttributes);
      }
    }else{
      console.log("NOT A UNI EMAIL")
    }
  },
});

export const deleteFromClerk = internalMutation({
  args: {clerkUserId: v.string()},
  async handler(ctx, {clerkUserId}) {
    const user = await userByClerkUserId(ctx, clerkUserId);

    if (user !== null) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`
      );
    }
  },
});

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  console.log(identity, "i d e n t i t y");
  if (identity === null) {
    return null;
  }

  return await userByClerkUserId(ctx, identity.subject);
}

async function userByClerkUserId(ctx: QueryCtx, clerkUserId: string) {
  return await ctx.db
    .query("users")
    .withIndex("byClerkUserId", (q) => q.eq("clerkUserId", clerkUserId))
    .unique();
}
export const update = mutation({
  args: {
    data: v.object({
      course: v.string(),
      year: v.number(),
    }),
  },
  handler: async (ctx, {data}) => {
    const user = await getCurrentUserOrThrow(ctx);
    await ctx.db.patch(user._id, data);
  },
});
