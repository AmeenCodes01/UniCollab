import {Doc} from "convex/server"; // Adjust the import based on your project structure

export type IdeaWithType = Doc<"ideas"> & {
  type: "interested" | "saved" | "member" | "author";
};
