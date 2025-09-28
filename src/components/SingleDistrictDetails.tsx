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
import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { useSearchParams, useNavigate } from "react-router-dom";

import {
  AlertTriangle,
  ArrowLeftCircle,
  ArrowRightCircle,
  CheckCircle,
  Download,
  Eye,
  EyeOff,
  FileText,
  Info,
  KeyRound,
  Loader2,
  Shield,
  TrendingUp,
  User,
} from "lucide-react";
import { CustomCard } from "./common/commonCard";
import { financialYears } from "@/lib/constants";
import { useEffect, useState } from "react";
import BankTransactionsCard from "./BankTransactionCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { TooltipPortal } from "@radix-ui/react-tooltip";
import VillageOverviewCard from "./VillageCard";
import { formatCurrencyFull } from "@/lib/dataUtils";
import { toast } from "@/hooks/use-toast";
import DistrictOverViewCard from "./DistrictOverViewCard";
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

const SingleDistrictDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedDistrict = searchParams.get("district") || "Pune";
  const [selectedBlock, setSelectedBlock] = useState("all");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const handleInputChange = (field: string, value: string) => {
    setLoginData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const [currentBalance, setCurrentBalance] = useState("");
  const assetsData = [
    {
      sNo: 1,
      workCode: "79416002",
      name: "Construction of Community Sanitary Complex",
      workNature: "Asset",
      scheme: "XV Finance Commission",
      schemeComponent: "Tied Grant",
      amountProvisioned: 360000,
      amountSpent: 702211,
      percentageSpent: 195.06,
      lastProgressReported: "2024-02-23 18:38:13.557",
      workStatus: "Ongoing",
    },
    {
      sNo: 2,
      workCode: "79419345",
      name: "Construction of toilets in public institutions",
      workNature: "Asset",
      scheme: "XV Finance Commission",
      schemeComponent: "Tied Grant",
      amountProvisioned: 250000,
      amountSpent: 210000,
      percentageSpent: 84,
      lastProgressReported: "2024-03-05 14:22:10.000",
      workStatus: "Completed",
    },
    {
      sNo: 3,
      workCode: "79561783",
      name: "Drainage Construction",
      workNature: "Asset",
      scheme: "XV Finance Commission",
      schemeComponent: "Tied Grant",
      amountProvisioned: 500000,
      amountSpent: 350000,
      percentageSpent: 70,
      lastProgressReported: "2024-04-12 11:05:45.000",
      workStatus: "Ongoing",
    },
    {
      sNo: 4,
      workCode: "79577231",
      name: "Purchase of segregation bins to be fixed at public places",
      workNature: "Asset",
      scheme: "XV Finance Commission",
      schemeComponent: "Tied Grant",
      amountProvisioned: 150000,
      amountSpent: 180000,
      percentageSpent: 120,
      lastProgressReported: "2024-05-20 16:40:30.000",
      workStatus: "Ongoing",
    },
    {
      sNo: 5,
      workCode: "79581813",
      name: "Drainage Construction",
      workNature: "Asset",
      scheme: "XV Finance Commission",
      schemeComponent: "Tied Grant",
      amountProvisioned: 360000,
      amountSpent: 702211,
      percentageSpent: 195.06,
      lastProgressReported: "2024-02-23 18:38:13.557",
      workStatus: "Ongoing",
    },
  ];
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
  const handleViewDetails = (blockId: string) => {
    if (blockId === "Shirur" || blockId === "Haveli") {
      navigate(`/block/${blockId}`);
    } else {
      toast({
        title: "This is under progress",
        description: `${blockId} details are not yet available.`,
        variant: "default", // or "destructive" if you want red styling
      });
    }
  };

  const blockLevelData = [
    {
      blockName: "Haveli",
      totalGPs: 70,
      totalVillages: 160,
      population: 310200,
      fundsReceived: 400000000,
      fundsSpent: 180000000,
      unspentBalance: 220000000,
      utilizationPercent: 45.0,
      topPerformingGP: "Shivane",
      bottomPerformingGP: "Holkarwadi",
      status: "Excellent",
      lastUpdated: "15-Jun-2025",
    },
    {
      blockName: "Shirur",
      totalGPs: 50,
      totalVillages: 140,
      population: 230000,
      fundsReceived: 320000000,
      fundsSpent: 64000000,
      unspentBalance: 256000000,
      utilizationPercent: 20.0,
      topPerformingGP: "Ranjangaon",
      bottomPerformingGP: "Shikrapur",
      status: "Good",
      lastUpdated: "15-Jun-2025",
    },
    {
      blockName: "Maval",
      totalGPs: 52,
      totalVillages: 137,
      population: 215100,
      fundsReceived: 370682408.22,
      fundsSpent: 118905206.28,
      unspentBalance: 251777202,
      utilizationPercent: 32.07,
      topPerformingGP: "Talegaon",
      bottomPerformingGP: "Ambegaon",
      status: "Excellent",
      lastUpdated: "15-Jun-2025",
    },
    {
      blockName: "Mulshi",
      totalGPs: 40,
      totalVillages: 105,
      population: 188900,
      fundsReceived: 290784600.35,
      fundsSpent: 59456920.07,
      unspentBalance: 231327680.28,
      utilizationPercent: 20.44,
      topPerformingGP: "Bhugaon",
      bottomPerformingGP: "Tamhini",
      status: "Good",
      lastUpdated: "15-Jun-2025",
    },
    {
      blockName: "Bhor",
      totalGPs: 48,
      totalVillages: 120,
      population: 202500,
      fundsReceived: 312459800,
      fundsSpent: 62491960,
      unspentBalance: 249967840,
      utilizationPercent: 20.0,
      topPerformingGP: "Nasrapur",
      bottomPerformingGP: "Bajarwadi",
      status: "Good",
      lastUpdated: "15-Jun-2025",
    },
    {
      blockName: "Junnar",
      totalGPs: 65,
      totalVillages: 150,
      population: 275800,
      fundsReceived: 350980000,
      fundsSpent: 87745000,
      unspentBalance: 263235000,
      utilizationPercent: 25.0,
      topPerformingGP: "Narayangaon",
      bottomPerformingGP: "Pimpalgaon",
      status: "Good",
      lastUpdated: "15-Jun-2025",
    },
    {
      blockName: "Ambegaon",
      totalGPs: 60,
      totalVillages: 143,
      population: 242600,
      fundsReceived: 315600000,
      fundsSpent: 63120000,
      unspentBalance: 252480000,
      utilizationPercent: 20.0,
      topPerformingGP: "Manchar",
      bottomPerformingGP: "Khedgaon",
      status: "Good",
      lastUpdated: "15-Jun-2025",
    },
    {
      blockName: "Baramati",
      totalGPs: 55,
      totalVillages: 132,
      population: 290000,
      fundsReceived: 385000000,
      fundsSpent: 192500000,
      unspentBalance: 192500000,
      utilizationPercent: 50.0,
      topPerformingGP: "Malegaon",
      bottomPerformingGP: "Bhigwan",
      status: "Excellent",
      lastUpdated: "15-Jun-2025",
    },
    {
      blockName: "Indapur",
      totalGPs: 58,
      totalVillages: 125,
      population: 265000,
      fundsReceived: 342678000,
      fundsSpent: 68535600,
      unspentBalance: 274142400,
      utilizationPercent: 20.0,
      topPerformingGP: "Nimgaon Ketki",
      bottomPerformingGP: "Pimpalgaon Nimb",
      status: "Good",
      lastUpdated: "15-Jun-2025",
    },
    {
      blockName: "Purandar",
      totalGPs: 45,
      totalVillages: 110,
      population: 198000,
      fundsReceived: 278000000,
      fundsSpent: 55600000,
      unspentBalance: 222400000,
      utilizationPercent: 20.0,
      topPerformingGP: "Saswad",
      bottomPerformingGP: "Jejuri",
      status: "Good",
      lastUpdated: "15-Jun-2025",
    },
    {
      blockName: "Khed",
      totalGPs: 62,
      totalVillages: 148,
      population: 248000,
      fundsReceived: 360000000,
      fundsSpent: 72000000,
      unspentBalance: 288000000,
      utilizationPercent: 20.0,
      topPerformingGP: "Rajgurunagar",
      bottomPerformingGP: "Chakan",
      status: "Good",
      lastUpdated: "15-Jun-2025",
    },
    {
      blockName: "Daund",
      totalGPs: 47,
      totalVillages: 118,
      population: 220000,
      fundsReceived: 305000000,
      fundsSpent: 152500000,
      unspentBalance: 152500000,
      utilizationPercent: 50.0,
      topPerformingGP: "Yawat",
      bottomPerformingGP: "Kedgaon",
      status: "Excellent",
      lastUpdated: "15-Jun-2025",
    },
    // {
    //   blockName: "Velhe",
    //   totalGPs: 38,
    //   totalVillages: 90,
    //   population: 155000,
    //   fundsReceived: 250000000,
    //   fundsSpent: 25000000,
    //   unspentBalance: 225000000,
    //   utilizationPercent: 10.0,
    //   topPerformingGP: "Velhe",
    //   bottomPerformingGP: "Nandgaon",
    //   status: "Average",
    //   lastUpdated: "15-Jun-2025",
    // },
  ];

  const filteredData = blockLevelData.filter((district) => {
    const matchesDistrict =
      selectedBlock === "all" ||
      district.blockName.toLowerCase() === selectedBlock.toLowerCase();
    return matchesDistrict; // Since we only have current year data, we'll show all for now
  });

  const filterBlockScheme = blockPerformanceData.filter((district) => {
    const matchesDistrict =
      selectedBlock === "all" ||
      district.blockName.toLowerCase() === selectedBlock.toLowerCase();
    return matchesDistrict; // Since we only have current year data, we'll show all for now
  });
  console.log(filterBlockScheme, "filterBlockScheme");

  const districtData = {
    id: "pune",
    district: "Pune",
    state: "Maharashtra",
    population: "12500",
    households: 2800,
    area: 450,
    totalFunds: "53073630440",
    spentFunds: "18421645827",
    unspentBalance: "34651998461",
    utilization: 65,
    activeSchemes: "XV Finance,MGNREGA, SBM, PMAY-G",
  };
  const blockOptions = [
    { label: "Maval", value: "Maval" },
    { label: "Mulshi", value: "Mulshi" },
    { label: "Bhor", value: "Bhor" },
    { label: "Haveli", value: "Haveli" },
    { label: "Junnar", value: "Junnar" },
    { label: "Ambegaon", value: "Ambegaon" },
    { label: "Baramati", value: "Baramati" },
    { label: "Indapur", value: "Indapur" },
    { label: "Purandar", value: "Purandar" },
    { label: "Shirur", value: "Shirur" },
    { label: "Khed", value: "Khed" },
    { label: "Daund", value: "Daund" },
    { label: "Velhe", value: "Velhe" },
  ];

  const aiInsights = [
    {
      type: "success",
      icon: CheckCircle,
      title: "Strong Performance",
      description:
        "3 out of 5 blocks (60%) are achieving high utilization rates above 75%",
      action:
        "Share best practices from Bhor, Maval, and Mulshi with underperforming blocks",
    },
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Underutilization Alert",
      description:
        "Maval and Mulshi blocks have 70% utilization with ₹8.25L total unspent funds",
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

  const getStatusBadge = (status: string, utilization: number) => {
    if (utilization >= 80)
      return (
        <Badge className="bg-gradient-to-r from-green-100 to-emerald-200 text-green-600 border-0 shadow-lg">
          Excellent
        </Badge>
      );
    if (utilization >= 60)
      return (
        <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-600 border-0 shadow-lg">
          Good
        </Badge>
      );
    if (utilization >= 40)
      return (
        <Badge className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-600 border-0 shadow-lg">
          Average
        </Badge>
      );
    return (
      <Badge className="bg-gradient-to-r from-red-100 to-pink-100 text-red-400 border-0 shadow-lg">
        Poor
      </Badge>
    );
  };
  const openPdf = () => {
    window.open("/Pune_District_Blocks_Summary.pdf", "_blank");
  };
  const districtDataExpend = {
    name: "Pune",
    receipts: 144871538,
    payments: 19102011,
    totalAvailable: 144871538,
    paymentAmount: 19102011,
    unspentAmount: 144871538 - 19102011,
    utilizationPercentage: (19102011 / 144871538) * 100,
    vouchers: {
      rv: 4, // Receipt Voucher
      pv: 64, // Payment Voucher
      cv: 0, // Contra Voucher
      jv: 0, // Journal Voucher
    },
    processedAt: "2025-09-22T16:24:39.420+00:00",
  };
  const [lang, setLang] = useState(document.documentElement.lang || "en");

  useEffect(() => {
    // Create observer to watch for changes in <html> attributes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "lang"
        ) {
          setLang(document.documentElement.lang || "en");
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    // Cleanup on unmount
    return () => observer.disconnect();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="p-6 space-y-8 max-w-7xl mx-auto">
        {/* Header with gradient background */}
        <div className="relative border-b pb-2">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => navigate("/districts")}
              className="mb-2 bg-white/80 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl"
            >
              <ArrowLeftCircle className="mr-2" /> Back to All Districts
            </Button>
            <div className="text-left">
              <h1 className="text-4xl font-bold leading-relaxed bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                {selectedDistrict} District - Block Level Analytics
              </h1>
              <p className="text-xl text-gray-600  leading-relaxed">
                Comprehensive block-wise fund utilization and performance
                tracking
              </p>
            </div>
          </div>
        </div>
        <DistrictOverViewCard
          villageId={selectedDistrict}
          villageData={districtData}
        />
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
        {/* Advanced Filters with enhanced styling */}
        <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Select disabled defaultValue="kolhapur">
                <SelectTrigger className="bg-white/50 text-gray-800 backdrop-blur border-white/20 shadow-lg rounded-xl">
                  <SelectValue placeholder="District" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-lg border-white/20 shadow-2xl rounded-xl">
                  <SelectItem value="kolhapur">Pune</SelectItem>
                </SelectContent>
              </Select>

              <Select
                defaultValue="all"
                value={selectedBlock}
                onValueChange={setSelectedBlock}
              >
                <SelectTrigger className="bg-white/50 backdrop-blur border-white/20 shadow-lg rounded-xl">
                  <SelectValue placeholder="Block" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-lg border-white/20 shadow-2xl rounded-xl">
                  <SelectItem value="all">All Blocks</SelectItem>
                  {blockOptions.map((block) => (
                    <SelectItem value={block.value}>{block.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select defaultValue="2024-25">
                <SelectTrigger className="bg-white/50 backdrop-blur border-white/20 shadow-lg rounded-xl">
                  <SelectValue placeholder="Financial Year" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-lg border-white/20 shadow-2xl rounded-xl">
                  {financialYears.map((finYear) => (
                    <SelectItem key={finYear.value} value={finYear.value}>
                      FY {finYear.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={() => openPdf()}
                className="bg-gradient-to-r from-blue-200 to-indigo-200 hover:from-blue-100 hover:to-indigo-100 text-blue-700 shadow-2xl shadow-red-500/25 rounded-xl border-0 transition-all duration-300"
              >
                <Download className="h-4 w-4 mr-2" />
                Generate PDF Report
              </Button>
            </div>

            {/* Block-wise Performance Summary with enhanced styling */}
            <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl mt-8 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100/50">
                <CardTitle className="flex flex-row justify-between">
                  <div className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    Block-wise Performance Summary
                  </div>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Detailed fund utilization across all blocks in{" "}
                  {selectedDistrict} district
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50">
                        <TableHead className="font-bold text-gray-700">
                          Block Name
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Total Villages
                        </TableHead>
                        {/* <TableHead className="font-bold text-gray-700">Population</TableHead> */}
                        <TableHead className="font-bold text-gray-700">
                          Funds Received
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Funds Spent
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          % Utilized
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Top Performing GP
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Bottom Performing GP
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Status
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Last Updated
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((block, index) => (
                        <TableRow
                          key={index}
                          className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
                        >
                          <TableCell className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {block.blockName}
                          </TableCell>
                          <TableCell className="font-medium">
                            {block.totalVillages}
                          </TableCell>
                          {/* <TableCell className="font-medium">
                        {block.population.toLocaleString()}
                      </TableCell> */}
                          <TableCell className="font-semibold text-blue-600">
                            {formatCurrencyFull(block.fundsReceived)}
                          </TableCell>
                          <TableCell className="font-semibold text-green-600">
                            {formatCurrencyFull(block.fundsSpent)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${
                                block.utilizationPercent >= 70
                                  ? "bg-gradient-to-r from-green-100 text-green-500 to-emerald-100"
                                  : "bg-gradient-to-r from-red-100 text-red-500  to-pink-100"
                              }  border-0 shadow-lg`}
                            >
                              {block.utilizationPercent}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-green-600 font-medium">
                            {block.topPerformingGP}
                          </TableCell>
                          <TableCell className="text-red-600 font-medium">
                            <span
                              className={lang === "en" ? "notranslate" : ""}
                              translate={lang === "en" ? "no" : "yes"}
                            >
                              {block.bottomPerformingGP}
                            </span>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(
                              block.status,
                              block.utilizationPercent
                            )}
                          </TableCell>
                          <TableCell className="font-medium">
                            {block.lastUpdated}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewDetails(block.blockName)}
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
                          .filter((asset) => asset.workStatus === "Completed")
                          .reduce(
                            (sum, asset) => sum + asset.amountProvisioned,
                            0
                          ))}
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
                        
                        {formatCurrencyFull(assetsData
                          .filter((asset) => asset.percentageSpent === 0)
                          .reduce(
                            (sum, asset) => sum + asset.amountProvisioned,
                            0
                          ))}
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
                  Automated analysis of block performance with actionable
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

export default SingleDistrictDetails;
