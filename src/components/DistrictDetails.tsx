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
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as ReachrtToolTip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import {
  AlertTriangle,
  CheckCircle,
  Download,
  FileText,
  TrendingUp,
  Activity,
  DollarSign,
  Users,
  MapPin,
  BarChart3,
  IndianRupee,
  Info,
  Eye,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { districtNames, financialYears } from "@/lib/constants";
import { useState } from "react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { usePDF } from "react-to-pdf";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { TooltipPortal } from "@radix-ui/react-tooltip";
import { ProgressBar } from "./StateCard";
import { Toast } from "./ui/toast";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "./ui/toaster";

// Mock data - replace with your actual data
// const mockDistrictData = [
//   {
//     name: "Mumbai",
//     code: "MUM",
//     obAmount: 45000000,
//     receiptAmountDirect: 12000000,
//     receiptAmountAuto: 8000000,
//     paymentAmount: 52000000,
//     unspentAmount: 13000000,
//     dateOfEntry: "2024-01-15",
//     utilizationPercentage: 80,
//     status: "good"
//   },
//   {
//     name: "Pune",
//     code: "PUN",
//     obAmount: 38000000,
//     receiptAmountDirect: 15000000,
//     receiptAmountAuto: 7000000,
//     paymentAmount: 48000000,
//     unspentAmount: 12000000,
//     dateOfEntry: "2024-01-20",
//     utilizationPercentage: 75,
//     status: "good"
//   },
//   {
//     name: "Nashik",
//     code: "NAS",
//     obAmount: 32000000,
//     receiptAmountDirect: 10000000,
//     receiptAmountAuto: 6000000,
//     paymentAmount: 35000000,
//     unspentAmount: 13000000,
//     dateOfEntry: "2024-01-18",
//     utilizationPercentage: 73,
//     status: "average"
//   },
//   {
//     name: "Nagpur",
//     code: "NAG",
//     obAmount: 41000000,
//     receiptAmountDirect: 14000000,
//     receiptAmountAuto: 9000000,
//     paymentAmount: 50000000,
//     unspentAmount: 14000000,
//     dateOfEntry: "2024-01-12",
//     utilizationPercentage: 78,
//     status: "good"
//   },
//   {
//     name: "Aurangabad",
//     code: "AUR",
//     obAmount: 28000000,
//     receiptAmountDirect: 8000000,
//     receiptAmountAuto: 5000000,
//     paymentAmount: 30000000,
//     unspentAmount: 11000000,
//     dateOfEntry: "2024-01-25",
//     utilizationPercentage: 68,
//     status: "average"
//   },
//   {
//     name: "Kolhapur",
//     code: "KOL",
//     obAmount: 25000000,
//     receiptAmountDirect: 7000000,
//     receiptAmountAuto: 4000000,
//     paymentAmount: 28000000,
//     unspentAmount: 8000000,
//     dateOfEntry: "2024-01-22",
//     utilizationPercentage: 72,
//     status: "average"
//   }
// ];
export const mockDistrictData = [
  {
    name: "Pune",
    code: 446,
    totalAvailable: 53073630440.09,
    paymentAmount: 18421645827.1,
    unspentAmount: 34651998461.38,
    utilizationPercentage: 34.7,
    status: "Excellent",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Ahmednagar",
    code: 424,
    totalAvailable: 30000000000,
    paymentAmount: 9000000000,
    unspentAmount: 21000000000,
    utilizationPercentage: 30.0,
    status: "Good",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Amravati",
    code: 426,
    totalAvailable: 8000000000,
    paymentAmount: 3600000000,
    unspentAmount: 4400000000,
    utilizationPercentage: 45.0,
    status: "Excellent",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Aurangabad",
    code: 427,
    totalAvailable: 12000000000,
    paymentAmount: 2500000000,
    unspentAmount: 9500000000,
    utilizationPercentage: 20.83,
    status: "Good",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Bhandara",
    code: 429,
    totalAvailable: 6000000000,
    paymentAmount: 900000000,
    unspentAmount: 5100000000,
    utilizationPercentage: 15.0,
    status: "Average",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Buldhana",
    code: 430,
    totalAvailable: 7200000000,
    paymentAmount: 3500000000,
    unspentAmount: 3700000000,
    utilizationPercentage: 48.61,
    status: "Excellent",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Chandrapur",
    code: 431,
    totalAvailable: 5500000000,
    paymentAmount: 1800000000,
    unspentAmount: 3700000000,
    utilizationPercentage: 32.73,
    status: "Good",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Dhule",
    code: 432,
    totalAvailable: 4000000000,
    paymentAmount: 800000000,
    unspentAmount: 3200000000,
    utilizationPercentage: 20.0,
    status: "Good",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Gadchiroli",
    code: 433,
    totalAvailable: 3000000000,
    paymentAmount: 600000000,
    unspentAmount: 2400000000,
    utilizationPercentage: 20.0,
    status: "Good",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Gondia",
    code: 434,
    totalAvailable: 4200000000,
    paymentAmount: 400000000,
    unspentAmount: 3800000000,
    utilizationPercentage: 9.52,
    status: "Average",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Hingoli",
    code: 435,
    totalAvailable: 2500000000,
    paymentAmount: 1100000000,
    unspentAmount: 1400000000,
    utilizationPercentage: 44.0,
    status: "Excellent",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Jalgaon",
    code: 436,
    totalAvailable: 2700000000,
    paymentAmount: 400000000,
    unspentAmount: 2300000000,
    utilizationPercentage: 14.81,
    status: "Average",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Jalna",
    code: 437,
    totalAvailable: 3400000000,
    paymentAmount: 1400000000,
    unspentAmount: 2000000000,
    utilizationPercentage: 41.18,
    status: "Excellent",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Kolhapur",
    code: 438,
    totalAvailable: 2900000000,
    paymentAmount: 500000000,
    unspentAmount: 2400000000,
    utilizationPercentage: 17.24,
    status: "Average",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Nagpur",
    code: 440,
    totalAvailable: 3300000000,
    paymentAmount: 1600000000,
    unspentAmount: 1700000000,
    utilizationPercentage: 48.48,
    status: "Excellent",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Nanded",
    code: 441,
    totalAvailable: 2200000000,
    paymentAmount: 500000000,
    unspentAmount: 1700000000,
    utilizationPercentage: 22.73,
    status: "Good",
    lastUpdated: "21/06/2025",
  },
  {
    name: "Nandurbar",
    code: 442,
    totalAvailable: 2800000000,
    paymentAmount: 1200000000,
    unspentAmount: 1600000000,
    utilizationPercentage: 42.86,
    status: "Excellent",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Nashik",
    code: 443,
    totalAvailable: 2400000000,
    paymentAmount: 400000000,
    unspentAmount: 2000000000,
    utilizationPercentage: 16.67,
    status: "Average",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Osmanabad",
    code: 444,
    totalAvailable: 2600000000,
    paymentAmount: 1000000000,
    unspentAmount: 1600000000,
    utilizationPercentage: 38.46,
    status: "Good",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Parbhani",
    code: 445,
    totalAvailable: 2000000000,
    paymentAmount: 600000000,
    unspentAmount: 1400000000,
    utilizationPercentage: 30.0,
    status: "Good",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Raigad",
    code: 447,
    totalAvailable: 1800000000,
    paymentAmount: 750000000,
    unspentAmount: 1050000000,
    utilizationPercentage: 41.67,
    status: "Excellent",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Ratnagiri",
    code: 448,
    totalAvailable: 1900000000,
    paymentAmount: 800000000,
    unspentAmount: 1100000000,
    utilizationPercentage: 42.11,
    status: "Excellent",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Sangli",
    code: 449,
    totalAvailable: 2100000000,
    paymentAmount: 900000000,
    unspentAmount: 1200000000,
    utilizationPercentage: 42.86,
    status: "Excellent",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Satara",
    code: 450,
    totalAvailable: 1850000000,
    paymentAmount: 350000000,
    unspentAmount: 1500000000,
    utilizationPercentage: 18.92,
    status: "Average",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Sindhudurg",
    code: 451,
    totalAvailable: 2000000000,
    paymentAmount: 400000000,
    unspentAmount: 1600000000,
    utilizationPercentage: 20.0,
    status: "Good",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Solapur",
    code: 452,
    totalAvailable: 2400000000,
    paymentAmount: 1000000000,
    unspentAmount: 1400000000,
    utilizationPercentage: 41.67,
    status: "Excellent",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Thane",
    code: 453,
    totalAvailable: 3100000000,
    paymentAmount: 800000000,
    unspentAmount: 2300000000,
    utilizationPercentage: 25.81,
    status: "Good",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Wardha",
    code: 454,
    totalAvailable: 1600000000,
    paymentAmount: 700000000,
    unspentAmount: 900000000,
    utilizationPercentage: 43.75,
    status: "Excellent",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Washim",
    code: 455,
    totalAvailable: 3400000000,
    paymentAmount: 1300000000,
    unspentAmount: 2100000000,
    utilizationPercentage: 38.24,
    status: "Good",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Yavatmal",
    code: 456,
    totalAvailable: 1400000000,
    paymentAmount: 300000000,
    unspentAmount: 1100000000,
    utilizationPercentage: 21.43,
    status: "Good",
    lastUpdated: "26/06/2025",
  },
  {
    name: "Palghar",
    code: 457,
    totalAvailable: 1800000000,
    paymentAmount: 350000000,
    unspentAmount: 1450000000,
    utilizationPercentage: 19.44,
    status: "Average",
    lastUpdated: "26/06/2025",
  },
];

const formatCurrency = (amount: number) => {
  return (
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(amount) / 10000000) + " Cr"
  );
};

