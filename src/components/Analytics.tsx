
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navigation from './Navigation';

const Analytics = () => {
  const performanceData = [
    { month: 'Jan', efficiency: 85, satisfaction: 78, response_time: 2.5 },
    { month: 'Feb', efficiency: 88, satisfaction: 82, response_time: 2.2 },
    { month: 'Mar', efficiency: 90, satisfaction: 85, response_time: 2.0 },
    { month: 'Apr', efficiency: 87, satisfaction: 80, response_time: 2.3 },
    { month: 'May', efficiency: 92, satisfaction: 88, response_time: 1.8 },
    { month: 'Jun', efficiency: 95, satisfaction: 91, response_time: 1.5 },
  ];

  const resourceData = [
    { category: 'Infrastructure', allocated: 120, utilized: 95 },
    { category: 'Healthcare', allocated: 80, utilized: 72 },
    { category: 'Education', allocated: 150, utilized: 138 },
    { category: 'Agriculture', allocated: 200, utilized: 185 },
    { category: 'Technology', allocated: 90, utilized: 88 },
  ];

  return (
    <>
      {/* <Navigation /> */}

    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
        <p className="text-gray-600 mt-1">Comprehensive analytics and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Administrative efficiency and satisfaction metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="efficiency" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="satisfaction" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Time Analysis</CardTitle>
            <CardDescription>Average response time in hours</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="response_time" stroke="#f59e0b" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Resource Allocation vs Utilization</CardTitle>
            <CardDescription>Budget allocation and actual utilization across different sectors</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resourceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="allocated" fill="#3b82f6" name="Allocated (Cr)" />
                <Bar dataKey="utilized" fill="#10b981" name="Utilized (Cr)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
};

export default Analytics;
