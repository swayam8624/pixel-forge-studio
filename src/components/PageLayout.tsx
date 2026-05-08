import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingVideo } from "./FloatingVideo";
import { CustomCursor } from "./CustomCursor";

interface Props {
  children: ReactNode;
  videoPage: "home" | "models" | "games" | "book";
}

export const PageLayout = ({ children, videoPage }: Props) => (
  <div className="min-h-screen flex flex-col">
    <CustomCursor />
    <Navbar />
    <main className="flex-1 animate-fade-up">{children}</main>
    <Footer />
    <FloatingVideo page={videoPage} />
  </div>
);
