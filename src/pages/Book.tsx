import { useState } from "react";
import { Quote, BookOpen, ShoppingCart, Send } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { book, profile } from "@/data/site";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Book = () => {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Question received — I'll reply to your inbox.");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <PageLayout videoPage="book">
      {/* Hero */}
      <section className="container py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute -inset-8 rounded-[3rem] opacity-50" style={{ background: "var(--gradient-radial-amber)" }} />
            <img
              src={book.cover}
              alt={`${book.title} cover`}
              className="relative rounded-2xl shadow-[var(--shadow-elevated)] w-full max-w-sm mx-auto border border-white/5"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="font-mono-tech text-xs uppercase tracking-widest text-amber">/ a novel</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold mt-3 leading-[0.95] text-balance">
              {book.title}
            </h1>
            <p className="font-display text-xl text-muted-foreground mt-4 italic">"{book.subtitle}"</p>
            <p className="text-sm text-muted-foreground mt-6 leading-relaxed">{book.description}</p>
            <p className="font-mono-tech text-xs uppercase mt-6 text-muted-foreground">by {profile.name}</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button asChild size="lg" className="bg-amber text-primary-foreground hover:opacity-90 rounded-full">
                <a href={book.purchaseLinks[0].url}><ShoppingCart className="size-4" /> Buy Now</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/15">
                <a href="#quotes"><BookOpen className="size-4" /> Read Excerpt</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quotes */}
      <section id="quotes" className="container py-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold">From The Pages</h2>
        <div className="grid md:grid-cols-3 gap-5 mt-8">
          {book.quotes.map((q, i) => (
            <article key={i} className="bento-card p-7 relative">
              <Quote className="size-10 text-amber/80" strokeWidth={1.5} />
              <p className="font-display italic text-lg mt-4 leading-snug text-balance">"{q.text}"</p>
              <p className="font-mono-tech text-xs text-muted-foreground mt-6 uppercase">
                {q.chapter} · p.{q.page}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Purchase links */}
      <section className="container py-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold">Where to buy</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {book.purchaseLinks.map(p => (
            <a
              key={p.store}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "bento-card bento-card-hover p-6 flex items-center justify-between",
                p.primary && "border-amber/40"
              )}
            >
              <div>
                <p className="font-mono-tech text-xs uppercase text-muted-foreground">Store</p>
                <p className="font-display text-2xl font-semibold mt-1">{p.store}</p>
              </div>
              <span className={cn(
                "px-4 py-2 rounded-full text-sm font-medium",
                p.primary ? "bg-amber text-primary-foreground" : "border border-white/10"
              )}>
                Buy →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold">Common Questions</h2>
        <Accordion type="single" collapsible className="mt-8 space-y-3">
          {book.faqItems.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bento-card border-l-2 border-l-transparent data-[state=open]:border-l-amber px-6 py-1"
            >
              <AccordionTrigger className="font-display text-lg hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Ask a question */}
      <section className="container py-12">
        <div className="bento-card p-8 md:p-10 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold">Raise a question</h2>
          <p className="text-sm text-muted-foreground mt-2">I read every message. Replies usually within 48 hours.</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <Input required name="name" placeholder="Your name" className="bg-card-elevated border-white/10 h-12" />
            <Input required type="email" name="email" placeholder="Your email" className="bg-card-elevated border-white/10 h-12" />
            <Textarea required name="question" placeholder="Your question..." rows={4} className="bg-card-elevated border-white/10" />
            <Button type="submit" size="lg" className="bg-amber text-primary-foreground rounded-full w-full md:w-auto">
              <Send className="size-4" /> {submitted ? "Sent — thanks!" : "Send Question"}
            </Button>
          </form>
        </div>
      </section>
    </PageLayout>
  );
};

export default Book;
