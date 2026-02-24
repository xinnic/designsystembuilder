import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { TamaguiProvider } from '@tamagui/core';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useTokenSystem, useTheme } from "./hooks/useTokenSystem";
import { config } from "./tamagui.config";

const queryClient = new QueryClient();

// Inner component that applies token system and provides routes
const AppContent = () => {
  // Get current theme preference
  const theme = useTheme();

  // Apply the new token system
  const { tokens, brandPalette } = useTokenSystem(theme);

  useEffect(() => {
    // Apply the dsb-theme class to enable token CSS
    document.body.classList.add('dsb-theme');

    return () => {
      document.body.classList.remove('dsb-theme');
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </QueryClientProvider>
    </TamaguiProvider>
  );
};

export default App;
