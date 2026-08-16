import { useState, useRef, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation } from "convex/react";
import type { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { SiteNav } from "@/components/landing/SiteNav";


export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title: "School Ideas — Ibzen" },
      { name: "description", content: "Browse ideas shared by students at Ibzen innovation workshops." },
    ],
    links: [{ rel: "canonical", href: "/members" }],
  }),
  component: SchoolIdeasPage,
});

// ── Types ─────────────────────────────────────────────────────────────────────
interface IdeaItem {
  _id: Id<"ideas">;
  _creationTime: number;
  studentName: string;
  studentClass: string;
  ideaText: string;
  likes?: number;
}

// ── Utilities ─────────────────────────────────────────────────────────────────
function timeAgo(ts: number): string {
  const secs = Math.floor((Date.now() - ts) / 1000);
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(ts).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

const AVATAR_PALETTE = [
  "oklch(0.67 0.12 65)",
  "oklch(0.54 0.10 250)",
  "oklch(0.58 0.11 150)",
  "oklch(0.60 0.11 320)",
  "oklch(0.62 0.10 30)",
];
function avatarBg(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[h];
}

function getLikedSet(key: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try { return new Set(JSON.parse(localStorage.getItem(key) ?? "[]")); }
  catch { return new Set(); }
}
function saveLikedSet(key: string, s: Set<string>) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify([...s])); } catch {}
}

