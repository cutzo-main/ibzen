import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ── Ideas ────────────────────────────────────────────────────────────────────

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("ideas").order("desc").collect();
  },
});

export const submit = mutation({
  args: {
    studentName: v.string(),
    studentClass: v.string(),
    ideaText: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const correctPassword = process.env.ORGANISER_PASSWORD;
    if (!correctPassword || args.password !== correctPassword) {
      throw new Error("Invalid organiser password.");
    }
    const trimmed = {
      studentName: args.studentName.trim(),
      studentClass: args.studentClass.trim(),
      ideaText: args.ideaText.trim(),
      likes: 0,
      dislikes: 0,
    };
    if (!trimmed.studentName) throw new Error("Student name is required.");
    if (!trimmed.studentClass) throw new Error("Class is required.");
    if (!trimmed.ideaText) throw new Error("Idea text is required.");
    return await ctx.db.insert("ideas", trimmed);
  },
});

export const like = mutation({
  args: { ideaId: v.id("ideas") },
  handler: async (ctx, { ideaId }) => {
    const idea = await ctx.db.get(ideaId);
    if (!idea) throw new Error("Idea not found.");
    await ctx.db.patch(ideaId, { likes: (idea.likes ?? 0) + 1 });
  },
});

export const dislike = mutation({
  args: { ideaId: v.id("ideas") },
  handler: async (ctx, { ideaId }) => {
    const idea = await ctx.db.get(ideaId);
    if (!idea) throw new Error("Idea not found.");
    await ctx.db.patch(ideaId, { dislikes: (idea.dislikes ?? 0) + 1 });
  },
});

export const updateIdea = mutation({
  args: {
    ideaId: v.id("ideas"),
    studentName: v.string(),
    studentClass: v.string(),
    ideaText: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const correctPassword = process.env.ORGANISER_PASSWORD;
    if (!correctPassword || args.password !== correctPassword) {
      throw new Error("Invalid organiser password.");
    }
    const trimmed = {
      studentName: args.studentName.trim(),
      studentClass: args.studentClass.trim(),
      ideaText: args.ideaText.trim(),
    };
    if (!trimmed.studentName) throw new Error("Student name is required.");
    if (!trimmed.studentClass) throw new Error("Class is required.");
    if (!trimmed.ideaText) throw new Error("Idea text is required.");
    await ctx.db.patch(args.ideaId, trimmed);
  },
});


export const unlike = mutation({
  args: { ideaId: v.id("ideas") },
  handler: async (ctx, { ideaId }) => {
    const idea = await ctx.db.get(ideaId);
    if (!idea) throw new Error("Idea not found.");
    const currentLikes = idea.likes ?? 0;
    await ctx.db.patch(ideaId, { likes: Math.max(0, currentLikes - 1) });
  },
});

// ── Comments ─────────────────────────────────────────────────────────────────

export const getComments = query({
  args: { ideaId: v.id("ideas") },
  handler: async (ctx, { ideaId }) => {
    return await ctx.db
      .query("comments")
      .withIndex("by_idea", (q) => q.eq("ideaId", ideaId))
      .order("asc")
      .collect();
  },
});

export const addComment = mutation({
  args: {
    ideaId: v.id("ideas"),
    authorName: v.string(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const trimmedAuthor = args.authorName.trim();
    const trimmedText = args.text.trim();
    if (trimmedAuthor.length < 1) throw new Error("Name required.");
    if (trimmedText.length < 1) throw new Error("Comment cannot be empty.");
    return await ctx.db.insert("comments", {
      ideaId: args.ideaId,
      authorName: trimmedAuthor,
      text: trimmedText,
    });
  },
});

export const editComment = mutation({
  args: {
    commentId: v.id("comments"),
    text: v.string(),
  },
  handler: async (ctx, { commentId, text }) => {
    const trimmed = text.trim();
    if (!trimmed) throw new Error("Comment text cannot be empty.");
    await ctx.db.patch(commentId, { text: trimmed });
  },
});

export const deleteComment = mutation({
  args: { commentId: v.id("comments") },
  handler: async (ctx, { commentId }) => {
    await ctx.db.delete(commentId);
  },
});

