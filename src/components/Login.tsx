
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Users, Building, Home } from 'lucide-react';
import { User } from '@/pages/Index';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);

  const roleConfig = {
    admin: { icon: Shield, label: 'System Admin', color: 'text-red-600' },
    state_sachiv: { icon: Building, label: 'State Sachiv', color: 'text-blue-600' },
    district_collector: { icon: Users, label: 'District Collector', color: 'text-green-600' },
    village_gramsevak: { icon: Home, label: 'Village Gramsevak', color: 'text-orange-600' },
  };

  const handleLogin = async () => {
    if (!email || !password || !role) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const user = {
        id: '1',
        name: role === 'admin' ? 'System Administrator' : 
              role === 'state_sachiv' ? 'State Secretary' :
              role === 'district_collector' ? 'District Collector' : 'Gram Sevak',
        email,
        role: role as any,
        state: role !== 'admin' ? 'Uttar Pradesh' : undefined,
        district: role === 'district_collector' || role === 'village_gramsevak' ? 'Lucknow' : undefined,
        village: role === 'village_gramsevak' ? 'Daulatpur' : undefined,
      };
      onLogin(user);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Government Portal</CardTitle>
          <CardDescription>Administrative Dashboard Login</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(roleConfig).map(([key, config]) => {
                  const Icon = config.icon;
                  return (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${config.color}`} />
                        {config.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={handleLogin} 
            className="w-full"
            disabled={!email || !password || !role || loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
