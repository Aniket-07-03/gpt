
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Building, Home, Users } from 'lucide-react';

const MetricsCards = () => {
  // Static data for demo purposes
  const stateCount = 28;
  const districtCount = 766;
  const villageCount = 664369;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total States</CardTitle>
          <MapPin className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-black">{stateCount}</div>
          <p className="text-xs text-gray-600 mt-1">Administrative units</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Districts</CardTitle>
          <Building className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-black">{districtCount}</div>
          <p className="text-xs text-gray-600 mt-1">District divisions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Villages</CardTitle>
          <Home className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{villageCount.toLocaleString()}</div>
          <p className="text-xs text-gray-600 mt-1">Rural settlements</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
          <Users className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">12,847</div>
          <p className="text-xs text-gray-600 mt-1">System users</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsCards;
