import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import ExplorationDetail from "./pages/ExplorationDetail";
import KineticPosterDetail from "./pages/KineticPosterDetail";
import NeuralPatternsDetail from "./pages/NeuralPatternsDetail";
import CryptoDetail from "./pages/CryptoDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="/exploration/composition-series" element={<ExplorationDetail />} />
          <Route path="/exploration/kinetic-poster" element={<KineticPosterDetail />} />
          <Route path="/exploration/neural-patterns" element={<NeuralPatternsDetail />} />
          <Route path="/exploration/crypto" element={<CryptoDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
