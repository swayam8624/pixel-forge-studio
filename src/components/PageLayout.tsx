import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingVideo } from "./FloatingVideo";
import { CustomCursor } from "./CustomCursor";
import { ScrollDial } from "./ScrollDial";
import { VisitorEmailConsent } from "./VisitorEmailConsent";
import { EngagementStats } from "./EngagementStats";

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
    <ScrollDial />
    <EngagementStats />
    <VisitorEmailConsent />
    <FloatingVideo page={videoPage} />
  </div>
);
