
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Attendance from "./pages/Attendance";
import Grades from "./pages/Grades";
import NotFound from "./pages/NotFound";
import { useIsMobile } from "@/hooks/use-mobile";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className={`flex-1 transition-all duration-300 ${isMobile ? 'ml-0' : 'ml-64'}`}>
        <main className="p-4 md:p-6 max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/:id" element={<Students />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
