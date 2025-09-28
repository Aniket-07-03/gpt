//@ts-nocheck
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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
import {
  Bar as ChratjsBar,
  Doughnut,
  Line as ChartjsLine,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

import {
  TrendingUp,
  MapPin,
  Building2,
  Home,
  Calendar,
  DollarSign,
  Brain,
  Filter,
  Download,
  CheckCircle,
  AlertTriangle,
  Users,
  Target,
  Clock,
  IndianRupee,
} from "lucide-react";

import {
  blocks,
  districts,
  financialYears,
  villages,
} from "@/lib/aiSightsFIlterTab";
import SidebarFilter from "./SidebatFilter";
import { mockDistrictData } from "./DistrictDetails";
import Navigation from "./Navigation";
const blockPerformanceData = [
  {
    blockName: "Maval",
    schemes: 6,
    totalFunds: 370682408.22,
    utilized: 118905206.28,
    utilization: 32.07,
  },
  {
    blockName: "Mulshi",
    schemes: 4,
    totalFunds: 290784600.35,
    utilized: 59456920.07,
    utilization: 20.44,
  },
  {
    blockName: "Bhor",
    schemes: 5,
    totalFunds: 312459800,
    utilized: 62491960,
    utilization: 20.0,
  },
  {
    blockName: "Haveli",
    schemes: 7,
    totalFunds: 400000000,
    utilized: 180000000,
    utilization: 45.0,
  },
  {
    blockName: "Junnar",
    schemes: 5,
    totalFunds: 350980000,
    utilized: 87745000,
    utilization: 25.0,
  },
  {
    blockName: "Ambegaon",
    schemes: 4,
    totalFunds: 315600000,
    utilized: 63120000,
    utilization: 20.0,
  },
  {
    blockName: "Baramati",
    schemes: 6,
    totalFunds: 385000000,
    utilized: 192500000,
    utilization: 50.0,
  },
  {
    blockName: "Indapur",
    schemes: 5,
    totalFunds: 342678000,
    utilized: 68535600,
    utilization: 20.0,
  },
  {
    blockName: "Purandar",
    schemes: 4,
    totalFunds: 278000000,
    utilized: 55600000,
    utilization: 20.0,
  },
  {
    blockName: "Shirur",
    schemes: 5,
    totalFunds: 320000000,
    utilized: 64000000,
    utilization: 20.0,
  },
  {
    blockName: "Khed",
    schemes: 5,
    totalFunds: 360000000,
    utilized: 72000000,
    utilization: 20.0,
  },
  {
    blockName: "Daund",
    schemes: 6,
    totalFunds: 305000000,
    utilized: 152500000,
    utilization: 50.0,
  },
  {
    blockName: "Velhe",
    schemes: 3,
    totalFunds: 250000000,
    utilized: 25000000,
    utilization: 10.0,
  },
];
const aiBlockInsights = [
  {
    type: "success",
    icon: CheckCircle,
    title: "Strong Performance",
    description:
      "3 out of 5 blocks (60%) are achieving high utilization rates above 75%",
    action:
      "Share best practices from Karvir, Radhanagari, and Panhala with underperforming blocks",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    title: "Underutilization Alert",
    description:
      "Hatkanangle and Shirol blocks have 70% utilization with ₹8.25L total unspent funds",
    action:
      "Immediate intervention needed to accelerate spending in these blocks",
  },
  {
    type: "trend",
    icon: TrendingUp,
    title: "Positive Trend",
    description:
      "Average utilization improved from 65% to 76% over the last 6 months",
    action: "Continue current strategies and monitor quarterly progress",
  },
];
const AIInsights = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>({});

  const getFilterGroups = () => {
    const selectedDistrict = appliedFilters.district;
    const selectedBlock = appliedFilters.block;

    return [
      {
        id: "financialYear",
        title: "Financial Year",
        icon: Calendar,
        type: "select" as const,
        options: financialYears,
        placeholder: "Select Financial Year",
      },
      {
        id: "district",
        title: "District",
        icon: MapPin,
        type: "select" as const,
        options: districts,
        placeholder: "Select District",
      },
      {
        id: "block",
        title: "Block",
        icon: Building2,
        type: "select" as const,
        options:
          selectedDistrict && blocks[selectedDistrict as keyof typeof blocks]
            ? blocks[selectedDistrict as keyof typeof blocks]
            : [],
        placeholder: "Select Block",
        disabled: !selectedDistrict,
      },
      {
        id: "village",
        title: "Village",
        icon: Home,
        type: "select" as const,
        options:
          selectedBlock && villages[selectedBlock as keyof typeof villages]
            ? villages[selectedBlock as keyof typeof villages]
            : [],
        placeholder: "Select Village",
        disabled: !selectedBlock,
      },
    ];
  };

  const rawSchemeData = [
    {
      name: "Rural Development",
      allocated: 2500000,
      spent: 2100000,
      beneficiaries: 1250,
      scheme: "rural",
    },
    {
      name: "Education",
      allocated: 1800000,
      spent: 1650000,
      beneficiaries: 890,
      scheme: "education",
    },
    {
      name: "Healthcare",
      allocated: 2200000,
      spent: 1900000,
      beneficiaries: 750,
      scheme: "healthcare",
    },
    {
      name: "Infrastructure",
      allocated: 3100000,
      spent: 2800000,
      beneficiaries: 450,
      scheme: "infrastructure",
    },
  ];

  const yearlyTrends = [
    { year: "2020", budget: 15000000, spent: 12500000, schemes: 45 },
    { year: "2021", budget: 17200000, spent: 14800000, schemes: 52 },
    { year: "2022", budget: 19500000, spent: 16200000, schemes: 58 },
    { year: "2023", budget: 21800000, spent: 18900000, schemes: 65 },
    { year: "2024", budget: 24100000, spent: 20100000, schemes: 72 },
  ];

  const unspentBalanceData = [
    { category: "Education", unspent: 150000 },
    { category: "Healthcare", unspent: 300000 },
    { category: "Rural Dev", unspent: 400000 },
    { category: "Infrastructure", unspent: 300000 },
    { category: "Social Welfare", unspent: 200000 },
  ];

  const villageStats = {
    total: 176,
    covered: 142,
    pending: 34,
    avgBeneficiaries: 28,
  };

  const villageStatusData = [
    { name: "Completed", value: 95, count: 95 },
    { name: "In Progress", value: 47, count: 47 },
    { name: "Pending", value: 34, count: 34 },
  ];

  const villageBeneficiaryData = [
    { range: "0-10", villages: 12 },
    { range: "11-20", villages: 28 },
    { range: "21-30", villages: 45 },
    { range: "31-40", villages: 38 },
    { range: "41-50", villages: 32 },
    { range: "50+", villages: 21 },
  ];

  const villageSchemeDistribution = [
    { scheme: "Rural Dev", villages: 89, percentage: 51 },
    { scheme: "Education", villages: 67, percentage: 38 },
    { scheme: "Healthcare", villages: 45, percentage: 26 },
    { scheme: "Infrastructure", villages: 78, percentage: 44 },
    { scheme: "Social Welfare", villages: 34, percentage: 19 },
  ];

  const villageMonthlyProgress = [
    { month: "Jan", completed: 8, started: 12 },
    { month: "Feb", completed: 12, started: 15 },
    { month: "Mar", completed: 15, started: 18 },
    { month: "Apr", completed: 18, started: 14 },
    { month: "May", completed: 22, started: 16 },
    { month: "Jun", completed: 20, started: 13 },
  ];

  const COLORS = ["#667eea", "#f093fb", "#4facfe", "#43e97b", "#fa709a"];

  const handleFilterChange = (groupId: string, value: any) => {
    setAppliedFilters((prev) => ({
      ...prev,
      [groupId]: value,
    }));
  };

  const handleClearAllFilters = () => {
    setAppliedFilters({});
  };

  const filteredData = useMemo(() => {
    let filteredSchemes = rawSchemeData;
    let filteredDistricts = districts;
    let filteredBlocks = blocks;
    let filteredVillages = villages;

    if (appliedFilters.financialYear) {
      filteredSchemes = filteredSchemes.filter(
        (scheme: any) => scheme.year === appliedFilters.financialYear
      );
    }

    if (appliedFilters.district) {
      filteredDistricts = [appliedFilters.district];
      filteredBlocks = blocks[appliedFilters.district] || [];
    }

    if (appliedFilters.block) {
      //@ts-ignore
      filteredBlocks = [appliedFilters.block];
      filteredVillages = villages[appliedFilters.block] || [];
    }

    if (appliedFilters.village) {
      //@ts-ignore
      filteredVillages = [appliedFilters.village];
    }

    return {
      schemes: filteredSchemes,
      districts: filteredDistricts,
      blocks: filteredBlocks,
      villages: filteredVillages,
    };
  }, [appliedFilters]);
  const chartData =
    appliedFilters.district && appliedFilters.district !== ""
      ? mockDistrictData
          .filter((dist) => dist.name.toLowerCase() === appliedFilters.district)
          .map((district) => ({
            name: district.name,
            received: district.totalAvailable / 10000000,
            spent: district.paymentAmount / 10000000,
            utilization: district.utilizationPercentage,
          }))
      : mockDistrictData.map((district) => ({
          name: district.name,
          received: district.totalAvailable / 10000000,
          spent: district.paymentAmount / 10000000,
          utilization: district.utilizationPercentage,
        }));
  const monthlyUtilizationData = [
    { month: "Apr", utilization: 45, target: 60 },
    { month: "May", utilization: 52, target: 65 },
    { month: "Jun", utilization: 48, target: 70 },
    { month: "Jul", utilization: 63, target: 75 },
    { month: "Aug", utilization: 71, target: 80 },
    { month: "Sep", utilization: 75, target: 80 },
    { month: "Oct", utilization: 78, target: 85 },
    { month: "Nov", utilization: 80, target: 85 },
  ];
  const filterBlockScheme =
    appliedFilters.block && appliedFilters.block !== ""
      ? blockPerformanceData.filter(
          (blc) => blc.blockName.toLowerCase() === appliedFilters.block
        )
      : blockPerformanceData;
  const aiDistInsights = [
    {
      title: "Top Performer",
      description:
        "Pune district shows excellent fund utilization at 80% with efficient expenditure patterns.",
      action: "Use as best practice model",
      type: "success",
      icon: CheckCircle,
    },
    {
      title: "Improvement Needed",
      description:
        "Aurangabad district has lower utilization at 68%. Requires strategic intervention.",
      action: "Schedule review meeting",
      type: "warning",
      icon: AlertTriangle,
    },
    {
      title: "Trend Analysis",
      description:
        "Overall state utilization is above national average with positive growth trajectory.",
      action: "Continue monitoring",
      type: "trend",
      icon: TrendingUp,
    },
  ];
  console.log(appliedFilters, "appliedFilters");
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* <Navigation /> */}

      <div className="max-w-7xl flex flex-row gap-12 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="">
          <SidebarFilter
            filterGroups={getFilterGroups()}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAllFilters}
            appliedFilters={appliedFilters}
          />
        </div>
        <div>
          <div className="text-left mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative">
              <div className="flex items-center gap-6">
                <div className="flex items-center justify-left mb-6">
                  <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl shadow-orange-500/25">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  AI Insights Dashboard
                </h1>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed">
                Comprehensive analytics and AI-powered insights for
                administrative data
              </p>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filter */}

            {/* Main Content */}
            <div className="flex-1 space-y-8">
              {/* Quick Actions */}
              {/* <div className="flex justify-end items-center">

              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 rounded-xl gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div> */}

              {/* Districts Performance - Now using filtered data */}
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                <Card className="lg:col-span-2 bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-blue-500/10 rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100/50">
                    <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      District Performance
                      {appliedFilters.district &&
                        appliedFilters.district.length > 0 && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            {appliedFilters.district.length} selected
                          </Badge>
                        )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={chartData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(0,0,0,0.1)"
                        />
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          height={100}
                          fontSize={12}
                          stroke="#6B7280"
                        />
                        <YAxis stroke="#6B7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0,0,0,0.9)",
                            border: "none",
                            borderRadius: "12px",
                            color: "white",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                          formatter={(value: any, name: string) => [
                            `₹${value} Cr`,
                            name === "received" ? "Available" : "Utilized",
                          ]}
                        />
                        <Bar
                          dataKey="received"
                          fill="#3B82F6"
                          name="received"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="spent"
                          fill="#10B981"
                          name="spent"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2 bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-purple-500/10 rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100/50">
                    <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      Districts AI Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 flex flex-col gap-6">
                    {aiDistInsights.map((insight, index) => {
                      const IconComponent = insight.icon;
                      return (
                        <div
                          key={index}
                          className={`p-6 rounded-2xl border-l-4 shadow-lg hover:shadow-xl transition-all duration-300 ${
                            insight.type === "success"
                              ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50"
                              : insight.type === "warning"
                              ? "border-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50"
                              : "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`p-3 rounded-xl shadow-lg ${
                                insight.type === "success"
                                  ? "bg-gradient-to-br from-green-500 to-emerald-600"
                                  : insight.type === "warning"
                                  ? "bg-gradient-to-br from-yellow-500 to-orange-600"
                                  : "bg-gradient-to-br from-purple-500 to-pink-600"
                              }`}
                            >
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 mb-2 text-lg">
                                {insight.title}
                              </h4>
                              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                                {insight.description}
                              </p>
                              <p className="text-sm font-semibold max-w-fit text-gray-800 bg-white/60 px-3 py-1 rounded-lg">
                                Action: {insight.action}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* Blocks Section with filtered data */}
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                <Card className="lg:col-span-2 bg-white/80 w-full backdrop-blur-lg border-0 shadow-2xl shadow-green-500/10 rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100/50">
                    <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                      Block Completion Status
                      {appliedFilters.blocks &&
                        appliedFilters.blocks.length > 0 && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            {appliedFilters.blocks.length} selected
                          </Badge>
                        )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChratjsBar
                      data={{
                        labels: filterBlockScheme.map((d) => d.blockName),
                        datasets: [
                          {
                            label: "Total Funds",
                            data: filterBlockScheme.map((d) => d.totalFunds),
                            backgroundColor: ["#667eea"],
                            borderRadius: 12,
                            borderSkipped: false,
                            borderWidth: 0,
                          },
                          {
                            label: "Utilized",
                            data: filterBlockScheme.map((d) => d.utilized),
                            backgroundColor: ["#10b981"],
                            borderRadius: 12,
                            borderSkipped: false,
                            borderWidth: 0,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: "top",
                            labels: {
                              usePointStyle: true,
                              padding: 25,
                              font: { size: 14, weight: "bold" },
                              color: "#374151",
                            },
                          },
                          tooltip: {
                            backgroundColor: "rgba(0,0,0,0.9)",
                            titleFont: { size: 16, weight: "bold" },
                            bodyFont: { size: 14 },
                            padding: 16,
                            cornerRadius: 12,
                            displayColors: false,
                            callbacks: {
                              label: (context) =>
                                `${context.dataset.label}: ₹${context.parsed.y} Lakhs`,
                            },
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            grid: {
                              color: "rgba(0,0,0,0.05)",
                            },
                            ticks: {
                              font: { size: 12, weight: "normal" },
                              color: "#6B7280",
                            },
                          },
                          x: {
                            grid: { display: false },
                            ticks: {
                              font: { size: 12, weight: "normal" },
                              color: "#6B7280",
                              maxRotation: 45,
                            },
                          },
                        },
                      }}
                    />
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2 bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-purple-500/10 rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100/50">
                    <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      Block Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 flex flex-col gap-6">
                    {aiBlockInsights.map((insight, index) => {
                      const IconComponent = insight.icon;
                      return (
                        <div
                          key={index}
                          className={`p-6 rounded-2xl border-l-4 shadow-lg hover:shadow-xl transition-all duration-300 ${
                            insight.type === "success"
                              ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50"
                              : insight.type === "warning"
                              ? "border-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50"
                              : "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`p-3 rounded-xl shadow-lg ${
                                insight.type === "success"
                                  ? "bg-gradient-to-br from-green-500 to-emerald-600"
                                  : insight.type === "warning"
                                  ? "bg-gradient-to-br from-yellow-500 to-orange-600"
                                  : "bg-gradient-to-br from-purple-500 to-pink-600"
                              }`}
                            >
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 mb-2 text-lg">
                                {insight.title}
                              </h4>
                              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                                {insight.description}
                              </p>
                              <p className="text-sm font-semibold max-w-fit text-gray-800 bg-white/60 px-3 py-1 rounded-lg">
                                Action: {insight.action}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
              {/* AI Summary */}
              <Card className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-lg border-0 shadow-2xl shadow-blue-500/10 rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-100/50 to-purple-100/50 border-b border-blue-200/50">
                  <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-xl">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    AI-Generated Summary Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Key Findings (Filtered Data)
                      </h4>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>
                            Currently viewing {filteredData.districts.length}{" "}
                            districts, {filteredData.blocks.length} blocks,{" "}
                            {filteredData.schemes.length} schemes
                          </span>
                        </li>
                        <li className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>
                            {filteredData.districts.length > 0
                              ? `Average budget utilization: ${Math.round(
                                  filteredData.districts.reduce(
                                    //@ts-ignore
                                    (acc, d) =>
                                      acc + (d.spent / d.budget) * 100,
                                    0
                                  ) / filteredData.districts.length
                                )}%`
                              : "No district data available with current filters"}
                          </span>
                        </li>
                        <li className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>
                            Filter configuration affects all dashboard
                            visualizations
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        Recommendations
                      </h4>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>
                            Use filters to focus on specific regions or schemes
                            for detailed analysis
                          </span>
                        </li>
                        <li className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>
                            Clear filters to see comprehensive overview of all
                            data
                          </span>
                        </li>
                        <li className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>
                            Export filtered reports for targeted interventions
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
