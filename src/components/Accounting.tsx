import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Target,
  Download,
  Brain,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
} from "lucide-react";

import { blocks, districts, villages } from "@/lib/aiSightsFIlterTab";
import { summaryData } from "@/lib/districtData";
import FundUtilizationSummary from "./FundsSummary";
import BalanceSheetWithFilters from "./BalanceSheet";

// Sample data

const balanceSheetData = [
  {
    gp: "Shiroli",
    ob: "₹5,00,000",
    receipts: "₹2,00,000",
    expenditure: "₹1,20,000",
    cb: "₹5,80,000",
    updated: "15-Jun-2025",
    obNum: 500000,
    receiptsNum: 200000,
    expenditureNum: 120000,
    cbNum: 580000,
  },
  {
    gp: "Vadgaon",
    ob: "₹3,20,000",
    receipts: "₹1,80,000",
    expenditure: "₹95,000",
    cb: "₹4,05,000",
    updated: "12-Jun-2025",
    obNum: 320000,
    receiptsNum: 180000,
    expenditureNum: 95000,
    cbNum: 405000,
  },
];

const schemeUtilizationData = [
  {
    scheme: "XV Finance",
    total: "₹8 Cr",
    spent: "₹6.4 Cr",
    utilized: 80,
    pending: "₹1.6 Cr",
    gpCoverage: "78 GPs",
    totalNum: 80000000,
    spentNum: 64000000,
    pendingNum: 16000000,
  },
  {
    scheme: "MGNREGA",
    total: "₹10 Cr",
    spent: "₹7 Cr",
    utilized: 70,
    pending: "₹3 Cr",
    gpCoverage: "95 GPs",
    totalNum: 100000000,
    spentNum: 70000000,
    pendingNum: 30000000,
  },
  {
    scheme: "PMAY-G",
    total: "₹8 Cr",
    spent: "₹6.4 Cr",
    utilized: 80,
    pending: "₹1.6 Cr",
    gpCoverage: "78 GPs",
    totalNum: 80000000,
    spentNum: 64000000,
    pendingNum: 16000000,
  },
  {
    scheme: "SBM",
    total: "₹5 Cr",
    spent: "₹2.5 Cr",
    utilized: 50,
    pending: "₹2.5 Cr",
    gpCoverage: "65 GPs",
    totalNum: 50000000,
    spentNum: 25000000,
    pendingNum: 25000000,
  },
];

