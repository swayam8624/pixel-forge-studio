import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { profile } from "@/data/site";

const STORAGE_KEY = "visitor_email_consent_v1";

async function sendWelcomeEmail(email: string) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.info("EmailJS env vars are not configured; visitor email was captured locally only.");
    return;
  }

  await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_email: email,
        portfolio_owner: profile.name,
        reply_to: profile.email,
      },
    }),
  });
}

export function VisitorEmailConsent() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(localStorage.getItem(STORAGE_KEY) !== "handled");
    }, 1600);
    return () => window.clearTimeout(timer);
  }, []);

  const close = () => {
    localStorage.setItem(STORAGE_KEY, "handled");
    setVisible(false);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    try {
      await sendWelcomeEmail(email.trim());
      localStorage.setItem("visitor_email", email.trim());
      close();
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-5 left-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm border border-primary/20 bg-background/95 p-4 shadow-elevated backdrop-blur-xl"
        >
          <button
            type="button"
            aria-label="Close email consent"
            onClick={close}
            className="absolute right-3 top-3 rounded-sm p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
          <div className="mb-3 flex items-center gap-2 pr-8">
            <span className="inline-flex size-8 items-center justify-center rounded-sm border border-primary/25 text-primary">
              <Mail className="size-4" />
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold">Visitor signal</h2>
              <p className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">welcome transmission</p>
            </div>
          </div>
          <form onSubmit={submit} className="space-y-3">
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="your@email.com"
              className="rounded-sm border-white/10"
              required
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={sending} className="h-9 flex-1 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90">
                {sending ? "Sending" : "Send welcome"}
              </Button>
              <Button type="button" variant="outline" onClick={close} className="h-9 rounded-sm border-white/10">
                Skip
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
