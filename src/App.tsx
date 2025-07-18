
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Events from "./pages/Events";
import Challenges from "./pages/Challenges";
import Badges from "./pages/Badges";
import Leaderboard from "./pages/Leaderboard";
import Games from "./pages/Games";
import GamePlay from "./pages/GamePlay";
import Organizers from "./pages/Organizers";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import PaymentPage from "./pages/PaymentPage";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import Colleges from "./pages/Colleges";
import CollegeDetails from "./pages/CollegeDetails";
import Admin from "./pages/Admin";

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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/colleges/:id" element={<CollegeDetails />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/games" element={<Games />} />
            <Route path="/gameplay/:gameId" element={<GamePlay />} />
            <Route path="/organizers" element={<Organizers />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/payment/:eventId" element={<PaymentPage />} />
            <Route path="/registration-success/:eventId" element={<RegistrationSuccess />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