const performanceData = [
  {
    gp: "Nesari",
    received: "₹5,00,000",
    spent: "₹4,50,000",
    utilized: 90,
    ranking: "Top",
    receivedNum: 500000,
    spentNum: 450000,
  },
  {
    gp: "Shiroli",
    received: "₹3,00,000",
    spent: "₹2,40,000",
    utilized: 80,
    ranking: "Top",
    receivedNum: 300000,
    spentNum: 240000,
  },
  {
    gp: "Vadgaon",
    received: "₹2,00,000",
    spent: "₹1,10,000",
    utilized: 55,
    ranking: "Average",
    receivedNum: 200000,
    spentNum: 110000,
  },
  {
    gp: "Kurundwad",
    received: "₹1,50,000",
    spent: "₹45,000",
    utilized: 30,
    ranking: "Bottom",
    receivedNum: 150000,
    spentNum: 45000,
  },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

const unique = (arr: any[], key: string) =>
  Array.from(new Set(arr.map((item) => item[key])));

function exportToCSV(data: any[], columns: string[], filename = "summary.csv") {
  const csvRows = [
    columns.join(","),
    ...data.map((row) =>
      columns.map((col) => '"' + (row[col] ?? "") + '"').join(",")
    ),
  ];
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const getUtilizationColor = (utilization: number) => {
  if (utilization >= 80) return "text-green-600";
  if (utilization >= 60) return "text-yellow-600";
  return "text-red-600";
};

const getUtilizationBadge = (utilization: number) => {
  if (utilization >= 80)
    return (
      <Badge className="bg-green-100 text-green-800 border-green-200">
        Excellent
      </Badge>
    );
  if (utilization >= 60)
    return (
      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
        Good
      </Badge>
    );
  if (utilization >= 40)
    return (
      <Badge className="bg-orange-100 text-orange-800 border-orange-200">
        Average
      </Badge>
    );
  return (
    <Badge
      variant="destructive"
      className="bg-red-100 text-red-800 border-red-200"
    >
      Poor
    </Badge>
  );
};

const Accounting = () => {
  const [filters, setFilters] = useState({
    zp: "",
    block: "",
    gp: "",
    scheme: "",
    fundType: "",
    year: "",
  });

  const columns = [
    "zp",
    "block",
    "gp",
    "scheme",
    "fundType",
    "received",
    "spent",
    "unspent",
    "utilized",
    "remarks",
  ];

  const filtered = summaryData.filter(
    (row) =>
      (!filters.zp || row.zp === filters.zp) &&
      (!filters.block || row.block === filters.block) &&
      (!filters.gp || row.gp === filters.gp) &&
      (!filters.scheme || row.scheme === filters.scheme) &&
      (!filters.fundType || row.fundType === filters.fundType)
  );

  // Calculate overall statistics
  const totalReceived = summaryData.reduce(
    (acc, row) => acc + row.receivedNum,
    0
  );
  const totalSpent = summaryData.reduce((acc, row) => acc + row.spentNum, 0);
  const totalUnspent = summaryData.reduce(
    (acc, row) => acc + row.unspentNum,
    0
  );
  const overallUtilization = (totalSpent / totalReceived) * 100;
  console.log(filters.zp, blocks?.[filters.zp]);
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
        <div className="max-w-7xl mx-auto space-y-8 pb-6">
          {/* Enhanced Header */}
          <div className="text-center mb-12 pt-8 relative">
            {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-3xl blur-3xl"></div> */}
            <div className="relative">
              <h1 className="text-4xl leading-relaxed font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
                Financial Accounting Dashboard
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive fund utilization and performance analytics for
                transparent governance
              </p>
            </div>
          </div>

          {/* Enhanced Tabs */}
          <Tabs defaultValue="summary" className="space-y-8">
            <div className="flex justify-center w-full mb-12">
              <TabsList className="grid grid-cols-3 w-full max-w-4xl h-fit bg-white/80 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-2">
                <TabsTrigger
                  value="summary"
                  className="rounded-xl data-[state=active]:bg-gradient-to-r py-3 data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300"
                >
                  Summary Report
                </TabsTrigger>
                <TabsTrigger
                  value="balance"
                  className="rounded-xl data-[state=active]:bg-gradient-to-r py-3 data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300"
                >
                  Balance Sheet
                </TabsTrigger>
                <TabsTrigger
                  value="performance"
                  className="rounded-xl data-[state=active]:bg-gradient-to-r py-3 data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300"
                >
                  Performance
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="summary">
              <FundUtilizationSummary />
            </TabsContent>

            <TabsContent value="balance">
              <BalanceSheetWithFilters/>
            </TabsContent>

            <TabsContent value="schemes">
              <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-400/5"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-orange-900 bg-clip-text text-transparent">
                    Scheme-wise Utilization Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-6">
                    {schemeUtilizationData.map((scheme, i) => (
                      <div
                        key={i}
                        className="group bg-white/90 backdrop-blur-lg p-6 border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-bold text-xl text-gray-800">
                              {scheme.scheme}
                            </h4>
                            <p className="text-sm text-slate-600 flex items-center gap-2">
                              <Activity className="h-4 w-4" />
                              {scheme.gpCoverage} covered
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              {scheme.utilized}%
                            </div>
                            <div className="text-sm text-slate-600">
                              Utilized
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-6 mb-4">
                          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                            <div className="text-xl font-bold text-blue-600">
                              {scheme.total}
                            </div>
                            <div className="text-xs text-blue-700 font-medium">
                              Total Fund
                            </div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                            <div className="text-xl font-bold text-green-600">
                              {scheme.spent}
                            </div>
                            <div className="text-xs text-green-700 font-medium">
                              Spent
                            </div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                            <div className="text-xl font-bold text-orange-600">
                              {scheme.pending}
                            </div>
                            <div className="text-xs text-orange-700 font-medium">
                              Pending
                            </div>
                          </div>
                        </div>
                        <Progress
                          value={scheme.utilized}
                          className="h-4 bg-gray-200 rounded-full"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance">
              <Card className="bg-white/80 relative backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-pink-400/5"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">
                    GP Performance Rankings
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-4">
                    {performanceData.map((gp, i) => (
                      <div
                        key={i}
                        className="group flex items-center justify-between p-6 bg-white/90 backdrop-blur-lg border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="flex items-center gap-6">
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                              gp.ranking === "Top"
                                ? "bg-gradient-to-br from-green-500 to-emerald-500"
                                : gp.ranking === "Average"
                                ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                                : "bg-gradient-to-br from-red-500 to-pink-500"
                            }`}
                          >
                            {i + 1}
                          </div>
                          <div>
                            <div className="font-bold text-lg text-gray-800">
                              {gp.gp}
                            </div>
                            <div className="text-sm text-slate-600">
                              Received:{" "}
                              <span className="font-semibold">
                                {gp.received}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-2xl font-bold ${getUtilizationColor(
                              gp.utilized
                            )}`}
                          >
                            {gp.utilized}%
                          </div>
                          <div className="text-sm text-slate-600">
                            Spent:{" "}
                            <span className="font-semibold">{gp.spent}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Enhanced AI Insights Section */}
          <Card className=" relative border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10"></div>
            <CardHeader className="pb-6 relative">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent">
                  AI Insights & Analytics
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="group bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-0 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-600 mb-2">
                        Overall Utilization
                      </p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {overallUtilization.toFixed(1)}%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="group bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-0 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-600 mb-2">
                        Total Funds
                      </p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ₹{(totalReceived / 100000).toFixed(1)}L
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="group bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-0 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-600 mb-2">
                        Unspent Amount
                      </p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        ₹{(totalUnspent / 100000).toFixed(1)}L
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <AlertTriangle className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="group bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-0 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-600 mb-2">
                        Active GPs
                      </p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {summaryData.length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 shadow-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-green-800 text-lg mb-1">
                      Top Performer
                    </p>
                    <p className="text-green-700">
                      Nesari GP achieved 90% fund utilization, exceeding targets
                      by 15%
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200 shadow-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-yellow-800 text-lg mb-1">
                      Attention Required
                    </p>
                    <p className="text-yellow-700">
                      Kurundwad GP has 70% unspent funds - requires immediate
                      intervention
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 shadow-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-blue-800 text-lg mb-1">
                      Trend Analysis
                    </p>
                    <p className="text-blue-700">
                      PMAY-G scheme shows highest utilization rate at 80% across
                      all GPs
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Accounting;
