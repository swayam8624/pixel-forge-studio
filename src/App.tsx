import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Models from "./pages/Models.tsx";
import Games from "./pages/Games.tsx";
import Book from "./pages/Book.tsx";
import Software from "./pages/Software.tsx";
import Research from "./pages/Research.tsx";
import Resume from "./pages/Resume.tsx";
import Blog from "./pages/Blog.tsx";
import Gallery from "./pages/Gallery.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/models" element={<Models />} />
          <Route path="/games" element={<Games />} />
          <Route path="/software" element={<Software />} />
          <Route path="/research" element={<Research />} />
          <Route path="/book" element={<Book />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/gallery" element={<Gallery />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
