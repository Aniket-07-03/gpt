
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const AIInsights = () => {
  const aiInsights = [
    {
      title: "Rural Development Progress",
      description: "Digital infrastructure adoption increased",
      trend: 'up' as const,
      percentage: 12.5
    },
    {
      title: "Administrative Efficiency",
      description: "Average response time improved",
      trend: 'up' as const,
      percentage: 8.3
    },
    {
      title: "Resource Allocation",
      description: "Budget utilization optimized",
      trend: 'stable' as const,
      percentage: 2.1
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'stable': return <Minus className="h-4 w-4 text-gray-600" />;
      default: return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendPrefix = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return '+';
      case 'down': return '-';
      case 'stable': return '';
      default: return '';
    }
  };

  return (
    <Card className='max-w-7xl mx-auto mb-8'>
      <CardHeader>
        <CardTitle>AI Insights & Analytics</CardTitle>
        <CardDescription>Automated insights and trend analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiInsights.map((insight, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">{insight.title}</h4>
                {getTrendIcon(insight.trend)}
              </div>
              <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
              <div className="flex items-center">
                <span className={`text-sm font-medium ${getTrendColor(insight.trend)}`}>
                  {getTrendPrefix(insight.trend)}{insight.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsights;
