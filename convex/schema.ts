import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ideas: defineTable({
    studentName: v.string(),
    studentClass: v.string(),
    ideaText: v.string(),
    likes: v.optional(v.number()),
    dislikes: v.optional(v.number()),
    // Legacy field
    studentNumber: v.optional(v.string()),
  }),

  comments: defineTable({
    ideaId: v.id("ideas"),
    authorName: v.string(),
    text: v.string(),
  }).index("by_idea", ["ideaId"]),
});
