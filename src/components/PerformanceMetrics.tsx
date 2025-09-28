
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PerformanceMetrics = () => {
  const monthlyData = [
    { month: 'Jan', states: 25, districts: 700, villages: 620000 },
    { month: 'Feb', states: 26, districts: 720, villages: 630000 },
    { month: 'Mar', states: 27, districts: 740, villages: 645000 },
    { month: 'Apr', states: 28, districts: 750, villages: 655000 },
    { month: 'May', states: 28, districts: 760, villages: 660000 },
    { month: 'Jun', states: 28, districts: 766, villages: 664369 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>Administrative efficiency and resource allocation</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="states" fill="#3b82f6" name="States" />
            <Bar dataKey="districts" fill="#10b981" name="Districts" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
