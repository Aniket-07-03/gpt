"use client";

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
import "chart.js/auto";
import {
  AlertTriangle,
  ArrowLeftCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Info,
  KeyRound,
  Shield,
  TrendingUp,
  Unlock,
  User,
  CreditCard,
  DollarSign,
  IndianRupee,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BankTransactionsCard from "./BankTransactionCard";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { TooltipPortal } from "@radix-ui/react-tooltip";
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
import FilterConfirmationDialog from "./filterConfirmation";
import VillageOverviewCard from "./VillageCard";
import { formatCurrencyFull } from "@/lib/dataUtils";

const VillageDetails = () => {
  const navigate = useNavigate();
  const { villageId, blockId } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);

  // Show only last 5 transactions

  // Sample assets data matching the requested structure
  const assetsData = [
    {
      sNo: 1,
      workCode: "92556227",
      name: "Drainage Construction",
      workNature: "Asset",
      scheme: "XV Finance Commission",
      schemeComponent: "Tied Grant",
      amountProvisioned: 257076,
      amountSpent: 257076,
      percentageSpent: 100.0,
      lastProgressReported: "2024-11-13 15:25:23.623",
      workStatus: "Ongoing",
    },
    {
      sNo: 2,
      workCode: "92556228",
      name: "Road Construction",
      workNature: "Asset",
      scheme: "XV Finance Commission",
      schemeComponent: "Tied Grant",
      amountProvisioned: 450000,
      amountSpent: 337500,
      percentageSpent: 75.0,
      lastProgressReported: "2024-11-10 10:30:15.123",
      workStatus: "Ongoing",
    },
    {
      sNo: 3,
      workCode: "92556229",
      name: "Construction and Maintenance of e Library",
      workNature: "Asset",
      scheme: "XV Finance Commission",
      schemeComponent: "Basic Grant (untied)",
      amountProvisioned: 48518,
      amountSpent: 43666,
      percentageSpent: 90.0,
      lastProgressReported: "2024-11-08 14:45:30.456",
      workStatus: "Ongoing",
    },
  ];

  // Mock data - in real app, this would be fetched based on villageId
  const villageData = {
    id: villageId,
    villageName: "Adhe",
    block: "Maval",
    district: "Pune",
    state: "Maharashtra",
    population: "12500",
    households: 2800,
    area: 450,
    totalFunds: "12850000",
    spentFunds: "12680000",
    unspentBalance: "12170000",
    utilization: 80,
    activeSchemes: "XV Finance,MGNREGA, SBM, PMAY-G",
  };

  const schemeWiseData = [
    {
      scheme: "XV Finance",
      allocation: "₹3,50,000",
      spent: "₹2,80,000",
      unspent: "₹70,000",
      utilization: 80,
      beneficiaries: 450,
      workDays: 2800,
    },
    {
      scheme: "MGNREGA",
      allocation: "₹3,50,000",
      spent: "₹2,80,000",
      unspent: "₹70,000",
      utilization: 80,
      beneficiaries: 450,
      workDays: 2800,
    },
    {
      scheme: "SBM (Swachh Bharat Mission)",
      allocation: "₹2,50,000",
      spent: "₹2,00,000",
      unspent: "₹50,000",
      utilization: 80,
      beneficiaries: 180,
      workDays: 0,
    },
    {
      scheme: "PMAY-G (Housing)",
      allocation: "₹2,50,000",
      spent: "₹2,00,000",
      unspent: "₹50,000",
      utilization: 80,
      beneficiaries: 85,
      workDays: 0,
    },
  ];

  const monthlyUtilizationData = [
    { month: "Apr", utilization: 35, target: 50 },
    { month: "May", utilization: 42, target: 55 },
    { month: "Jun", utilization: 48, target: 60 },
    { month: "Jul", utilization: 55, target: 65 },
    { month: "Aug", utilization: 62, target: 70 },
    { month: "Sep", utilization: 68, target: 75 },
    { month: "Oct", utilization: 75, target: 80 },
    { month: "Nov", utilization: 80, target: 80 },
  ];

  const workTypeDistribution = [
    { name: "Road Construction", value: 35, color: "#10b981" },
    { name: "Water Conservation", value: 25, color: "#3b82f6" },
    { name: "Agriculture", value: 20, color: "#f59e0b" },
    { name: "Infrastructure", value: 20, color: "#8b5cf6" },
  ];

  const aiInsights = [
    {
      type: "success",
      icon: CheckCircle,
      title: "Strong Performance",
      description:
        "Village shows consistent 80% utilization across all major schemes",
      action:
        "Continue current implementation strategies and maintain momentum",
    },
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Pending Projects",
      description:
        "₹1,70,000 remains unspent with 2 ongoing projects requiring attention",
      action: "Accelerate project completion to meet quarterly targets",
    },
    {
      type: "trend",
      icon: TrendingUp,
      title: "Beneficiary Impact",
      description:
        "715 direct beneficiaries served across multiple welfare schemes",
      action: "Expand outreach to cover remaining eligible households",
    },
  ];

  useEffect(() => {
    if (!villageId) {
      setDialogOpen(true);
    }
  }, [villageId]);
  function formatToCr(value: number): string {
    if (isNaN(value)) return "N/A";
    const inCr = value / 10000000; // 1 Cr = 1,00,00,000
    return `₹${inCr.toFixed(2)} Cr`;
  }
  function removeCommas(value: string | number): string {
    return value.toString().replace(/,/g, "");
  }
  const blockDataExpend = [
    {
      name: "Uruli Kanchan",
      receipts: 13523770,
      payments: 2318307,
      totalAvailable: 13523770,
      paymentAmount: 2318307,
      unspentAmount: 13523770 - 2318307,
      utilizationPercentage: (2318307 / 13523770) * 100,
      vouchers: {
        rv: 4, // Receipt Voucher
        pv: 11, // Payment Voucher
        cv: 0, // Contra Voucher
        jv: 1, // Journal Voucher
      },
      processedAt: new Date().toISOString(), // current timestamp
    },
    {
      name: "Burkegaon",
      receipts: 4027501,
      payments: 897621,
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
    {
      name: "Dhoksanghavi",
      receipts: 4027501,
      payments: 897621,
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
    {
      name: "Dhamari",
      receipts: 4027501,
      payments: 897621,
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
    (item) => item.name === villageId
  )?.[0];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with gradient background */}
        <div className="relative border-b pb-2">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => navigate(`/block/${blockId}`)}
              className="mb-2 bg-white/80 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl"
            >
              <ArrowLeftCircle className="mr-2" /> Back to {blockId}
            </Button>
            <div className="text-left">
              <h1 className="text-4xl capitalize font-bold leading-relaxed bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                {villageId} Village
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Comprehensive fund utilization analysis for {villageData.block}{" "}
                block, {villageData.district} district, {villageData.state}
              </p>
            </div>
          </div>
        </div>
        {/* All existing overview content */}
        {/* Key Metrics Grid */}

        {/* Village Financial Overview with enhanced styling */}
        <VillageOverviewCard villageId={villageId} villageData={villageData} />
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

        {/* Charts Section with enhanced styling */}
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
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
        </div>
      </div>

      <FilterConfirmationDialog
        open={dialogOpen}
        onOpenChange={() => setDialogOpen(false)}
        onConfirm={() => setDialogOpen(false)}
        isVillage={true}
      />
    </div>
  );
};

export default VillageDetails;
