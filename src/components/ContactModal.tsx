import { ReactNode, useState } from "react";
import { Send } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/site";
import { toast } from "sonner";

interface Props {
  children: ReactNode;
  subject?: string;
  title?: string;
}

export function ContactModal({ children, subject = "Portfolio Contact", title = "Let's build something." }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
      });
      setSubmitted(true);
      toast.success("Message sent successfully!");
      setTimeout(() => {
        setSubmitted(false);
        setOpen(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-white/10 p-6">
        <DialogTitle className="font-display text-2xl font-bold">{title}</DialogTitle>
        <p className="text-sm text-muted-foreground mt-1">
          I read every message. Replies usually within 48 hours.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input type="hidden" name="_subject" value={subject} />
          <Input 
            required 
            name="name" 
            placeholder="Your name" 
            className="bg-card-elevated border-white/10 h-12" 
          />
          <Input 
            required 
            type="email" 
            name="email" 
            placeholder="Your email" 
            className="bg-card-elevated border-white/10 h-12" 
          />
          <Textarea 
            required 
            name="message" 
            placeholder="How can I help you?" 
            rows={4} 
            className="bg-card-elevated border-white/10" 
          />
          
          <Button 
            type="submit" 
            size="lg" 
            className="bg-primary text-primary-foreground rounded-full w-full mt-2 hover:opacity-90 transition-opacity"
            disabled={submitted}
          >
            <Send className="size-4 mr-2" /> 
            {submitted ? "Message Sent!" : "Send Message"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