const formatCurrencyFull = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const EnhancedDistrictsOverview = () => {
  const navigate = useNavigate();
  const { toPDF, targetRef } = usePDF({
    filename: "Maharashtra Districts Dashboard.pdf",
  });

  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const processedData = mockDistrictData.map((district) => ({
    ...district,
    totalAvailable: district.totalAvailable,
    unspentPercentage: (district.unspentAmount / district.totalAvailable) * 100,
  }));
  const filteredData = processedData.filter((district) => {
    const matchesDistrict =
      selectedDistrict === "all" ||
      district.name.toLowerCase() === selectedDistrict.toLowerCase();
    return matchesDistrict; // Since we only have current year data, we'll show all for now
  });
  const totalAllDistFundsReceived = processedData.reduce(
    (sum, district) => sum + district.totalAvailable,
    0
  );
  const totalAllDistFundsSpent = processedData.reduce(
    (sum, district) => sum + district.unspentAmount,
    0
  );
  const TotalAverageUtilization =
    processedData.reduce(
      (sum, district) => sum + district.utilizationPercentage,
      0
    ) / processedData.length;
  // Calculate overall statistics
  const totalDistricts = filteredData.length;
  const totalFundsReceived = filteredData.reduce(
    (sum, district) => sum + district.totalAvailable,
    0
  );
  const totalFundsSpent = filteredData.reduce(
    (sum, district) => sum + district.paymentAmount,
    0
  );
  const averageUtilization =
    filteredData.reduce(
      (sum, district) => sum + district.utilizationPercentage,
      0
    ) / totalDistricts;
  const totalUnspent = filteredData.reduce(
    (sum, district) => sum + district.unspentAmount,
    0
  );

  // Performance distribution data
  const performanceDistribution = [
    {
      name: "Excellent (80%+)",
      count: processedData.filter((d) => d.utilizationPercentage >= 80).length,
      color: "#10B981",
    },
    {
      name: "Good (60-79%)",
      count: processedData.filter(
        (d) => d.utilizationPercentage >= 60 && d.utilizationPercentage < 80
      ).length,
      color: "#3B82F6",
    },
    {
      name: "Average (40-59%)",
      count: processedData.filter(
        (d) => d.utilizationPercentage >= 40 && d.utilizationPercentage < 60
      ).length,
      color: "#F59E0B",
    },
    {
      name: "Poor (<40%)",
      count: processedData.filter((d) => d.utilizationPercentage < 40).length,
      color: "#EF4444",
    },
  ];

  // Chart data
  const chartData = filteredData.map((district) => ({
    name: district.name,
    received: district.totalAvailable / 10000000,
    spent: district.paymentAmount / 10000000,
    utilization: district.utilizationPercentage,
  }));

  const handleDistrictClick = (districtName: string) => {
    if(districtName==="Pune"){

      navigate(`/districts/${districtName}`);
    }else {
      toast({
        title: "This is under progress",
        description: `${districtName} details are not yet available.`,
        variant: "default", // or "destructive" if you want red styling
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Excellent":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Excellent
          </Badge>
        );
      case "Good":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Good
          </Badge>
        );
      case "Average":
        return (
          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
            Average
          </Badge>
        );
      default:
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">Poor</Badge>
        );
    }
  };

  const generatePDF = () => {
    console.log("Generating PDF report...");
  };

  const aiInsights = [
    {
      title: "Top Performer",
      description:
        "Buldhana district shows excellent fund utilization at 49.13% with efficient expenditure patterns.",
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
  const openPdf = () => {
    window.open("/Maharashtra_Districts_Summary.pdf", "_blank");
  };
  const sectorWiseData = [
    {
      sector: "Rural Development",
      allocated: 450,
      utilized: 380,
      percentage: 84,
    },
    { sector: "Infrastructure", allocated: 320, utilized: 245, percentage: 77 },
    { sector: "Education", allocated: 280, utilized: 210, percentage: 75 },
    { sector: "Healthcare", allocated: 180, utilized: 125, percentage: 69 },
    {
      sector: "Water & Sanitation",
      allocated: 220,
      utilized: 165,
      percentage: 75,
    },
  ];

  function formatToCr(value: number) {
    const inCr = value / 10000000; // convert to crores
    // Format with Indian style commas
    const formatted = inCr.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `₹${formatted} Cr`;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header Section */}
        <div className="relative max-w-7xl mx-auto pt-8 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="">
            <div className="text-left mb-2 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
              <div className="relative">
                {/* <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-xl shadow-blue-500/25">
                  <BarChart3 className="w-10 h-10 text-white" />
                </div>
              </div> */}
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-relaxed mb-2">
                  Maharashtra Districts Dashboard
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Comprehensive fund utilization analysis and performance
                  insights across all districts
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-8">
          {/* Key Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-lg">
                    <Users className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      34
                    </div>
                    <p className="text-gray-600 font-medium">Total Districts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center gap-2">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl shadow-lg">
                    <Download className="h-6 w-6 text-emerald-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-[22px] font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {formatToCr(totalAllDistFundsReceived)}
                      </div>
                      {/* Tooltip Info Icon */}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger
                            className="absolute top-2 right-2"
                            asChild
                          >
                            <Info className="h-5 w-5 text-gray-500 hover:text-green-600 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipPortal>
                            <TooltipContent
                              side="top"
                              className="text-sm font-medium"
                            >
                              <p>
                                Funds Received:{" "}
                                {formatCurrencyFull(totalAllDistFundsReceived)}
                              </p>
                            </TooltipContent>
                          </TooltipPortal>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-gray-600 font-medium">Funds Received</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center gap-2">
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl shadow-lg">
                    <IndianRupee className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-[22px] font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {formatToCr(totalAllDistFundsSpent)}
                      </div>
                      {/* Tooltip Info Icon */}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger
                            className="absolute top-2 right-2"
                            asChild
                          >
                            <Info className="h-5 w-5 text-gray-500 hover:text-purple-600 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipPortal>
                            <TooltipContent
                              side="top"
                              className="text-sm font-medium"
                            >
                              <p>
                                Funds Utilized:{" "}
                                {formatCurrencyFull(totalAllDistFundsSpent)}
                              </p>
                            </TooltipContent>
                          </TooltipPortal>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-gray-600 font-medium">Funds Utilized</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl shadow-lg">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        {TotalAverageUtilization.toFixed(2)}%
                      </div>
                      {/* Tooltip Info Icon */}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger
                            className="absolute top-2 right-2"
                            asChild
                          >
                            <Info className="h-5 w-5 text-gray-500 hover:text-orange-600 cursor-pointer" />
                          </TooltipTrigger>
                          <TooltipPortal>
                            <TooltipContent
                              side="top"
                              className="max-w-xs text-sm font-medium"
                            >
                              <p>
                                Utilization is defined as:
                                <span className="font-semibold">
                                  {" "}
                                  (Total Funds Spent ÷ Total Funds Received) ×
                                  100
                                </span>
                              </p>
                            </TooltipContent>
                          </TooltipPortal>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-gray-600 font-medium">Avg Utilization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardContent className="p-6 relative">
              <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-700">
                    Progress
                  </span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                    {TotalAverageUtilization.toFixed(2)}%
                  </span>
                </div>
                <ProgressBar
                  percentage={TotalAverageUtilization.toFixed(2)}
                  color="bg-gradient-to-r from-green-500 to-emerald-500"
                />
                <div className="flex justify-between mt-3 text-sm text-gray-600">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="text-2xl font-bold text-black">
                    {formatCurrencyFull(totalAllDistFundsSpent)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Amount Utilized
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <div className="text-2xl font-bold text-black">
                    {formatCurrencyFull(
                      totalAllDistFundsReceived - totalAllDistFundsSpent
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Remaining Balance
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <div className="text-2xl font-bold text-black">
                    {(100 - TotalAverageUtilization).toFixed(2)}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Available for Use
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Advanced Filters */}
          <Card
            ref={targetRef}
            className="bg-white/80 backdrop-blur-lg border-0 shadow-xl rounded-2xl overflow-hidden"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Advanced Filters
                </h3>
                <div className="flex gap-4 items-center">
                  <Select
                    value={selectedDistrict}
                    onValueChange={setSelectedDistrict}
                  >
                    <SelectTrigger className="w-40 bg-white/80 backdrop-blur border-gray-200 shadow-sm">
                      <SelectValue placeholder="Districts" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur border-gray-200">
                      <SelectItem value="all">All Districts</SelectItem>

                      {districtNames.map((dist) => (
                        <SelectItem value={dist.label}>{dist.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select defaultValue="2024-25">
                    <SelectTrigger className="w-40 bg-white/80 backdrop-blur border-gray-200 shadow-sm">
                      <SelectValue placeholder="Financial Year" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur border-gray-200">
                      {financialYears.map((finYear) => (
                        <SelectItem key={finYear.value} value={finYear.value}>
                          FY {finYear.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    className="bg-gradient-to-r from-blue-200 to-indigo-200 hover:from-blue-100 hover:to-indigo-200 text-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => openPdf()}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    PDF Report
                  </Button>
                </div>
              </div>

              {/* Main Tabs */}
              <Tabs defaultValue="overview" className="w-full mt-8 ">
                

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-8">
                  <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100/50">
                      <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        Districts Performance Summary
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Comprehensive financial analysis with utilization rates
                        (Click any district for detailed view)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50">
                              <TableHead className="font-bold text-gray-700">
                                District Name
                              </TableHead>
                              <TableHead className="font-bold text-gray-700">
                                Total Received
                              </TableHead>
                              <TableHead className="font-bold text-gray-700">
                                Total Spent
                              </TableHead>
                              <TableHead className="font-bold text-gray-700">
                                Unspent Amount
                              </TableHead>
                              <TableHead className="font-bold text-gray-700">
                                Utilization %
                              </TableHead>
                              <TableHead className="font-bold text-gray-700">
                                Performance
                              </TableHead>
                              <TableHead className="font-bold text-gray-700">
                                Action
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredData
                              // .sort((a, b) => b.utilizationPercentage - a.utilizationPercentage)
                              .map((district, index) => (
                                <TableRow
                                  key={index}
                                  className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-300"
                                  onClick={() =>
                                    handleDistrictClick(district.name)
                                  }
                                >
                                  <TableCell className="font-bold text-blue-600 text-lg">
                                    {district.name}
                                  </TableCell>
                                  <TableCell className="font-semibold text-green-600">
                                    {formatCurrencyFull(
                                      district.totalAvailable
                                    )}
                                  </TableCell>
                                  <TableCell className="font-semibold text-blue-600">
                                    {formatCurrencyFull(district.paymentAmount)}
                                  </TableCell>
                                  <TableCell className="font-semibold text-red-600">
                                    {formatCurrencyFull(district.unspentAmount)}
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      className={
                                        district.utilizationPercentage >= 45
                                          ? "bg-green-100 text-green-600 hover:bg-green-200"
                                          : district.utilizationPercentage >= 30
                                          ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                                          : "bg-red-100 text-red-600 hover:bg-red-200"
                                      }
                                    >
                                      {district.utilizationPercentage.toFixed(
                                        1
                                      )}
                                      %
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    {getStatusBadge(district.status)}
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      size="sm"
                              variant="outline"

                                                                    className="flex items-center gap-2 bg-white/50 backdrop-blur border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"

                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDistrictClick(district.name);
                                      }}
                                    >
                                      <Eye className="h-4 w-4" />
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
                   <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-blue-500/10 rounded-3xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100/50">
                      <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        Fund Utilization Comparison
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Received vs Utilized funds across districts (in Crores)
                      </CardDescription>
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
                          <ReachrtToolTip
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
                              name === "received" ? "Received" : "Utilized",
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl rounded-2xl">
                      <CardHeader>
                        <CardTitle className="text-lg text-gray-800">
                          Utilization Rate
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {averageUtilization.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600">
                          Average across all districts
                        </div>
                        <Progress value={averageUtilization} className="mt-3" />
                      </CardContent>
                    </Card>

                    <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl rounded-2xl">
                      <CardHeader>
                        <CardTitle className="text-lg text-gray-800">
                          Best Performer
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-black mb-2">
                          {filteredData.length > 0
                            ? filteredData.sort(
                                (a, b) =>
                                  b.utilizationPercentage -
                                  a.utilizationPercentage
                              )[0]?.name
                            : "No data"}
                        </div>
                        <div className="text-sm text-gray-600">
                          {filteredData.length > 0
                            ? `${filteredData
                                .sort(
                                  (a, b) =>
                                    b.utilizationPercentage -
                                    a.utilizationPercentage
                                )[0]
                                ?.utilizationPercentage.toFixed(
                                  1
                                )}% utilization`
                            : "No data available"}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl rounded-2xl">
                      <CardHeader>
                        <CardTitle className="text-lg text-gray-800">
                          Total Unspent
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-red-600 mb-2">
                          {formatCurrencyFull(totalUnspent)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Across all districts
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-green-500/10 rounded-3xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100/50">
                      <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                        AI-Powered Insights & Recommendations
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Advanced analysis with predictive insights and strategic
                        recommendations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {aiInsights.map((insight, index) => {
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
                                  <p className="text-sm font-semibold text-gray-800 bg-white/60 px-3 py-1 rounded-lg">
                                    Action: {insight.action}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

              

                {/* AI Insights Tab */}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default EnhancedDistrictsOverview;
