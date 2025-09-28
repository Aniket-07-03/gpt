
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const FundUtilizationSummary = () => {
  const utilizationData = [
    { scheme: 'MGNREGA', totalFund: '₹10 Cr', spent: '₹7 Cr', percentage: 70, pending: '₹3 Cr', gpCoverage: '95 GPs' },
    { scheme: 'Swachh Bharat (SBM)', totalFund: '₹8 Cr', spent: '₹4.4 Cr', percentage: 55, pending: '₹3.6 Cr', gpCoverage: '120 GPs' },
    { scheme: 'PMAY-G', totalFund: '₹15 Cr', spent: '₹12 Cr', percentage: 80, pending: '₹3 Cr', gpCoverage: '85 GPs' },
    { scheme: 'Jal Jeevan Mission', totalFund: '₹12 Cr', spent: '₹8.4 Cr', percentage: 70, pending: '₹3.6 Cr', gpCoverage: '110 GPs' },
  ];

  const getUtilizationIcon = (percentage: number) => {
    if (percentage >= 75) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (percentage >= 50) return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 75) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scheme Utilization Summary</CardTitle>
        <CardDescription>Financial year-wise fund utilization across major schemes</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Scheme</TableHead>
              <TableHead>Total Fund</TableHead>
              <TableHead>Spent</TableHead>
              <TableHead>% Utilized</TableHead>
              <TableHead>Pending</TableHead>
              <TableHead>GP Coverage</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {utilizationData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.scheme}</TableCell>
                <TableCell>{item.totalFund}</TableCell>
                <TableCell>{item.spent}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Progress value={item.percentage} className="w-20" />
                    <span className={`text-sm font-medium ${getUtilizationColor(item.percentage)}`}>
                      {item.percentage}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>{item.pending}</TableCell>
                <TableCell>{item.gpCoverage}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {getUtilizationIcon(item.percentage)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FundUtilizationSummary;
