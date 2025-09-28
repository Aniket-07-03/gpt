import { useState } from "react";
import Login from "@/components/Login";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import StateDetails from "@/components/StateDetails";
import DistrictDetails from "@/components/DistrictDetails";
import BlockDetails from "@/components/BlockDetails";
import VillageDetails from "@/components/VillageDetails";
import Analytics from "@/components/Analytics";
import Reports from "@/components/Reports";

import ChatBot from "@/components/update-bot/chatBot";
import Accounting from "@/components/Accounting";
import AIInsights from "@/components/AIInsightsTab";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "state_sachiv" | "district_collector" | "village_gramsevak";
  state?: string;
  district?: string;
  village?: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  // if (!isAuthenticated) {
  //   return <Login onLogin={handleLogin} />;
  // }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "states":
        return <StateDetails />;
      case "districts":
        return <DistrictDetails />;
      case "blocks":
        return <BlockDetails />;
      case "villages":
        return <VillageDetails />;
      case "analytics":
        return <Analytics />;
      case "aiinsights":
        return <AIInsights />;
      case "accounting":
        return <Accounting />;
      case "reports":
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* <Header user={user} onLogout={handleLogout} /> */}

        <div className="flex">
          {/* <Sidebar activeTab={activeTab} onTabChange={setActiveTab} user={user} /> */}
          <main className="flex-1 overflow-auto">
      
            {renderContent()}
          </main>
        </div>
      </div>
    </>
  );
};

export default Index;
