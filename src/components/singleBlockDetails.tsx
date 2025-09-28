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
import { Bar, Line, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  Download,
  Eye,
  EyeOff,
  FileText,
  KeyRound,
  Shield,
  TrendingUp,
  User,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { financialYears } from "@/lib/constants";
import BankTransactionsCard from "./BankTransactionCard";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { CustomCard } from "./common/commonCard";
import BlockOverviewCard from "./BlockOverviewCard";
import { formatCurrencyFull } from "@/lib/dataUtils";
import { toast } from "@/hooks/use-toast";

const BlockDetails = () => {
  const navigate = useNavigate();
  const { blockId } = useParams();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [currentBalance, setCurrentBalance] = useState("");
  const handleInputChange = (field: string, value: string) => {
    setLoginData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid = loginData.username && loginData.password;
  const handleUnlockClick = () => {
    setShowLoginDialog(true);
  };
  const handleLoginConfirm = async () => {
    if (!loginData.username || !loginData.password) {
      return;
    }

    setIsLoading(true);

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setIsUnlocked(true);
    setShowLoginDialog(false);
    setLoginData({ username: "", password: "" });
  };
  const handleLoginCancel = () => {
    setShowLoginDialog(false);
    setLoginData({ username: "", password: "" });
    setShowPassword(false);
  };
  // Mock data - in real app, this would be fetched based on blockId
  const blockData = {
    id: blockId,
    blockName: "Maval",
    district: "Pune",
    state: "Maharashtra",
    gramPanchayats: 52,
    totalFunds: "370682408",
    spentFunds: "118905206",
    unspentBalance: "251777202",
    utilization: 32.07,
    activeSchemes: "XV Finance,MGNREGA, SBM, PMAY-G",
    population: "2100000",
  };

  const schemeWiseData = [
    {
      scheme: "XV Finance",
      allocation: "₹4,65,000",
      spent: "₹3,72,000",
      unspent: "₹93,000",
      utilization: 80,
      gramPanchayats: 45,
    },
    {
      scheme: "MGNREGA",
      allocation: "₹6,20,000",
      spent: "₹4,96,000",
      unspent: "₹1,24,000",
      utilization: 80,
      gramPanchayats: 45,
    },
    {
      scheme: "SBM",
      allocation: "₹4,65,000",
      spent: "₹3,72,000",
      unspent: "₹93,000",
      utilization: 80,
      gramPanchayats: 45,
    },
    {
      scheme: "PMAY-G",
      allocation: "₹4,65,000",
      spent: "₹3,72,000",
      unspent: "₹93,000",
      utilization: 80,
      gramPanchayats: 35,
    },
  ];

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

  const gramPanchayatPerformance = [
    { name: "Excellent (>40%)", value: 4, color: "#10b981" },
    { name: "Good (20-40%)", value: 4, color: "#3b82f6" },
    { name: "Average (<20%)", value: 5, color: "#f59e0b" },
  ];

  const topPerformingGPs = [
    { name: "Talegaon", utilization: 55, funds: "₹12,50,000" },
    { name: "Shilatane", utilization: 50, funds: "₹5,60,000" },
    { name: "Vadgaon", utilization: 45, funds: "₹9,20,000" },
    { name: "Kusgaon", utilization: 45, funds: "₹4,80,000" },
    { name: "Kamshet", utilization: 30, funds: "₹8,42,000" },
  ];

  const aiInsights = [
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Low Utilization Alert",
      description:
        "5 villages have utilization rates below 20%, with ₹20.3L total unspent funds",
      action:
        "Immediate intervention needed to accelerate spending in underperforming villages",
    },
    {
      type: "success",
      icon: CheckCircle,
      title: "Strong Performers",
      description:
        "Talegaon leads with 55% utilization, followed by Shilatane at 50%",
      action: "Study and replicate best practices from top-performing villages",
    },
    {
      type: "trend",
      icon: TrendingUp,
      title: "Improvement Opportunity",
      description:
        "Average utilization is 27.2% across all villages with significant room for improvement",
      action: "Implement targeted capacity building and monitoring programs",
    },
  ];

  // Master village data provided by user
  const villageFinancialData = {
    Maval: [
      {
        id: "1",
        name: "Adhe",
        totalFunds: "₹18,70,247",
        spentFunds: "₹1,11,000",
        unspentBalance: "₹17,59,247",
        utilization: 5.93,
        grade: "Average",
      },
      {
        id: "2",
        name: "Talegaon",
        totalFunds: "₹1,25,00,000",
        spentFunds: "₹68,75,000",
        unspentBalance: "₹56,25,000",
        utilization: 55.0,
        grade: "Excellent",
      },
      {
        id: "3",
        name: "Kamshet",
        totalFunds: "₹84,20,000",
        spentFunds: "₹25,26,000",
        unspentBalance: "₹58,94,000",
        utilization: 30.0,
        grade: "Good",
      },
      {
        id: "4",
        name: "Shirgaon",
        totalFunds: "₹67,30,000",
        spentFunds: "₹13,46,000",
        unspentBalance: "₹53,84,000",
        utilization: 20.0,
        grade: "Good",
      },
      {
        id: "6",
        name: "Bhaje",
        totalFunds: "₹38,00,000",
        spentFunds: "₹7,60,000",
        unspentBalance: "₹30,40,000",
        utilization: 20.0,
        grade: "Good",
      },
      {
        id: "7",
        name: "Vadgaon",
        totalFunds: "₹92,00,000",
        spentFunds: "₹41,40,000",
        unspentBalance: "₹50,60,000",
        utilization: 45.0,
        grade: "Excellent",
      },

      {
        id: "10",
        name: "Uksan",
        totalFunds: "₹35,00,000",
        spentFunds: "₹1,75,000",
        unspentBalance: "₹33,25,000",
        utilization: 5.0,
        grade: "Average",
      },
      {
        id: "11",
        name: "Shilatane",
        totalFunds: "₹56,00,000",
        spentFunds: "₹28,00,000",
        unspentBalance: "₹28,00,000",
        utilization: 50.0,
        grade: "Excellent",
      },
      {
        id: "12",
        name: "Ambavne",
        totalFunds: "₹27,00,000",
        spentFunds: "₹2,70,000",
        unspentBalance: "₹24,30,000",
        utilization: 10.0,
        grade: "Average",
      },
    ],
    Shirur: [
      {
        id: "S1",
        name: "Dhoksanghavi",
        totalFunds: "₹18,70,247",
        spentFunds: "₹1,11,000",
        unspentBalance: "₹17,59,247",
        utilization: 5.93,
        grade: "Average",
      },
      {
        id: "S2",
        name: "Dhamari",
        totalFunds: "₹22,40,500",
        spentFunds: "₹7,20,000",
        unspentBalance: "₹15,20,500",
        utilization: 32.14,
        grade: "Good",
      },
      {
        id: "S3",
        name: "Ravadewadi",
        totalFunds: "₹19,85,300",
        spentFunds: "₹12,40,000",
        unspentBalance: "₹7,45,300",
        utilization: 62.46,
        grade: "Very Good",
      },
      {
        id: "S4",
        name: "Talegaon Dham dhere",
        totalFunds: "₹25,00,000",
        spentFunds: "₹20,75,000",
        unspentBalance: "₹4,25,000",
        utilization: 83.0,
        grade: "Excellent",
      },
      {
        id: "S5",
        name: "Inamgaon",
        totalFunds: "₹15,30,800",
        spentFunds: "₹3,45,600",
        unspentBalance: "₹11,85,200",
        utilization: 22.57,
        grade: "Average",
      },
    ],
    Haveli: [
      {
        id: "H2",
        name: "Uruli Kanchan",
        totalFunds: "₹27,90,000",
        spentFunds: "₹24,50,000",
        unspentBalance: "₹3,40,000",
        utilization: 87.82,
        grade: "Excellent",
      },
      {
        id: "H5",
        name: "Burkegaon",
        totalFunds: "₹14,80,000",
        spentFunds: "₹6,70,000",
        unspentBalance: "₹8,10,000",
        utilization: 45.27,
        grade: "Average",
      },
      {
        id: "H3",
        name: "Dongargaon",
        totalFunds: "₹12,75,400",
        spentFunds: "₹4,90,000",
        unspentBalance: "₹7,85,400",
        utilization: 38.43,
        grade: "Average",
      },
      {
        id: "H4",
        name: "Sortapwadi",
        totalFunds: "₹20,40,000",
        spentFunds: "₹10,15,000",
        unspentBalance: "₹10,25,000",
        utilization: 49.75,
        grade: "Good",
      },

      {
        id: "H6",
        name: "Vadaki (Wadki)",
        totalFunds: "₹21,60,000",
        spentFunds: "₹15,80,000",
        unspentBalance: "₹5,80,000",
        utilization: 73.15,
        grade: "Very Good",
      },
      {
        id: "H7",
        name: "Bivari (Biwari)",
        totalFunds: "₹16,40,000",
        spentFunds: "₹2,90,000",
        unspentBalance: "₹13,50,000",
        utilization: 17.68,
        grade: "Poor",
      },
      {
        id: "H8",
        name: "Naigaon",
        totalFunds: "₹13,90,000",
        spentFunds: "₹8,50,000",
        unspentBalance: "₹5,40,000",
        utilization: 61.15,
        grade: "Good",
      },
      {
        id: "H9",
        name: "Perane (Perne)",
        totalFunds: "₹18,20,000",
        spentFunds: "₹14,40,000",
        unspentBalance: "₹3,80,000",
        utilization: 79.12,
        grade: "Very Good",
      },
      {
        id: "H10",
        name: "Jambhali",
        totalFunds: "₹10,50,000",
        spentFunds: "₹3,10,000",
        unspentBalance: "₹7,40,000",
        utilization: 29.52,
        grade: "Poor",
      },
      {
        id: "H11",
        name: "Mandavi Kh(urd)",
        totalFunds: "₹17,60,000",
        spentFunds: "₹9,20,000",
        unspentBalance: "₹8,40,000",
        utilization: 52.27,
        grade: "Good",
      },
      {
        id: "H12",
        name: "Bahuli",
        totalFunds: "₹23,00,000",
        spentFunds: "₹19,80,000",
        unspentBalance: "₹3,20,000",
        utilization: 86.08,
        grade: "Excellent",
      },
    ],
  };
  const handleViewDetails = (villageName: string) => {
    console.log(villageName, "villageName");
    if (
      (blockId === "Shirur" &&
        (villageName === "Dhoksanghavi" || villageName === "Dhamari")) ||
      (blockId === "Haveli" &&
        (villageName === "Uruli Kanchan" || villageName === "Burkegaon"))
    ) {
      navigate(`/block/${blockId}/village/${villageName}`);
    } else {
      toast({
        title: "This is under progress",
        description: `${blockId} details are not yet available.`,
        variant: "default", // or "destructive" if you want red styling
      });
    }
  };
  const openPdf = () => {
    window.open("/Maval_Block_Village_Summary.pdf", "_blank");
  };
  const getGradeBadge = (grade: string) => {
    switch (grade) {
      case "Excellent":
        return (
          <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-600 border-0 shadow-lg">
            Excellent
          </Badge>
        );
      case "Good":
        return (
          <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-600 border-0 shadow-lg">
            Good
          </Badge>
        );
      case "Average":
        return (
          <Badge className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-600 border-0 shadow-lg">
            Average
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gradient-to-r from-red-100 to-pink-100 text-red-600 border-0 shadow-lg">
            Poor
          </Badge>
        );
    }
  };
  const cardData = [
    {
      label: "Total Funds",
      value: blockData.totalFunds,
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      fromColor: "blue-500",
      toColor: "indigo-500",
      textFrom: "blue-600",
      textTo: "indigo-600",
    },
    {
      label: "Spent Funds",
      value: blockData.spentFunds,
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      fromColor: "green-500",
      toColor: "emerald-500",
      textFrom: "green-600",
      textTo: "emerald-600",
    },
    {
      label: "Unspent Balance",
      value: blockData.unspentBalance,
      icon: <AlertTriangle className="w-6 h-6 text-white" />,
      fromColor: "orange-500",
      toColor: "red-500",
      textFrom: "orange-600",
      textTo: "red-600",
    },
    {
      label: "Utilization",
      value: blockData.utilization.toFixed(2),
      isPercentage: true, // ⬅️ ensures no Cr conversion
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      fromColor: "purple-500",
      toColor: "pink-500",
      textFrom: "purple-600",
      textTo: "pink-600",
    },
  ];
  const assetsData = [
    {
      sNo: 1,
      workCode: "85669756",
      name: "Bio-Fertilizer Purchase/Distribution",
      workNature: "Asset",
      scheme: "XV Finance Commission",
      schemeComponent: "Tied Grant",
      amountProvisioned: 1204000,
      amountSpent: 104000,
      percentageSpent: 100.0,
      lastProgressReported: "2024-03-20 11:12:31.274",
      workStatus: "Ongoing",
    },
    {
      sNo: 2,
      workCode: "85673888",
      name: "Connecting septic tanks with soak pits",
      workNature: "Asset",
      scheme: "XV Finance Commission",
      schemeComponent: "Tied Grant",
      amountProvisioned: 1158000,
      amountSpent: 157968,
      percentageSpent: 99.98,
      lastProgressReported: "2024-05-31 17:43:20.55",
      workStatus: "Ongoing",
    },
    {
      sNo: 3,
      workCode: "85677928",
      name: "Construction of Community Sanitary Complex",
      workNature: "Asset",
      scheme: "XV Finance Commission",
      schemeComponent: "Tied Grant",
      amountProvisioned: 1200000,
      amountSpent: 99975,
      percentageSpent: 99.98,
      lastProgressReported: "2024-05-31 18:00:34.086",
      workStatus: "Ongoing",
    },
    {
      sNo: 4,
      workCode: "85678856",
      name: "Construction of Segregation Unit",
      workNature: "Asset",
      scheme: "XV Finance Commission",
      schemeComponent: "Tied Grant",
      amountProvisioned: 1204000,
      amountSpent: 104000,
      percentageSpent: 100.0,
      lastProgressReported: "2024-03-20 12:11:59.323",
      workStatus: "Ongoing",
    },
    {
      sNo: 5,
      workCode: "85683818",
      name: "Construction of toilets in public institutions",
      workNature: "Asset",
      scheme: "XV Finance Commission",
      schemeComponent: "Tied Grant",
      amountProvisioned: 1200000,
      amountSpent: 100000,
      percentageSpent: 100.0,
      lastProgressReported: "2024-03-20 12:19:36.443",
      workStatus: "Ongoing",
    },
    {
      sNo: 6,
      workCode: "85689695",
      name: "Creation of Shed for segregation and processing of wet and dry waste",
      workNature: "Asset",
      scheme: "XV Finance Commission",
      schemeComponent: "Tied Grant",
      amountProvisioned: 1202000,
      amountSpent: 102000,
      percentageSpent: 100.0,
      lastProgressReported: "2024-03-20 13:54:12.961",
      workStatus: "Ongoing",
    },
    {
      sNo: 7,
      workCode: "85690777",
      name: "Creation of Silt Oil & Grease chamber for pre-treatment of grey water",
      workNature: "Asset",
      scheme: "XV Finance Commission",
      schemeComponent: "Tied Grant",
      amountProvisioned: 1302000,
      amountSpent: 102000,
      percentageSpent: 100.0,
      lastProgressReported: "2024-03-20 13:50:39.37",
      workStatus: "Ongoing",
    },
    {
      sNo: 8,
      workCode: "85693490",
      name: "Creation of community compost pits for a group of Households",
      workNature: "Asset",
      scheme: "XV Finance Commission",
      schemeComponent: "Tied Grant",
      amountProvisioned: 2104000,
      amountSpent: 400000,
      percentageSpent: 196.08,
      lastProgressReported: "2025-03-27 17:44:42.311",
      workStatus: "Ongoing",
    },
    {
      sNo: 9,
      workCode: "85695914",
      name: "Creation of community soak pits for group of Households",
      workNature: "Asset",
      scheme: "XV Finance Commission",
      schemeComponent: "Tied Grant",
      amountProvisioned: 1250000,
      amountSpent: 300000,
      percentageSpent: 200.0,
      lastProgressReported: "2025-03-11 12:56:25.883",
      workStatus: "Ongoing",
    },
    {
      sNo: 10,
      workCode: "85696758",
      name: "Creation of compost pits for individual Households",
      workNature: "Asset",
      scheme: "XV Finance Commission",
      schemeComponent: "Tied Grant",
      amountProvisioned: 2104000,
      amountSpent: 399948,
      percentageSpent: 196.05,
      lastProgressReported: "2025-02-27 12:15:25.74",
      workStatus: "Ongoing",
    },
  ];
  const blockDataExpend = [
    {
      name: "Shirur",
      receipts: 123523770,
      payments: 111318307,
      totalAvailable: 113523770,
      paymentAmount: 11318307,
      unspentAmount: 13523770 - 11318307,
      utilizationPercentage: (11318307 / 13523770) * 100,
      vouchers: {
        rv: 4, // Receipt Voucher
        pv: 11, // Payment Voucher
        cv: 0, // Contra Voucher
        jv: 1, // Journal Voucher
      },
      processedAt: new Date().toISOString(), // current timestamp
    },
    {
      name: "Haveli",
      receipts: 114027501,
      payments: 122897621,
      totalAvailable: 4027501,
      paymentAmount: 897621,
      unspentAmount: 4027501 - 897621,
      utilizationPercentage: (897621 / 4027501) * 100,
      vouchers: {
        rv: 2,
        pv: 9,
        cv: 0,
        jv: 3,
      },
      processedAt: new Date().toISOString(),
    },
  ];
  const districtDataExpend = blockDataExpend.filter(
    (item) => item.name === blockId
  )?.[0];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="p-6 space-y-8 max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="relative border-b pb-2">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/districts/${blockData.district}`)}
              className="mb-2 bg-white/80 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {blockData.district}
            </Button>
            <div className="text-left">
              <h1 className="text-3xl capitalize leading-relaxed font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-2">
                {blockId} Block - Village Level Analytics
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Comprehensive village-wise fund utilization analysis for{" "}
                {blockData.district} district, {blockData.state}
              </p>
            </div>
          </div>
        </div>

        <BlockOverviewCard villageId={blockId} villageData={blockData} />
        {/* Advanced Filters with enhanced styling */}
        {/* <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Select disabled defaultValue="pune">
                <SelectTrigger className="bg-white/50 text-gray-800 backdrop-blur border-white/20 shadow-lg rounded-xl">
                  <SelectValue placeholder="District" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-lg border-white/20 shadow-2xl rounded-xl">
                  <SelectItem value="pune">Pune</SelectItem>
                </SelectContent>
              </Select>

              <Select disabled defaultValue="Maval">
                <SelectTrigger className="bg-white/50 text-black backdrop-blur border-white/20 shadow-lg rounded-xl">
                  <SelectValue placeholder="Block" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-lg border-white/20 shadow-2xl rounded-xl">
                  <SelectItem value="Maval">Maval</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="2024-25">
                <SelectTrigger className="bg-white/50 backdrop-blur border-white/20 shadow-lg rounded-xl">
                  <SelectValue placeholder="Financial Year" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-lg border-white/20 shadow-2xl rounded-xl">
                  {financialYears.map((finYear) => (
                    <SelectItem value={finYear.value}>
                      FY {finYear.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={() => openPdf()}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-2xl shadow-red-500/25 rounded-xl border-0 transition-all duration-300"
              >
                <Download className="h-4 w-4 mr-2" />
                Generate PDF Report
              </Button>
            </div>
          </CardContent>
        </Card> */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-indigo-100 to-purple-100">
            <h2 className="text-xl font-bold text-black">
              Voucher Details - {districtDataExpend?.name}
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Receipt Voucher
                    </p>
                    <p className="text-3xl font-bold text-gray-700">
                      {districtDataExpend?.vouchers.rv}
                    </p>
                  </div>
                  <div className="p-3 bg-green-300 rounded-full">
                    <svg
                      className="w-6 h-6 text-green-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  RV - Receipt Voucher
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Payment Voucher
                    </p>
                    <p className="text-3xl font-bold text-gray-700">
                      {districtDataExpend?.vouchers.pv}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-300 rounded-full">
                    <svg
                      className="w-6 h-6 text-blue-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 0h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v2"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  PV - Payment Voucher
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Contra Voucher
                    </p>
                    <p className="text-3xl font-bold text-gray-700">
                      {districtDataExpend?.vouchers.cv}
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-300 rounded-full">
                    <svg
                      className="w-6 h-6 text-yellow-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  CV - Contra Voucher
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Journal Voucher
                    </p>
                    <p className="text-3xl font-bold text-gray-700">
                      {districtDataExpend?.vouchers.jv}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-300 rounded-full">
                    <svg
                      className="w-6 h-6 text-purple-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  JV - Journal Voucher
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-gray-200 to-gray-300">
            <h2 className="text-xl font-bold text-gray-800">
              Expenditure Summary
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-2xl font-bold text-black">
                  {formatCurrencyFull(districtDataExpend?.receipts)}
                </p>
                <p className="text-sm text-gray-700 font-medium">
                  Total Receipts
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Amount received by district
                </p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-2xl font-bold text-black">
                  {formatCurrencyFull(districtDataExpend?.payments)}
                </p>
                <p className="text-sm text-gray-700 font-medium">
                  Total Payments
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Amount spent by district
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Village Financial Overview Table with enhanced styling */}
        <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100/50">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              Village Financial Overview & Unspent Balance Sheet
            </CardTitle>
            <CardDescription className="text-gray-600">
              Comprehensive village-wise financial data with fund utilization
              details
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50">
                    <TableHead className="font-bold text-gray-700">
                      Village Name
                    </TableHead>
                    <TableHead className="font-bold text-gray-700">
                      Total Funds
                    </TableHead>
                    <TableHead className="font-bold text-gray-700">
                      Spent Funds
                    </TableHead>
                    <TableHead className="font-bold text-gray-700">
                      Unspent Balance
                    </TableHead>
                    <TableHead className="font-bold text-gray-700">
                      Utilization %
                    </TableHead>
                    <TableHead className="font-bold text-gray-700">
                      Grade
                    </TableHead>
                    <TableHead className="font-bold text-gray-700">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {villageFinancialData?.[blockId]?.map((village) => (
                    <TableRow
                      key={village.id}
                      className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
                    >
                      <TableCell className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {village.name}
                      </TableCell>
                      <TableCell className="font-semibold text-blue-600">
                        {village.totalFunds}
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">
                        {village.spentFunds}
                      </TableCell>
                      <TableCell className="font-semibold text-orange-600">
                        {village.unspentBalance}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            village.utilization >= 40
                              ? "bg-gradient-to-r from-green-100 text-green-600 to-emerald-100"
                              : village.utilization >= 20
                              ? "bg-gradient-to-r from-blue-100 text-indigo-600 to-indigo-100"
                              : "bg-gradient-to-r from-yellow-100 text-orange-600 to-orange-100"
                          }  border-0 shadow-lg`}
                        >
                          {village.utilization}%
                        </Badge>
                      </TableCell>
                      <TableCell>{getGradeBadge(village.grade)}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(village.name)}
                          className="flex items-center gap-2 bg-white/50 backdrop-blur border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
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
        <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-indigo-500/10 rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100/50">
            <CardTitle className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  Assets Overview
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-blue-500/10 rounded-3xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl shadow-lg">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {assetsData.length}
                      </div>
                      <p className="text-gray-600 font-medium">Total Assets</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-green-500/10 rounded-3xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl shadow-lg">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        
                        {formatCurrencyFull(assetsData
                          .filter((asset) => asset.percentageSpent === 100)
                          .reduce(
                            (sum, asset) => sum + asset.amountProvisioned,
                            0
                          ))
                          }
                      </div>
                      <p className="text-gray-600 font-medium">
                        Completed Value
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-yellow-500/10 rounded-3xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl shadow-lg">
                      <AlertTriangle className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                        {formatCurrencyFull(assetsData
                          .filter(
                            (asset) =>
                              asset.percentageSpent > 0 &&
                              asset.percentageSpent < 100
                          )
                          .reduce(
                            (sum, asset) => sum + asset.amountProvisioned,
                            0
                          ))}
                      </div>
                      <p className="text-gray-600 font-medium">
                        In Progress Value
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-red-500/10 rounded-3xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl shadow-lg">
                      <TrendingUp className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                        ₹
                        {assetsData
                          .filter((asset) => asset.percentageSpent === 0)
                          .reduce(
                            (sum, asset) => sum + asset.amountProvisioned,
                            0
                          )}
                      </div>
                      <p className="text-gray-600 font-medium">Pending Value</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100/50">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  Assets Management
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Detailed work progress and asset development tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50">
                        <TableHead className="font-bold text-gray-700">
                          S.No.
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Work Code
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Name
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Scheme Component
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Amount Provisioned
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Amount Spent
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Last Progress Reported
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Work Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assetsData.map((asset) => (
                        <TableRow
                          key={asset.sNo}
                          className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                        >
                          <TableCell className="font-medium">
                            {asset.sNo}
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {asset.workCode}
                          </TableCell>
                          <TableCell className="font-medium">
                            {asset.name}
                          </TableCell>
                          <TableCell>{asset.schemeComponent}</TableCell>
                          <TableCell className="font-semibold text-blue-600">
                            ₹{asset.amountProvisioned.toLocaleString()}
                          </TableCell>
                          <TableCell className="font-semibold text-green-600">
                            ₹{asset.amountSpent.toLocaleString()}
                          </TableCell>
                          
                          <TableCell className="text-sm text-gray-600">
                            {new Date(
                              asset.lastProgressReported
                            ).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                asset.workStatus === "Ongoing" ||
                                asset.workStatus === "In Progress"
                                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 shadow-lg"
                                  : asset.workStatus === "Started"
                                  ? "bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-600 border-0 shadow-lg"
                                  : "bg-gradient-to-r from-gray-500 to-slate-500 text-white border-0 shadow-lg"
                              }
                            >
                              {asset.workStatus}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
        {/* Top Performing Villages with enhanced styling */}
        <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-orange-500/10 rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100/50">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
              Top Performing Villages
            </CardTitle>
            <CardDescription className="text-gray-600">
              Best performing villages by fund utilization
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-orange-50">
                    <TableHead className="font-bold text-gray-700">
                      Rank
                    </TableHead>
                    <TableHead className="font-bold text-gray-700">
                      Village Name
                    </TableHead>
                    <TableHead className="font-bold text-gray-700">
                      Utilization %
                    </TableHead>
                    <TableHead className="font-bold text-gray-700">
                      Total Funds
                    </TableHead>
                    <TableHead className="font-bold text-gray-700">
                      Performance
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPerformingGPs.map((village, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300"
                    >
                      <TableCell className="font-bold text-2xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        #{index + 1}
                      </TableCell>
                      <TableCell className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {village.name}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-gradient-to-r from-green-100 to-emerald-200 text-green-600 border-0 shadow-lg">
                          {village.utilization}%
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-blue-600">
                        {village.funds}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-gradient-to-r from-green-100 to-emerald-200 text-green-600 border-0 shadow-lg">
                          {village.utilization >= 40
                            ? "Excellent"
                            : village.utilization >= 20
                            ? "Good"
                            : "Average"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* AI-Powered Insights Section with enhanced styling */}
        <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-indigo-500/10 rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100/50">
            <CardTitle className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  AI-Powered Insights & Recommendations
                </div>
                <CardDescription className="text-gray-600 mt-1">
                  Automated analysis of village performance with actionable
                  recommendations
                </CardDescription>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aiInsights.map((insight, index) => {
                const IconComponent = insight.icon;
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl border-l-4 shadow-xl transform hover:-translate-y-2 transition-all duration-500 ${
                      insight.type === "success"
                        ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-green-500/20"
                        : insight.type === "warning"
                        ? "border-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-yellow-500/20"
                        : "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-blue-500/20"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-2xl shadow-lg ${
                          insight.type === "success"
                            ? "bg-gradient-to-br from-green-500 to-emerald-500"
                            : insight.type === "warning"
                            ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                            : "bg-gradient-to-br from-blue-500 to-indigo-500"
                        }`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 text-lg">
                          {insight.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                          {insight.description}
                        </p>
                        <p className="text-xs font-medium text-gray-800 bg-white/50 p-2 rounded-lg">
                          <strong>Action:</strong> {insight.action}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Enhanced Interactive Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-2 border-blue-100 shadow-2xl">
          <DialogHeader className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-800 text-center">
              Secure Login Required
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-center leading-relaxed">
              Please authenticate your identity to access sensitive financial
              transaction details. Your security is our priority.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Username or Email
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username or email"
                value={loginData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200 rounded-xl"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200 rounded-xl pr-12"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={handleLoginCancel}
              className="flex-1 h-12 border-2 border-gray-300 hover:border-gray-400 transition-colors duration-200 rounded-xl"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleLoginConfirm}
              disabled={!isFormValid || isLoading}
              className="flex-1 h-12 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 rounded-xl font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Authenticating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Login & View Details
                </div>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlockDetails;
