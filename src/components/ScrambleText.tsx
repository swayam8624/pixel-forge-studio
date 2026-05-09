import { useEffect, useState } from "react";

const chars = "01<>/\\[]{}#$%&*+-=ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function ScrambleText({ text, active = true }: { text: string; active?: boolean }) {
  const [value, setValue] = useState(text);
  const [done, setDone] = useState(() => sessionStorage.getItem(`scramble:${text}`) === "done");

  useEffect(() => {
    if (!active || done) {
      setValue(text);
      return;
    }

    let frame = 0;
    const interval = window.setInterval(() => {
      frame += 1;
      setValue(
        text
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < frame) return letter;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );
      if (frame > text.length + 5) {
        window.clearInterval(interval);
        setValue(text);
        setDone(true);
        sessionStorage.setItem(`scramble:${text}`, "done");
      }
    }, 70);

    return () => window.clearInterval(interval);
  }, [active, done, text]);

  return <>{value}</>;
}