// ── Reply thread ──────────────────────────────────────────────────────────────
function ReplyThread({ ideaId }: { ideaId: Id<"ideas"> }) {
  const comments = useQuery(api.ideas.getComments, { ideaId });
  const addComment = useMutation(api.ideas.addComment);
  const editCommentMutation = useMutation(api.ideas.editComment);
  const deleteCommentMutation = useMutation(api.ideas.deleteComment);

  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);

  const [editingCommentId, setEditingCommentId] = useState<Id<"comments"> | null>(null);
  const [editingText, setEditingText] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  async function handlePost(e: React.FormEvent) {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;
    setPosting(true);
    try {
      await addComment({ ideaId, authorName: author.trim(), text: text.trim() });
      setText("");
    } finally { setPosting(false); }
  }

  async function handleSaveCommentEdit(commentId: Id<"comments">) {
    if (!editingText.trim()) return;
    setSavingEdit(true);
    try {
      await editCommentMutation({ commentId, text: editingText.trim() });
      setEditingCommentId(null);
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleDeleteComment(commentId: Id<"comments">) {
    await deleteCommentMutation({ commentId });
  }

  return (
    <div className="mt-4 pt-4 border-t border-border/60">
      {/* Existing replies */}
      {comments && comments.length > 0 && (
        <div className="mb-4 flex flex-col gap-3">
          {comments.map((c) => (
            <div key={c._id} className="group/reply flex gap-3 items-start">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ background: avatarBg(c.authorName) }}
              >
                {getInitials(c.authorName)}
              </div>
              <div className="flex-1 min-w-0 rounded-2xl bg-muted/40 px-3.5 py-2.5">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className="text-xs font-semibold text-foreground">{c.authorName}</span>
                  
                  {/* Edit / Delete actions */}
                  {editingCommentId !== c._id && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCommentId(c._id);
                          setEditingText(c.text);
                        }}
                        className="text-[11px] text-muted-foreground hover:text-primary transition-colors"
                        title="Edit comment"
                      >
                        Edit
                      </button>
                      <span className="text-muted-foreground/30 text-[10px]">·</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteComment(c._id)}
                        className="text-[11px] text-muted-foreground hover:text-destructive transition-colors"
                        title="Delete comment"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                {editingCommentId === c._id ? (
                  <div className="mt-1 flex flex-col gap-2">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-primary"
                      autoFocus
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={savingEdit || !editingText.trim()}
                        onClick={() => handleSaveCommentEdit(c._id)}
                        className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground transition hover:bg-primary/85 disabled:opacity-40"
                      >
                        {savingEdit ? "Saving…" : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingCommentId(null)}
                        className="text-[11px] text-muted-foreground hover:text-foreground"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground leading-relaxed">{c.text}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply composer */}
      <form onSubmit={handlePost} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full sm:w-28 shrink-0 rounded-full border border-border bg-background px-3 py-2 text-xs text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground/40"
        />
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            placeholder="Share your thoughts…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 min-w-0 rounded-full border border-border bg-background px-3 py-2 text-xs text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground/40"
          />
          <button
            type="submit"
            disabled={posting || !author.trim() || !text.trim()}
            className="shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/85 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {posting ? "…" : "Comment"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Post card ─────────────────────────────────────────────────────────────────
function PostCard({
  idea,
  index,
  onEdit,
}: {
  idea: IdeaItem;
  index: number;
  onEdit: (idea: IdeaItem) => void;
}) {
  const likeMutation = useMutation(api.ideas.like);
  const unlikeMutation = useMutation(api.ideas.unlike);
  const comments = useQuery(api.ideas.getComments, { ideaId: idea._id });
  const [showReplies, setShowReplies] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(idea.likes ?? 0);

  useEffect(() => {
    setLocalLikes(idea.likes ?? 0);
    if (getLikedSet("ibzen_liked").has(idea._id)) {
      setHasLiked(true);
    }
  }, [idea._id, idea.likes]);

  async function handleToggleLike() {
    if (hasLiked) {
      setHasLiked(false);
      setLocalLikes((n) => Math.max(0, n - 1));
      const s = getLikedSet("ibzen_liked");
      s.delete(idea._id);
      saveLikedSet("ibzen_liked", s);
      await unlikeMutation({ ideaId: idea._id });
    } else {
      setHasLiked(true);
      setLocalLikes((n) => n + 1);
      const s = getLikedSet("ibzen_liked");
      s.add(idea._id);
      saveLikedSet("ibzen_liked", s);
      await likeMutation({ ideaId: idea._id });
    }
  }

  const commentCount = comments?.length ?? 0;

  return (
    <article
      className="group relative px-5 py-5 sm:px-7 sm:py-6 border-b border-border transition-colors duration-150 hover:bg-primary/[0.025]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="shrink-0">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm ring-2 ring-background"
            style={{ background: avatarBg(idea.studentName) }}
          >
            {getInitials(idea.studentName)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Name row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-syne text-[15px] font-bold text-foreground leading-tight">
              {idea.studentName}
            </span>
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest"
              style={{
                background: "oklch(0.65 0.14 250 / 0.12)",
                color: "oklch(0.45 0.16 250)",
                border: "1px solid oklch(0.65 0.14 250 / 0.25)",
              }}
            >
              {idea.studentClass}
            </span>
            <span className="ml-auto text-[11px] text-muted-foreground/60 shrink-0">
              {timeAgo(idea._creationTime)}
            </span>
          </div>

          {/* Idea text */}
          <p className="mt-2 text-[14.5px] leading-[1.7] text-foreground/85 whitespace-pre-wrap font-sans">
            {idea.ideaText}
          </p>

          {/* Action bar */}
          <div className="mt-4 flex items-center justify-between gap-1 -ml-2">
            <div className="flex items-center gap-1">
              {/* Comment */}
              <button
                type="button"
                onClick={() => setShowReplies((v) => !v)}
                className={`group/btn flex items-center gap-2 rounded-full px-3 py-2 text-[13px] font-medium transition-all ${
                  showReplies
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-primary/8 hover:text-primary"
                }`}
                aria-label="Comment"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{commentCount > 0 ? commentCount : "Comment"}</span>
              </button>

              {/* Like / Unlike toggle */}
              <button
                type="button"
                onClick={handleToggleLike}
                className={`flex items-center gap-2 rounded-full px-3 py-2 text-[13px] font-medium transition-all ${
                  hasLiked
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
                aria-label={hasLiked ? "Unlike" : "Like"}
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill={hasLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{localLikes > 0 ? localLikes : "Like"}</span>
              </button>
            </div>

            {/* Edit button */}
            <button
              type="button"
              onClick={() => onEdit(idea)}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground/60 transition hover:bg-muted hover:text-foreground"
              title="Edit Idea (Organiser)"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit</span>
            </button>
          </div>

          {/* Inline replies */}
          {showReplies && <ReplyThread ideaId={idea._id} />}
        </div>
      </div>
    </article>
  );
}

// ── Organiser Modal ───────────────────────────────────────────────────────────
function OrganiserModal({
  onClose,
  initialIdea,
  allIdeas,
  savedPassword,
  onPasswordSuccess,
}: {
  onClose: () => void;
  initialIdea?: IdeaItem | null;
  allIdeas?: IdeaItem[];
  savedPassword?: string;
  onPasswordSuccess?: (pass: string) => void;
}) {
  const submitIdea = useMutation(api.ideas.submit);
  const updateIdea = useMutation(api.ideas.updateIdea);

  const [step, setStep] = useState<"password" | "form">(savedPassword ? "form" : "password");
  const [password, setPassword] = useState(savedPassword ?? "");
  const [passwordErr, setPasswordErr] = useState("");

  const [selectedIdeaId, setSelectedIdeaId] = useState<string>(initialIdea?._id ?? "new");
  const [name, setName] = useState(initialIdea?.studentName ?? "");
  const [cls, setCls] = useState(initialIdea?.studentClass ?? "");
  const [text, setText] = useState(initialIdea?.ideaText ?? "");

  const [formErrs, setFormErrs] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverErr, setServerErr] = useState("");
  const backdropRef = useRef<HTMLDivElement>(null);

  // Sync state if switching idea dropdown selection inside modal
  function handleSelectIdeaChange(idStr: string) {
    setSelectedIdeaId(idStr);
    setFormErrs({});
    setServerErr("");
    if (idStr === "new") {
      setName("");
      setCls("");
      setText("");
    } else {
      const found = allIdeas?.find((i) => i._id === idStr);
      if (found) {
        setName(found.studentName);
        setCls(found.studentClass);
        setText(found.ideaText);
      }
    }
  }

  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === backdropRef.current) onClose();
  }
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) { setPasswordErr("Enter the password."); return; }
    setStep("form");
    if (onPasswordSuccess) onPasswordSuccess(password);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Enter the student's name.";
    if (!cls.trim()) errs.cls = "Enter the class.";
    if (!text.trim()) errs.text = "Describe the idea.";
    if (Object.keys(errs).length) { setFormErrs(errs); return; }
    setFormErrs({}); setServerErr("");
    setSubmitting(true);

    const isEditMode = selectedIdeaId !== "new";

    try {
      if (isEditMode) {
        await updateIdea({
          ideaId: selectedIdeaId as Id<"ideas">,
          studentName: name.trim(),
          studentClass: cls.trim(),
          ideaText: text.trim(),
          password,
        });
      } else {
        await submitIdea({
          studentName: name.trim(),
          studentClass: cls.trim(),
          ideaText: text.trim(),
          password,
        });
        setName(""); setCls(""); setText("");
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      if (msg.toLowerCase().includes("password")) {
        setStep("password"); setPassword(""); setPasswordErr("Incorrect password. Try again.");
      } else { setServerErr(msg); }
    } finally { setSubmitting(false); }
  }

  const isEditMode = selectedIdeaId !== "new";

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/25 backdrop-blur-sm px-4"
    >
      <div className="w-full max-w-md rounded-3xl border border-border bg-background shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <p className="font-syne text-sm font-bold text-foreground tracking-tight">
            {step === "password"
              ? "Organiser Access"
              : isEditMode
              ? "Edit Student Idea"
              : "Post an Idea"}
          </p>
          <button type="button" onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label="Close">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {step === "password" ? (
            <form onSubmit={handleUnlock} className="flex flex-col gap-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                This section is for organisers only. Enter the password to post or edit student ideas.
              </p>
              <div className="flex flex-col gap-1.5">
                <input
                  id="organiser-password"
                  type="password"
                  autoFocus
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setPasswordErr(""); }}
                  className={`w-full rounded-2xl border px-4 py-3 text-sm text-foreground tracking-widest outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 placeholder:tracking-normal placeholder:text-muted-foreground/40 bg-muted/30 ${passwordErr ? "border-destructive" : "border-border"}`}
                />
                {passwordErr && <p className="text-xs text-destructive pl-1">{passwordErr}</p>}
              </div>
              <button type="submit"
                className="rounded-2xl bg-primary py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/85 active:scale-[0.98]">
                Unlock →
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              {success && (
                <div className="flex items-center gap-3 rounded-2xl border border-primary/25 bg-primary/8 px-4 py-3">
                  <span className="text-primary text-base">✓</span>
                  <p className="text-sm font-medium text-primary">
                    {isEditMode ? "Idea updated successfully!" : "Idea posted to the board!"}
                  </p>
                </div>
              )}
              {serverErr && (
                <p className="rounded-2xl border border-destructive/25 bg-destructive/8 px-4 py-3 text-sm text-destructive">{serverErr}</p>
              )}

              {/* Selector to switch between New Post & Existing Ideas */}
              {allIdeas && allIdeas.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="select-idea-action" className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Mode
                  </label>
                  <select
                    id="select-idea-action"
                    value={selectedIdeaId}
                    onChange={(e) => handleSelectIdeaChange(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-muted/30 px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  >
                    <option value="new">➕ Post a new idea</option>
                    <optgroup label="Edit existing ideas">
                      {allIdeas.map((item) => (
                        <option key={item._id} value={item._id}>
                          ✏️ {item.studentName} ({item.studentClass}) — "{item.ideaText.slice(0, 30)}…"
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              )}

              {/* Student Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="post-name" className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Student Name</label>
                <input
                  id="post-name"
                  type="text"
                  placeholder="e.g. Mohammed Nadeem"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setFormErrs((p) => ({ ...p, name: "" })); }}
                  className={`w-full rounded-2xl border bg-muted/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 ${formErrs.name ? "border-destructive" : "border-border"}`}
                />
                {formErrs.name && <p className="text-xs text-destructive pl-1">{formErrs.name}</p>}
              </div>

              {/* Class */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="post-class" className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Class</label>
                <input
                  id="post-class"
                  type="text"
                  placeholder="e.g. 10-A"
                  value={cls}
                  onChange={(e) => { setCls(e.target.value); setFormErrs((p) => ({ ...p, cls: "" })); }}
                  className={`w-full rounded-2xl border bg-muted/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 ${formErrs.cls ? "border-destructive" : "border-border"}`}
                />
                {formErrs.cls && <p className="text-xs text-destructive pl-1">{formErrs.cls}</p>}
              </div>

              {/* Idea Text */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="post-idea" className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">The Idea</label>
                <textarea
                  id="post-idea"
                  rows={5}
                  placeholder="Describe the student's idea…"
                  value={text}
                  onChange={(e) => { setText(e.target.value); setFormErrs((p) => ({ ...p, text: "" })); }}
                  className={`w-full resize-none rounded-2xl border bg-muted/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 ${formErrs.text ? "border-destructive" : "border-border"}`}
                />
                {formErrs.text && <p className="text-xs text-destructive pl-1">{formErrs.text}</p>}
              </div>

              <div className="flex gap-2.5 pt-1">
                <button type="button" onClick={() => setStep("password")}
                  className="rounded-2xl border border-border px-5 py-2.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">
                  ← Back
                </button>
                <button id="post-submit-btn" type="submit" disabled={submitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary/85 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? (
                    <><span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> Saving…</>
                  ) : isEditMode ? (
                    "Save Changes"
                  ) : (
                    "Post Idea"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
function SchoolIdeasPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="site-canvas min-h-screen bg-background">
        <SiteNav />
        <main className="relative z-10">
          <section className="relative border-b border-border bg-background">
            <div className="relative mx-auto max-w-3xl px-5 pt-6 pb-6 sm:px-8 sm:pt-8 sm:pb-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/60">
                  Home
                </span>
                <span className="text-muted-foreground/30">›</span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  School Ideas
                </span>
              </div>
              <h1 className="font-playfair text-2xl font-semibold text-foreground sm:text-3xl" style={{ lineHeight: 1.15 }}>
                School Ideas
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground max-w-md leading-relaxed">
                Innovation starts with a single spark. Here's what Ibzen students are thinking.
              </p>
            </div>
          </section>
          <div className="mx-auto max-w-3xl">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex gap-4 px-5 sm:px-7 py-6 border-b border-border">
                <div className="h-11 w-11 shrink-0 rounded-full bg-muted animate-pulse" />
                <div className="flex-1 flex flex-col gap-2.5 pt-1">
                  <div className="h-3.5 w-36 rounded-full bg-muted animate-pulse" />
                  <div className="h-3 w-full rounded-full bg-muted animate-pulse" />
                  <div className="h-3 w-5/6 rounded-full bg-muted animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return <SchoolIdeasPageClient />;
}

function SchoolIdeasPageClient() {
  const ideas = useQuery(api.ideas.list);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIdeaForEdit, setSelectedIdeaForEdit] = useState<IdeaItem | null>(null);
  const [savedPassword, setSavedPassword] = useState<string>("");

  const [dotMenuOpen, setDotMenuOpen] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dotRef.current && !dotRef.current.contains(e.target as Node)) setDotMenuOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleOpenCreateModal() {
    setSelectedIdeaForEdit(null);
    setModalOpen(true);
  }

  function handleEditIdea(idea: IdeaItem) {
    setSelectedIdeaForEdit(idea);
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
    setSelectedIdeaForEdit(null);
  }

  return (
    <>
      <div className="site-canvas min-h-screen bg-background">
        <SiteNav />

        <main className="relative z-10">

          {/* ── Hero header ─────────────────────────────────────────── */}
          <section className="relative border-b border-border bg-background">
            <div className="relative mx-auto max-w-3xl px-5 pt-6 pb-6 sm:px-8 sm:pt-8 sm:pb-8">
              {/* Breadcrumb */}
              <div className="mb-4 flex items-center gap-2">
                <Link to="/" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/60 transition hover:text-primary">
                  Home
                </Link>
                <span className="text-muted-foreground/30">›</span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  School Ideas
                </span>
              </div>

              <div className="pr-10">
                <h1 className="font-playfair text-2xl font-semibold text-foreground sm:text-3xl" style={{ lineHeight: 1.15 }}>
                  School Ideas
                </h1>
                <p className="mt-1.5 text-sm text-muted-foreground max-w-md leading-relaxed">
                  Innovation starts with a single spark. Here's what Ibzen students are thinking.
                </p>

                {/* Ideas count only */}
                <div className="mt-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-semibold text-muted-foreground">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    {ideas === undefined ? "…" : ideas.length} {ideas?.length === 1 ? "idea" : "ideas"}
                  </span>
                </div>
              </div>

              {/* Pinned organiser 3-dot in top right */}
              <div ref={dotRef} className="absolute right-4 top-6 sm:right-8 sm:top-8">
                <button
                  id="organiser-dots"
                  type="button"
                  onClick={() => setDotMenuOpen((v) => !v)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground/50 transition hover:bg-muted hover:text-foreground"
                  aria-label="More options"
                >
                  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="12" cy="19" r="1.5" />
                  </svg>
                </button>
                {dotMenuOpen && (
                  <div className="absolute right-0 top-11 z-50 w-52 overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
                    <button
                      type="button"
                      onClick={() => { setDotMenuOpen(false); handleOpenCreateModal(); }}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-sm font-medium text-foreground transition hover:bg-muted"
                    >
                      <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                      Organiser Access
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>


          {/* ── Feed ────────────────────────────────────────────────── */}
          <div className="mx-auto max-w-3xl">

            {/* Loading skeleton */}
            {ideas === undefined && (
              <>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex gap-4 px-5 sm:px-7 py-6 border-b border-border">
                    <div className="h-11 w-11 shrink-0 rounded-full bg-muted animate-pulse" />
                    <div className="flex-1 flex flex-col gap-2.5 pt-1">
                      <div className="h-3.5 w-36 rounded-full bg-muted animate-pulse" />
                      <div className="h-3 w-full rounded-full bg-muted animate-pulse" />
                      <div className="h-3 w-5/6 rounded-full bg-muted animate-pulse" />
                      <div className="h-3 w-4/6 rounded-full bg-muted animate-pulse" />
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Empty state */}
            {ideas?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-28 text-center px-8">
                <div
                  className="mb-5 flex h-16 w-16 items-center justify-center rounded-full text-2xl"
                  style={{ background: "oklch(0.67 0.12 65 / 0.1)", border: "1px solid oklch(0.67 0.12 65 / 0.2)" }}
                >
                  💡
                </div>
                <p className="font-syne text-lg font-bold text-foreground">No ideas yet</p>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs leading-relaxed">
                  Organisers can post the first student idea.{" "}
                  <button type="button" onClick={handleOpenCreateModal} className="text-primary font-semibold hover:underline underline-offset-2">
                    Post one now →
                  </button>
                </p>
              </div>
            )}

            {/* Posts */}
            {ideas?.map((idea, i) => (
              <PostCard key={idea._id} idea={idea} index={i} onEdit={handleEditIdea} />
            ))}

            {/* Bottom spacer */}
            <div className="h-20" />
          </div>
        </main>
      </div>

      {modalOpen && (
        <OrganiserModal
          onClose={handleCloseModal}
          initialIdea={selectedIdeaForEdit}
          allIdeas={ideas}
          savedPassword={savedPassword}
          onPasswordSuccess={(pass) => setSavedPassword(pass)}
        />
      )}
    </>
  );
}
