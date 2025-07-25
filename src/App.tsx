import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import RoomMatching from "./pages/RoomMatching";
import PGFinder from "./pages/PGFinder";
import Community from "./pages/Community";
import PGCommunity from "./pages/PGCommunity";
import Complaints from "./pages/Complaints";
import Marketplace from "./pages/Marketplace";
import RoomVisualizer from "./pages/RoomVisualizer";
import Splitwise from "./pages/Splitwise";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/room-matching" element={<RoomMatching />} />
            <Route path="/pg-finder" element={<PGFinder />} />
            <Route path="/community" element={<Community />} />
            <Route path="/pg-community" element={<PGCommunity />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/room-visualizer" element={<RoomVisualizer />} />
            <Route path="/splitwise" element={<Splitwise />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
