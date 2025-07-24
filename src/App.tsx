import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { WalletProvider, useWallet } from "@/contexts/WalletContext";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import NewRequest from "./pages/NewRequest";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected } = useWallet();
  return isConnected ? <>{children}</> : <Navigate to="/" replace />;
}

// Public Route Component (redirect to dashboard if connected)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isConnected } = useWallet();
  return !isConnected ? <>{children}</> : <Navigate to="/dashboard" replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <WalletProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <PublicRoute>
                  <Landing />
                </PublicRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/request" element={
                <ProtectedRoute>
                  <NewRequest />
                </ProtectedRoute>
              } />
              <Route path="/send" element={
                <ProtectedRoute>
                  <NewRequest />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </WalletProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
