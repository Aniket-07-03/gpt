
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOut, Settings, User, Shield, Building, Users, Home } from 'lucide-react';

interface HeaderProps {
  user?: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'state_sachiv' | 'district_collector' | 'village_gramsevak';
    state?: string;
    district?: string;
    village?: string;
  } | null;
  onLogout: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  const getRoleConfig = (role: string) => {
    switch (role) {
      case 'admin':
        return { icon: Shield, label: 'System Admin', color: 'bg-red-100 text-red-800' };
      case 'state_sachiv':
        return { icon: Building, label: 'State Sachiv', color: 'bg-blue-100 text-blue-800' };
      case 'district_collector':
        return { icon: Users, label: 'District Collector', color: 'bg-green-100 text-green-800' };
      case 'village_gramsevak':
        return { icon: Home, label: 'Village Gramsevak', color: 'bg-orange-100 text-orange-800' };
      default:
        return { icon: User, label: 'User', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const roleConfig = getRoleConfig(user?.role || '');
  const RoleIcon = roleConfig.icon;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Gov Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Badge variant="outline" className={roleConfig.color}>
            <RoleIcon className="h-3 w-3 mr-1" />
            {roleConfig.label}
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user?.name}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
