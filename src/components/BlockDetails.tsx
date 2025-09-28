
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Eye, TrendingUp, AlertTriangle, CheckCircle, Download, Filter, BarChart3, PieChart as PieChartIcon, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import Navigation from "./Navigation";
import { useState } from "react";
import FilterConfirmation from "./filterConfirmation";

const BlockListing = () => {
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState("kolhapur");

  // ... keep existing code (blockFinancialData array, chartData, performanceData, trendData, COLORS, aiInsights arrays) the same

  const blockFinancialData = [
    {
      id: "1",
      blockName: "Karvir",
      district: "Kolhapur",
      state: "Maharashtra",
      gramPanchayats: 45,
      totalFunds: "₹15,50,000",
      spentFunds: "₹12,40,000",
      unspentBalance: "₹3,10,000",
      utilization: 80,
      activeSchemes: "MGNREGA, SBM, PMAY-G",
    },
    {
      id: "2",
      blockName: "Hatkanangle",
      district: "Kolhapur",
      state: "Maharashtra",
      gramPanchayats: 38,
      totalFunds: "₹12,80,000",
      spentFunds: "₹8,96,000",
      unspentBalance: "₹3,84,000",
      utilization: 70,
      activeSchemes: "JJM, SBM",
    },
    {
      id: "3",
      blockName: "Radhanagari",
      district: "Kolhapur",
      state: "Maharashtra",
      gramPanchayats: 52,
      totalFunds: "₹18,20,000",
      spentFunds: "₹14,56,000",
      unspentBalance: "₹3,64,000",
      utilization: 80,
      activeSchemes: "MGNREGA, PMAY-G, JJM",
    },
    {
      id: "4",
      blockName: "Shirol",
      district: "Kolhapur",
      state: "Maharashtra",
      gramPanchayats: 41,
      totalFunds: "₹14,70,000",
      spentFunds: "₹10,29,000",
      unspentBalance: "₹4,41,000",
      utilization: 70,
      activeSchemes: "SBM, JJM",
    },
    {
      id: "5",
      blockName: "Panhala",
      district: "Kolhapur",
      state: "Maharashtra",
      gramPanchayats: 35,
      totalFunds: "₹11,90,000",
      spentFunds: "₹9,52,000",
      unspentBalance: "₹2,38,000",
      utilization: 80,
      activeSchemes: "MGNREGA, SBM",
    },
  ];

  const chartData = blockFinancialData.map((block) => ({
    name: block.blockName,
    totalFunds: parseInt(block.totalFunds.replace(/[₹,]/g, "")),
    spentFunds: parseInt(block.spentFunds.replace(/[₹,]/g, "")),
    unspentBalance: parseInt(block.unspentBalance.replace(/[₹,]/g, "")),
    utilization: block.utilization,
    gramPanchayats: block.gramPanchayats,
  }));

  const performanceData = [
    { category: "High Performance (≥75%)", count: 3, percentage: 60 },
    { category: "Average Performance (60-74%)", count: 2, percentage: 40 },
    { category: "Low Performance (<60%)", count: 0, percentage: 0 },
  ];

  const trendData = [
    { month: "Apr 2024", utilization: 65, target: 75 },
    { month: "May 2024", utilization: 68, target: 75 },
    { month: "Jun 2024", utilization: 72, target: 75 },
    { month: "Jul 2024", utilization: 74, target: 75 },
    { month: "Aug 2024", utilization: 76, target: 75 },
    { month: "Sep 2024", utilization: 76, target: 75 },
  ];

  const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

  const aiInsights = [
    {
      type: "success",
      icon: CheckCircle,
      title: "Strong Performance",
      description: "3 out of 5 blocks (60%) are achieving high utilization rates above 75%",
      action: "Share best practices from Karvir, Radhanagari, and Panhala with underperforming blocks"
    },
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Underutilization Alert",
      description: "Hatkanangle and Shirol blocks have 70% utilization with ₹8.25L total unspent funds",
      action: "Immediate intervention needed to accelerate spending in these blocks"
    },
    {
      type: "trend",
      icon: TrendingUp,
      title: "Positive Trend",
      description: "Average utilization improved from 65% to 76% over the last 6 months",
      action: "Continue current strategies and monitor quarterly progress"
    }
  ];

  const handleViewDetails = (blockId: string) => {
    navigate(`/block/${blockId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* <Navigation /> */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Block Financial Dashboard
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Comprehensive overview of fund allocation and utilization across all blocks in {selectedDistrict.charAt(0).toUpperCase() + selectedDistrict.slice(1)} district
              </p>
            </div>
            
            {/* Enhanced Filter Section */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Filter className="h-4 w-4" />
                <span>Filter by:</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger className="w-48 bg-white border-gray-200 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50 border shadow-lg rounded-md">
                    <SelectItem value="kolhapur">Kolhapur</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="nagpur">Nagpur</SelectItem>
                    <SelectItem value="nashik">Nashik</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-md hover:shadow-lg transition-all duration-200">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Key Metrics Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-700">Total Blocks</p>
                  <p className="text-3xl font-bold text-blue-900">5</p>
                  <p className="text-xs text-blue-600">Active monitoring</p>
                </div>
                <div className="p-3 bg-blue-200 rounded-full group-hover:scale-110 transition-transform duration-200">
                  <BarChart3 className="h-6 w-6 text-blue-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-green-700">Gram Panchayats</p>
                  <p className="text-3xl font-bold text-green-900">211</p>
                  <p className="text-xs text-green-600">Under supervision</p>
                </div>
                <div className="p-3 bg-green-200 rounded-full group-hover:scale-110 transition-transform duration-200">
                  <Activity className="h-6 w-6 text-green-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-purple-700">Avg Utilization</p>
                  <p className="text-3xl font-bold text-purple-900">76%</p>
                  <p className="text-xs text-purple-600">Above target</p>
                </div>
                <div className="p-3 bg-purple-200 rounded-full group-hover:scale-110 transition-transform duration-200">
                  <TrendingUp className="h-6 w-6 text-purple-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-orange-700">Unspent Balance</p>
                  <p className="text-3xl font-bold text-orange-900">₹17.37L</p>
                  <p className="text-xs text-orange-600">Requires attention</p>
                </div>
                <div className="p-3 bg-orange-200 rounded-full group-hover:scale-110 transition-transform duration-200">
                  <AlertTriangle className="h-6 w-6 text-orange-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Block Financial Summary Table */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Eye className="h-6 w-6 text-blue-600" />
                  Block-wise Financial Summary
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Detailed breakdown of fund allocation and utilization across all blocks
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow className="hover:bg-gray-50">
                    <TableHead className="font-semibold text-gray-900">Block Name</TableHead>
                    <TableHead className="font-semibold text-gray-900">District</TableHead>
                    <TableHead className="font-semibold text-gray-900">Gram Panchayats</TableHead>
                    <TableHead className="font-semibold text-gray-900">Total Funds</TableHead>
                    <TableHead className="font-semibold text-gray-900">Utilization</TableHead>
                    <TableHead className="font-semibold text-gray-900">Performance</TableHead>
                    <TableHead className="font-semibold text-gray-900">Active Schemes</TableHead>
                    <TableHead className="font-semibold text-gray-900">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blockFinancialData.map((block, index) => (
                    <TableRow key={block.id} className="hover:bg-blue-50/50 transition-colors duration-200">
                      <TableCell className="font-semibold text-gray-900">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          {block.blockName}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700">{block.district}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {block.gramPanchayats} GPs
                        </span>
                      </TableCell>
                      <TableCell className="font-bold text-blue-700 text-lg">
                        {block.totalFunds}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={block.utilization >= 75 ? "default" : "secondary"}
                          className={`${
                            block.utilization >= 75
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-yellow-100 text-yellow-800 border-yellow-200"
                          } font-semibold px-3 py-1`}
                        >
                          {block.utilization}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${
                            block.utilization >= 75
                              ? "bg-green-50 text-green-700 border-green-300"
                              : "bg-yellow-50 text-yellow-700 border-yellow-300"
                          } font-medium`}
                        >
                          {block.utilization >= 75 ? "High" : "Average"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 max-w-40">
                        <div className="truncate" title={block.activeSchemes}>
                          {block.activeSchemes}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(block.id)}
                          className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Fund Utilization Analysis
              </CardTitle>
              <CardDescription className="text-gray-600">
                Comparative analysis of total vs utilized funds (₹ in Lakhs)
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={11}
                    stroke="#666"
                  />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    formatter={(value: any, name: string) => [
                      `₹${(value / 100000).toFixed(1)}L`,
                      name === "totalFunds" ? "Total Funds" : 
                      name === "spentFunds" ? "Spent Funds" : "Unspent Balance"
                    ]}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="totalFunds" fill="#3b82f6" name="Total Funds" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="spentFunds" fill="#10b981" name="Spent Funds" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="unspentBalance" fill="#f59e0b" name="Unspent Balance" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-green-600" />
                Performance Distribution
              </CardTitle>
              <CardDescription className="text-gray-600">
                Block categorization based on utilization efficiency
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ category, percentage }) => `${percentage}%`}
                    labelLine={false}
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [`${value} blocks`, "Count"]}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-6 space-y-3">
                {performanceData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full shadow-sm"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    </div>
                    <span className="font-bold text-gray-900">{item.count} blocks</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Utilization Trend Chart */}
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600" />
              Utilization Trend Analysis
            </CardTitle>
            <CardDescription className="text-gray-600">
              Monthly progress tracking against 75% utilization target
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis domain={[60, 80]} stroke="#666" />
                <Tooltip 
                  formatter={(value: any, name: string) => [
                    `${value}%`,
                    name === "utilization" ? "Actual Utilization" : "Target"
                  ]}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="utilization" 
                  stroke="#10b981" 
                  fill="url(#colorUtilization)"
                  strokeWidth={3}
                  name="Actual Utilization"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#ef4444" 
                  strokeDasharray="8 8"
                  strokeWidth={2}
                  name="Target"
                />
                <defs>
                  <linearGradient id="colorUtilization" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Enhanced AI Insights Section */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-t-lg border-b">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              AI-Powered Insights & Recommendations
            </CardTitle>
            <CardDescription className="text-gray-600 text-base">
              Advanced analytics with actionable intelligence for optimal fund management
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {aiInsights.map((insight, index) => {
                const IconComponent = insight.icon;
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-xl border-l-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                      insight.type === "success"
                        ? "border-green-500 bg-gradient-to-br from-green-50 to-green-100/50"
                        : insight.type === "warning"
                        ? "border-yellow-500 bg-gradient-to-br from-yellow-50 to-yellow-100/50"
                        : "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100/50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${
                        insight.type === "success"
                          ? "bg-green-200"
                          : insight.type === "warning"
                          ? "bg-yellow-200"
                          : "bg-blue-200"
                      }`}>
                        <IconComponent
                          className={`h-6 w-6 ${
                            insight.type === "success"
                              ? "text-green-700"
                              : insight.type === "warning"
                              ? "text-yellow-700"
                              : "text-blue-700"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2 text-lg">
                          {insight.title}
                        </h4>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {insight.description}
                        </p>
                        <div className="p-3 bg-white/70 rounded-lg border border-gray-200">
                          <p className="text-sm font-semibold text-gray-800">
                            <span className="text-gray-600">Recommendation:</span> {insight.action}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      <FilterConfirmation
          open={true}
          onOpenChange={()=>navigate("/")}
          onConfirm={()=>console.log('first')}
          isVillage={false}
        />
    </div>
  );
};

export default BlockListing;
