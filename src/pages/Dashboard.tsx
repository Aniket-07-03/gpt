// pages/dashboard.tsx
import { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Dashboard from '@/components/Dashboard';
import StateDetails from '@/components/StateDetails';
import DistrictDetails from '@/components/DistrictDetails';
import BlockDetails from '@/components/BlockDetails';
import VillageDetails from '@/components/VillageDetails';
import Analytics from '@/components/Analytics';
import Reports from '@/components/Reports';
import { useNavigate } from 'react-router-dom';


const DashboardPage = () => {
  const [user, setUser] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useNavigate();

  const handleLogout = () => {
    setUser(null);
    router('/'); // redirect to login or home page
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'states': return <StateDetails />;
      case 'districts': return <DistrictDetails />;
      case 'blocks': return <BlockDetails />;
      case 'villages': return <VillageDetails />;
      case 'analytics': return <Analytics />;
      case 'reports': return <Reports />;
      default: return <Dashboard />;
    }
  };

  return (
    <DashboardLayout onLogout={handleLogout}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default DashboardPage;
