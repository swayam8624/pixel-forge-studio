import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Plus, Send } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { MechanicalDial } from "@/components/MechanicalDial";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { seedBlogPosts, BlogPost } from "@/data/blog";
import { cn } from "@/lib/utils";

const POSTS_KEY = "portfolio_blog_posts_v1";
const DISCUSSIONS_KEY = "portfolio_blog_discussions_v1";

function renderMarkdown(markdown: string) {
  return markdown.split("\n").map((line, index) => {
    if (line.startsWith("## ")) {
      return <h3 key={index} className="mt-6 font-display text-2xl font-semibold">{line.replace("## ", "")}</h3>;
    }
    if (line.startsWith("# ")) {
      return <h2 key={index} className="mt-6 font-display text-3xl font-bold">{line.replace("# ", "")}</h2>;
    }
    if (!line.trim()) {
      return <div key={index} className="h-3" />;
    }
    return <p key={index} className="leading-relaxed text-muted-foreground">{line}</p>;
  });
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>(seedBlogPosts);
  const [selectedId, setSelectedId] = useState(seedBlogPosts[0].id);
  const [editorOpen, setEditorOpen] = useState(false);
  const [draft, setDraft] = useState({ title: "", tags: "", body: "" });
  const [discussion, setDiscussion] = useState("");
  const [threads, setThreads] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const storedPosts = localStorage.getItem(POSTS_KEY);
    const storedThreads = localStorage.getItem(DISCUSSIONS_KEY);
    if (storedPosts) setPosts([...JSON.parse(storedPosts), ...seedBlogPosts]);
    if (storedThreads) setThreads(JSON.parse(storedThreads));
  }, []);

  const selectedPost = useMemo(
    () => posts.find((post) => post.id === selectedId) || posts[0],
    [posts, selectedId],
  );

  const savePost = (event: FormEvent) => {
    event.preventDefault();
    if (!draft.title.trim() || !draft.body.trim()) return;
    const newPost: BlogPost = {
      id: `${Date.now()}`,
      title: draft.title.trim(),
      date: new Date().toISOString().slice(0, 10),
      tags: draft.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      excerpt: draft.body.trim().slice(0, 120),
      body: draft.body.trim(),
    };
    const userPosts = [newPost, ...posts.filter((post) => !seedBlogPosts.some((seed) => seed.id === post.id))];
    localStorage.setItem(POSTS_KEY, JSON.stringify(userPosts));
    setPosts([newPost, ...posts]);
    setSelectedId(newPost.id);
    setDraft({ title: "", tags: "", body: "" });
    setEditorOpen(false);
  };

  const sendDiscussion = (event: FormEvent) => {
    event.preventDefault();
    if (!discussion.trim()) return;
    const next = {
      ...threads,
      [selectedPost.id]: [discussion.trim(), ...(threads[selectedPost.id] || [])],
    };
    setThreads(next);
    localStorage.setItem(DISCUSSIONS_KEY, JSON.stringify(next));
    setDiscussion("");
  };

  return (
    <PageLayout videoPage="home">
      <section className="container py-16 md:py-24">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono-tech text-xs uppercase tracking-widest text-primary">field notes / essays / arguments</p>
            <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">Blog board</h1>
          </div>
          <Button onClick={() => setEditorOpen((open) => !open)} className="rounded-sm bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-2 size-4" /> New post
          </Button>
        </div>

        <AnimatePresence>
          {editorOpen && (
            <motion.form
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              onSubmit={savePost}
              className="mb-8 grid gap-4 border border-white/10 bg-card p-5 md:grid-cols-2"
            >
              <Input placeholder="Title" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} className="rounded-sm" />
              <Input placeholder="tags, comma, separated" value={draft.tags} onChange={(event) => setDraft({ ...draft, tags: event.target.value })} className="rounded-sm" />
              <Textarea placeholder="Write in lightweight Markdown..." value={draft.body} onChange={(event) => setDraft({ ...draft, body: event.target.value })} className="min-h-48 rounded-sm md:col-span-2" />
              <Button type="submit" className="rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 md:w-fit">Publish locally</Button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="space-y-3">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                onClick={() => setSelectedId(post.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") setSelectedId(post.id);
                }}
                role="button"
                tabIndex={0}
                whileHover={{ x: 4 }}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-4 border p-4 text-left transition-colors",
                  selectedPost.id === post.id ? "border-primary/40 bg-primary/5" : "border-white/5 bg-card hover:border-white/15",
                )}
              >
                <MechanicalDial label={`${index + 1}`} value={selectedPost.id === post.id ? 100 : 20} size="sm" active={selectedPost.id === post.id} />
                <span>
                  <span className="block font-display text-lg font-semibold">{post.title}</span>
                  <span className="mt-1 block font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">{post.date}</span>
                </span>
              </motion.div>
            ))}
          </aside>

          <motion.article layout className="border border-white/10 bg-card p-6 md:p-8">
            <div className="mb-5 flex flex-wrap gap-2">
              {selectedPost.tags.map((tag) => (
                <span key={tag} className="rounded-sm border border-white/10 px-2 py-1 font-mono-tech text-[10px] uppercase text-primary">{tag}</span>
              ))}
            </div>
            <h2 className="font-display text-4xl font-bold">{selectedPost.title}</h2>
            <p className="mt-3 text-muted-foreground">{selectedPost.excerpt}</p>
            <div className="mt-8 space-y-2">{renderMarkdown(selectedPost.body)}</div>

            <div className="mt-10 border-t border-white/10 pt-6">
              <h3 className="mb-4 flex items-center gap-2 font-display text-2xl font-semibold">
                <MessageCircle className="size-5 text-primary" /> Discussions
              </h3>
              <form onSubmit={sendDiscussion} className="flex gap-2">
                <Input value={discussion} onChange={(event) => setDiscussion(event.target.value)} placeholder="Raise a thought..." className="rounded-sm" />
                <Button type="submit" className="rounded-sm bg-primary text-primary-foreground hover:bg-primary/90">
                  <Send className="size-4" />
                </Button>
              </form>
              <div className="mt-4 space-y-2">
                {(threads[selectedPost.id] || []).map((item, index) => (
                  <p key={`${item}-${index}`} className="border border-white/5 bg-background/40 p-3 text-sm text-muted-foreground">{item}</p>
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
