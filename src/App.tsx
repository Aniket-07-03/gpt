import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StateDetails from "./components/StateDetails";
import DistrictDetails from "./components/DistrictDetails";
import VillageDetails from "./components/VillageDetails";
import Analytics from "./components/Analytics";
import Reports from "./components/Reports";
import SingleDistrictDetails from "./components/SingleDistrictDetails";
import BlockListing from "./components/BlockDetails";
import BlockDetails from "./components/singleBlockDetails";
import ChatBot from "./components/update-bot/chatBot";
import AIInsights from "./components/AIInsightsTab";
import ScrollToTop from "./components/common/scrollToTop";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { ChatInterface } from "./components/GPT/ChatInterface";
import GoogleSheetEmbed from "./components/dataVisulization";
import Accounting from "./components/Accounting";
import LoginForm from "./components/LoginForm";
import SchemeDataList from "./components/scemeDetails";
import Navigation from "./components/Navigation";
import { useGoogleTranslate } from "./hooks/useGoogleTranslate";
import { applyGoogleTranslateFix } from "./utils/googleTranslateFix";
import "./utils/errorBoundary"; // Import to initialize error boundary

const queryClient = new QueryClient();

const App = () => {
  // Apply the Google Translate DOM fix before initializing Google Translate
  applyGoogleTranslateFix();
  useGoogleTranslate();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />

        <BrowserRouter>
          <Navigation />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="states" element={<StateDetails />} />
            <Route path="districts" element={<DistrictDetails />} />
            <Route path="districts/:district" element={<SingleDistrictDetails />} />
            <Route path="/blocks" element={<BlockListing />} />
            <Route path="/block/:blockId" element={<BlockDetails />} />
            <Route path="villages" element={<VillageDetails />} />
            <Route path="/village/:villageId" element={<VillageDetails />} />
            <Route path="/block/:blockId/village/:villageId" element={<VillageDetails />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="reports" element={<Reports />} />
            <Route path="aiinsights" element={<AIInsights />} />
            <Route path="accounting" element={<Accounting />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="/egramgpt" element={<ChatInterface />} />
            <Route path="/schemes" element={<SchemeDataList />} />
            <Route path="data-visualization" element={<GoogleSheetEmbed />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ConditionalChatBot />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const ConditionalChatBot = () => {
  const location = useLocation();
  return location.pathname !== "/egramgpt" ? <ChatBot /> : null;
};

export default App;
