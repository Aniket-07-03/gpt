// components/layouts/DashboardLayout.tsx
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { ReactNode, useEffect, useState } from 'react';

interface DashboardLayoutProps {
  onLogout: () => void;
  children: ReactNode;
}

const DashboardLayout = ({  onLogout, children }: DashboardLayoutProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');


  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header user={user} onLogout={onLogout} /> */}
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
