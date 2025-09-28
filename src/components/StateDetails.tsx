
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const StateDetails = () => {
  const states = [
    { 
      id: '1', 
      name: 'Maharashtra', 
      districts: 36, 
      blocks: 358, 
      villages: 43665, 
      population: 112372972, 
      area: 307713,
      totalFunds: '₹2,850 Cr',
      spentFunds: '₹1,995 Cr',
      utilization: 70,
      unspentBalance: '₹855 Cr'
    },
    { 
      id: '2', 
      name: 'Uttar Pradesh', 
      districts: 75, 
      blocks: 822, 
      villages: 107452, 
      population: 199812341, 
      area: 240928,
      totalFunds: '₹4,200 Cr',
      spentFunds: '₹2,940 Cr',
      utilization: 70,
      unspentBalance: '₹1,260 Cr'
    },
    { 
      id: '3', 
      name: 'Bihar', 
      districts: 38, 
      blocks: 534, 
      villages: 44874, 
      population: 103804637, 
      area: 94163,
      totalFunds: '₹1,850 Cr',
      spentFunds: '₹1,295 Cr',
      utilization: 70,
      unspentBalance: '₹555 Cr'
    },
    { 
      id: '4', 
      name: 'West Bengal', 
      districts: 23, 
      blocks: 341, 
      villages: 40782, 
      population: 91347736, 
      area: 88752,
      totalFunds: '₹1,650 Cr',
      spentFunds: '₹1,155 Cr',
      utilization: 70,
      unspentBalance: '₹495 Cr'
    },
    { 
      id: '5', 
      name: 'Madhya Pradesh', 
      districts: 52, 
      blocks: 313, 
      villages: 55393, 
      population: 72597565, 
      area: 308245,
      totalFunds: '₹2,100 Cr',
      spentFunds: '₹1,470 Cr',
      utilization: 70,
      unspentBalance: '₹630 Cr'
    },
  ];

  const fundUtilizationData = states.map(state => ({
    name: state.name.split(' ')[0], // Short name for chart
    totalFunds: parseInt(state.totalFunds.replace(/[₹,\sCr]/g, '')),
    spentFunds: parseInt(state.spentFunds.replace(/[₹,\sCr]/g, '')),
    unspentBalance: parseInt(state.unspentBalance.replace(/[₹,\sCr]/g, '')),
    utilization: state.utilization
  }));

  const pieData = states.map((state, index) => ({
    name: state.name.split(' ')[0],
    value: parseInt(state.totalFunds.replace(/[₹,\sCr]/g, '')),
    color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index]
  }));

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">States Management & Financial Overview</h1>
        <p className="text-gray-600 mt-1">Comprehensive state-wise administrative and financial insights</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Select defaultValue="2024-25">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Financial Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024-25">FY 2024-25</SelectItem>
            <SelectItem value="2023-24">FY 2023-24</SelectItem>
            <SelectItem value="2022-23">FY 2022-23</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Fund Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Funds</SelectItem>
            <SelectItem value="tied">Tied Funds</SelectItem>
            <SelectItem value="untied">Untied Funds</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* States Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>States Financial Summary</CardTitle>
            <CardDescription>Complete overview of states with financial metrics and administrative data</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>State Name</TableHead>
                  <TableHead>Districts</TableHead>
                  <TableHead>Blocks</TableHead>
                  <TableHead>Villages</TableHead>
                  <TableHead>Total Funds</TableHead>
                  <TableHead>Spent</TableHead>
                  <TableHead>Unspent Balance</TableHead>
                  <TableHead>Utilization %</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {states.map((state) => (
                  <TableRow key={state.id}>
                    <TableCell className="font-medium">{state.name}</TableCell>
                    <TableCell>{state.districts}</TableCell>
                    <TableCell>{state.blocks}</TableCell>
                    <TableCell>{state.villages.toLocaleString()}</TableCell>
                    <TableCell className="font-semibold text-blue-600">{state.totalFunds}</TableCell>
                    <TableCell className="font-semibold text-green-600">{state.spentFunds}</TableCell>
                    <TableCell className="font-semibold text-orange-600">{state.unspentBalance}</TableCell>
                    <TableCell>
                      <Badge variant={state.utilization >= 70 ? 'default' : 'secondary'}>
                        {state.utilization}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Active
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Fund Utilization Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Fund Utilization Comparison</CardTitle>
            <CardDescription>State-wise fund allocation and utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fundUtilizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: any, name: string) => [
                  `₹${value} Cr`, 
                  name === 'totalFunds' ? 'Total Funds' : 
                  name === 'spentFunds' ? 'Spent Funds' : 'Unspent Balance'
                ]} />
                <Bar dataKey="totalFunds" fill="#3b82f6" name="Total Funds" />
                <Bar dataKey="spentFunds" fill="#10b981" name="Spent Funds" />
                <Bar dataKey="unspentBalance" fill="#f59e0b" name="Unspent Balance" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fund Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Total Fund Distribution</CardTitle>
            <CardDescription>State-wise fund allocation breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`₹${value} Cr`, 'Total Funds']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StateDetails;
