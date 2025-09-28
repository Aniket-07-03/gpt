
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { User } from '@/pages/Index';
import { 
  LayoutDashboard, 
  MapPin, 
  Building, 
  Home, 
  BarChart,
  Users,
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  user?: User | null;
}

const Sidebar = ({ activeTab, onTabChange, user }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'state_sachiv', 'district_collector', 'village_gramsevak'] },
    { id: 'states', label: 'States', icon: MapPin, roles: ['admin', 'state_sachiv'] },
    { id: 'districts', label: 'Districts', icon: Building, roles: ['admin', 'state_sachiv', 'district_collector'] },
    { id: 'villages', label: 'Villages', icon: Home, roles: ['admin', 'state_sachiv', 'district_collector', 'village_gramsevak'] },
    { id: 'analytics', label: 'Analytics', icon: BarChart, roles: ['admin', 'state_sachiv', 'district_collector'] },
    { id: 'users', label: 'Users', icon: Users, roles: ['admin', 'state_sachiv'] },
    { id: 'reports', label: 'Reports', icon: FileText, roles: ['admin', 'state_sachiv', 'district_collector', 'village_gramsevak'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin', 'state_sachiv', 'district_collector', 'village_gramsevak'] },
  ];

  const filteredItems = menuItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto flex"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                collapsed ? "px-2" : "px-3",
                isActive && "bg-blue-600 text-white hover:bg-blue-700"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className={cn("h-4 w-4", !collapsed && "mr-2")} />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
