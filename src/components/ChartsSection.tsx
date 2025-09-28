
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChartsSection = () => {
  const monthlyData = [
    { month: 'Jan', states: 25, districts: 700, villages: 620000 },
    { month: 'Feb', states: 26, districts: 720, villages: 630000 },
    { month: 'Mar', states: 27, districts: 740, villages: 645000 },
    { month: 'Apr', states: 28, districts: 750, villages: 655000 },
    { month: 'May', states: 28, districts: 760, villages: 660000 },
    { month: 'Jun', states: 28, districts: 766, villages: 664369 },
  ];

  const pieData = [
    { name: 'States', value: 28, color: '#3b82f6' },
    { name: 'Districts', value: 766, color: '#10b981' },
    { name: 'Villages', value: Math.floor(664369 / 1000), color: '#f59e0b' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Growth Trends</CardTitle>
          <CardDescription>Administrative unit growth over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="villages" stroke="#f59e0b" strokeWidth={2} name="Villages (K)" />
              <Line type="monotone" dataKey="districts" stroke="#10b981" strokeWidth={2} name="Districts" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Administrative Distribution</CardTitle>
          <CardDescription>Current distribution of administrative units</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSection;
