import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { BarChart3, TrendingUp, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatCurrencyFull } from "@/lib/dataUtils";

const AnalyticsDashboard = () => {
  const navigate = useNavigate();

  const districtData = [
    {
      name: "Pune",
      totalReceived: 53073630440.09,
      spentAmount: 18421645827.1,
      unspentAmount: 34651998461.38,
      utilizationPercentage: 34.7,
    },
    {
      name: "Ahmednagar",
      totalReceived: 30000000000,
      spentAmount: 9000000000,
      unspentAmount: 21000000000,
      utilizationPercentage: 30.0,
    },
    {
      name: "Amravati",
      totalReceived: 8000000000,
      spentAmount: 3600000000,
      unspentAmount: 4400000000,
      utilizationPercentage: 45.0,
    },
    {
      name: "Aurangabad",
      totalReceived: 12000000000,
      spentAmount: 2500000000,
      unspentAmount: 9500000000,
      utilizationPercentage: 20.83,
    },
    {
      name: "Bhandara",
      totalReceived: 6000000000,
      spentAmount: 900000000,
      unspentAmount: 5100000000,
      utilizationPercentage: 15.0,
    },
    {
      name: "Buldhana",
      totalReceived: 7200000000,
      spentAmount: 3500000000,
      unspentAmount: 3700000000,
      utilizationPercentage: 48.61,
    },
    {
      name: "Chandrapur",
      totalReceived: 5500000000,
      spentAmount: 1800000000,
      unspentAmount: 3700000000,
      utilizationPercentage: 32.73,
    },
    {
      name: "Dhule",
      totalReceived: 4000000000,
      spentAmount: 800000000,
      unspentAmount: 3200000000,
      utilizationPercentage: 20.0,
    },
    {
      name: "Gadchiroli",
      totalReceived: 3000000000,
      spentAmount: 600000000,
      unspentAmount: 2400000000,
      utilizationPercentage: 20.0,
    },
    {
      name: "Gondia",
      totalReceived: 4200000000,
      spentAmount: 400000000,
      unspentAmount: 3800000000,
      utilizationPercentage: 9.52,
    },
    {
      name: "Hingoli",
      totalReceived: 2500000000,
      spentAmount: 1100000000,
      unspentAmount: 1400000000,
      utilizationPercentage: 44.0,
    },
    {
      name: "Jalgaon",
      totalReceived: 2700000000,
      spentAmount: 400000000,
      unspentAmount: 2300000000,
      utilizationPercentage: 14.81,
    },
    {
      name: "Jalna",
      totalReceived: 3400000000,
      spentAmount: 1400000000,
      unspentAmount: 2000000000,
      utilizationPercentage: 41.18,
    },
    {
      name: "Kolhapur",
      totalReceived: 2900000000,
      spentAmount: 500000000,
      unspentAmount: 2400000000,
      utilizationPercentage: 17.24,
    },
    {
      name: "Latur",
      totalReceived: 3600000000,
      spentAmount: 900000000,
      unspentAmount: 2700000000,
      utilizationPercentage: 25.0,
    },
    {
      name: "Nagpur",
      totalReceived: 3300000000,
      spentAmount: 1600000000,
      unspentAmount: 1700000000,
      utilizationPercentage: 48.48,
    },
    {
      name: "Nanded",
      totalReceived: 2200000000,
      spentAmount: 500000000,
      unspentAmount: 1700000000,
      utilizationPercentage: 22.73,
    },
    {
      name: "Nandurbar",
      totalReceived: 2800000000,
      spentAmount: 1200000000,
      unspentAmount: 1600000000,
      utilizationPercentage: 42.86,
    },
    {
      name: "Nashik",
      totalReceived: 2400000000,
      spentAmount: 400000000,
      unspentAmount: 2000000000,
      utilizationPercentage: 16.67,
    },
    {
      name: "Osmanabad",
      totalReceived: 2600000000,
      spentAmount: 1000000000,
      unspentAmount: 1600000000,
      utilizationPercentage: 38.46,
    },
    {
      name: "Parbhani",
      totalReceived: 2000000000,
      spentAmount: 600000000,
      unspentAmount: 1400000000,
      utilizationPercentage: 30.0,
    },
    {
      name: "Raigad",
      totalReceived: 1800000000,
      spentAmount: 750000000,
      unspentAmount: 1050000000,
      utilizationPercentage: 41.67,
    },
    {
      name: "Ratnagiri",
      totalReceived: 1900000000,
      spentAmount: 800000000,
      unspentAmount: 1100000000,
      utilizationPercentage: 42.11,
    },
    {
      name: "Sangli",
      totalReceived: 2100000000,
      spentAmount: 900000000,
      unspentAmount: 1200000000,
      utilizationPercentage: 42.86,
    },
    {
      name: "Satara",
      totalReceived: 1850000000,
      spentAmount: 350000000,
      unspentAmount: 1500000000,
      utilizationPercentage: 18.92,
    },
    {
      name: "Sindhudurg",
      totalReceived: 2000000000,
      spentAmount: 400000000,
      unspentAmount: 1600000000,
      utilizationPercentage: 20.0,
    },
    {
      name: "Solapur",
      totalReceived: 2400000000,
      spentAmount: 1000000000,
      unspentAmount: 1400000000,
      utilizationPercentage: 41.67,
    },
    {
      name: "Thane",
      totalReceived: 3100000000,
      spentAmount: 800000000,
      unspentAmount: 2300000000,
      utilizationPercentage: 25.81,
    },
    {
      name: "Wardha",
      totalReceived: 1600000000,
      spentAmount: 700000000,
      unspentAmount: 900000000,
      utilizationPercentage: 43.75,
    },
    {
      name: "Washim",
      totalReceived: 3400000000,
      spentAmount: 1300000000,
      unspentAmount: 2100000000,
      utilizationPercentage: 38.24,
    },
    {
      name: "Yavatmal",
      totalReceived: 1400000000,
      spentAmount: 300000000,
      unspentAmount: 1100000000,
      utilizationPercentage: 21.43,
    },
    {
      name: "Palghar",
      totalReceived: 1800000000,
      spentAmount: 350000000,
      unspentAmount: 1450000000,
      utilizationPercentage: 19.44,
    },
  ];

  const schemeProgress = [
    { month: "Jan", completed: 45, ongoing: 23, planned: 12 },
    { month: "Feb", completed: 52, ongoing: 31, planned: 18 },
    { month: "Mar", completed: 61, ongoing: 28, planned: 15 },
    { month: "Apr", completed: 58, ongoing: 35, planned: 22 },
    { month: "May", completed: 72, ongoing: 42, planned: 28 },
    { month: "Jun", completed: 68, ongoing: 38, planned: 25 },
  ];

  const budgetAllocation = [
    { name: "Rural Development", value: 35, color: "#FF6B6B" },
    { name: "Infrastructure", value: 28, color: "#4ECDC4" },
    { name: "Education", value: 18, color: "#45B7D1" },
    { name: "Healthcare", value: 12, color: "#96CEB4" },
    { name: "Others", value: 7, color: "#FFEAA7" },
  ];

  return (
    <div className="min-h-screen ">
      <section id="analytics" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative">
              {/* <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl shadow-orange-500/25">
                  <BarChart3 className="w-10 h-10 text-white" />
                </div>
              </div> */}
              <h2 className="text-4xl font-bold bg-gradient-to-r leading-relaxed from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
                Maharashtra Analysis Dashboard
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Comprehensive analytics and insights for Panchayati Raj
                institutions across Maharashtra
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <div className="flex justify-center w-full mb-12">
              <TabsList className="grid grid-cols-2 w-full h-fit bg-white/80 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-2">
                <TabsTrigger
                  value="overview"
                  className="rounded-xl data-[state=active]:bg-gradient-to-r py-3 data-[state=active]:from-blue-500 data-[state=active]:py-3  data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="districts"
                  className="rounded-xl data-[state=active]:bg-gradient-to-r py-3 data-[state=active]:from-blue-500 data-[state=active]:py-3 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300"
                >
                  Districts
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-h-fit">
                {/* 3D Bar Chart */}
                <div className="flex flex-col gap-12">
                  <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-blue-500/10 rounded-3xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100/50">
                      <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        District-wise Funds Received
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Total Funds Received across all districts
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                      <Bar
                        data={{
                          labels: districtData.map((d) => d.name),
                          datasets: [
                            {
                              label: "Funds Received",
                              data: districtData.map((d) => d.totalReceived),
                              backgroundColor: ["#667eea"],
                              borderRadius: 12,
                              borderSkipped: false,
                              borderWidth: 0,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: { display: false },
                            tooltip: {
                              backgroundColor: "rgba(0,0,0,0.9)",
                              titleFont: { size: 16, weight: "bold" },
                              bodyFont: { size: 14 },
                              padding: 16,
                              cornerRadius: 12,
                              displayColors: false,
                              callbacks: {
                                label: (context) =>
                                  `Funds Received: ${formatCurrencyFull(
                                    context.parsed.y
                                  )}`,
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
                              },
                            },
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-blue-500/10 rounded-3xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100/50">
                      <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-[#fdae4d] to-[#FF8C00] rounded-full"></div>
                        District-wise Expenditure
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Total Expenditure across all districts
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                      <Bar
                        data={{
                          labels: districtData.map((d) => d.name),
                          datasets: [
                            {
                              label: "Funds Received",
                              data: districtData.map((d) => d.spentAmount),
                              backgroundColor: ["#FF8C00"],
                              borderRadius: 12,
                              borderSkipped: false,
                              borderWidth: 0,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: { display: false },
                            tooltip: {
                              backgroundColor: "rgba(0,1,0,0.9)",
                              titleFont: { size: 16, weight: "bold" },
                              bodyFont: { size: 14 },
                              padding: 16,
                              cornerRadius: 12,
                              displayColors: false,
                              callbacks: {
                                label: (context) =>
                                  `Expenditure: ${formatCurrencyFull(
                                    context.parsed.y
                                  )}`,
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
                              },
                            },
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-blue-500/10 rounded-3xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100/50">
                      <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-[#4ba15f] to-[#28a745] rounded-full"></div>
                        District-wise Unspent Balance
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Total Unspent Balance across all districts
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                      <Bar
                        data={{
                          labels: districtData.map((d) => d.name),
                          datasets: [
                            {
                              label: "Unspent Balance",
                              data: districtData.map((d) => d.unspentAmount),
                              backgroundColor: ["#28a745"],
                              borderRadius: 12,
                              borderSkipped: false,
                              borderWidth: 0,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: { display: false },
                            tooltip: {
                              backgroundColor: "rgba(0,1,0,0.9)",
                              titleFont: { size: 16, weight: "bold" },
                              bodyFont: { size: 14 },
                              padding: 16,
                              cornerRadius: 12,
                              displayColors: false,
                              callbacks: {
                                label: (context) =>
                                  `Unspent Balance: ${formatCurrencyFull(
                                    context.parsed.y
                                  )}`,
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
                              },
                            },
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Progress Cards */}
                <Card className="bg-white/80  backdrop-blur-lg border-0 shadow-2xl shadow-purple-500/10 rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100/50">
                    <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="w-3 flex items-end h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      <span>Scheme Completion Analysis</span>{" "}
                      <span className="text-lg flex items-end font-semibold">
                        (XV Finanace)
                      </span>
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Progress tracking across districts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6 max-h-[1270px] overflow-y-auto">
                      {districtData.map((district, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-800 text-lg">
                              {district.name}
                            </span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                              {district.utilizationPercentage}%
                            </span>
                          </div>
                          <div className="relative">
                            <Progress
                              value={district.utilizationPercentage}
                              className="h-4 bg-gray-100 rounded-full shadow-inner overflow-hidden"
                            />
                            <div
                              className="absolute inset-0 rounded-full opacity-80"
                              style={{
                                background: `linear-gradient(to right, #f87171, #34d399)`, // red to green
                                width: `100%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Districts Tab */}
            <TabsContent value="districts" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {districtData.map((district, index) => (
                  <Card
                    onClick={() => navigate(`/districts/${district.name}`)}
                    key={index}
                    className="group bg-white/80 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer rounded-3xl overflow-hidden transform hover:-translate-y-2 hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardHeader className="relative pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                          {district.name}
                        </CardTitle>
                        <div className="p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                          <MapPin className="w-6 h-6 text-orange-500" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="relative">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                          <span className="text-gray-600 font-medium">
                            Funds Received
                          </span>
                          <span className="font-bold text-xl text-blue-600">
                            {formatCurrencyFull(district.totalReceived)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                          <span className="text-gray-600 font-medium">
                            Expenditure
                          </span>
                          <span className="font-bold text-xl text-purple-600">
                            {formatCurrencyFull(district.spentAmount)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-orange-50 rounded-xl">
                          <span className="text-gray-600 font-medium">
                            Unspent Balance
                          </span>
                          <span className="font-bold text-xl text-purple-600">
                            {formatCurrencyFull(district.unspentAmount)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                          <span className="text-gray-600 font-medium">
                            Utilization %
                          </span>
                          <span className="font-bold text-xl text-green-600">
                            {district.utilizationPercentage}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Schemes Tab */}
            <TabsContent value="schemes" className="space-y-8">
              <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-green-500/10 rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100/50">
                  <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                    Monthly All Scheme Progress
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Track of completed, ongoing, and planned schemes
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <Line
                    data={{
                      labels: schemeProgress.map((s) => s.month),
                      datasets: [
                        {
                          label: "Completed",
                          data: schemeProgress.map((s) => s.completed),
                          borderColor: "#10B981",
                          backgroundColor: "rgba(16, 185, 129, 0.1)",
                          tension: 0.4,
                          borderWidth: 4,
                          pointRadius: 8,
                          pointHoverRadius: 12,
                          pointBackgroundColor: "#10B981",
                          pointBorderColor: "#ffffff",
                          pointBorderWidth: 3,
                          pointHoverBackgroundColor: "#059669",
                          pointHoverBorderColor: "#ffffff",
                          fill: true,
                        },
                        {
                          label: "Ongoing",
                          data: schemeProgress.map((s) => s.ongoing),
                          borderColor: "#F59E0B",
                          backgroundColor: "rgba(245, 158, 11, 0.1)",
                          tension: 0.4,
                          borderWidth: 4,
                          pointRadius: 8,
                          pointHoverRadius: 12,
                          pointBackgroundColor: "#F59E0B",
                          pointBorderColor: "#ffffff",
                          pointBorderWidth: 3,
                          pointHoverBackgroundColor: "#D97706",
                          pointHoverBorderColor: "#ffffff",
                          fill: true,
                        },
                        {
                          label: "Planned",
                          data: schemeProgress.map((s) => s.planned),
                          borderColor: "#3B82F6",
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                          tension: 0.4,
                          borderWidth: 4,
                          pointRadius: 8,
                          pointHoverRadius: 12,
                          pointBackgroundColor: "#3B82F6",
                          pointBorderColor: "#ffffff",
                          pointBorderWidth: 3,
                          pointHoverBackgroundColor: "#2563EB",
                          pointHoverBorderColor: "#ffffff",
                          fill: true,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      interaction: {
                        mode: "index",
                        intersect: false,
                      },
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
                          callbacks: {
                            label: (context) =>
                              `${context.dataset.label}: ${context.parsed.y} schemes`,
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
                          },
                        },
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Budget Tab */}
            <TabsContent value="budget" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 3D Doughnut Chart */}
                <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-pink-500/10 rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100/50">
                    <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
                      Budget Allocation by Sector
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Distribution of funds across different sectors
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <Doughnut
                      data={{
                        labels: budgetAllocation.map((b) => b.name),
                        datasets: [
                          {
                            data: budgetAllocation.map((b) => b.value),
                            backgroundColor: [
                              "#FF6B6B",
                              "#4ECDC4",
                              "#45B7D1",
                              "#96CEB4",
                              "#FFEAA7",
                            ],
                            borderWidth: 0,
                            hoverOffset: 20,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        cutout: "60%",
                        plugins: {
                          legend: {
                            position: "right",
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
                            callbacks: {
                              label: (context) =>
                                `${context.label}: ${context.raw}%`,
                            },
                          },
                        },
                      }}
                    />
                  </CardContent>
                </Card>

                {/* Budget Utilization */}
                <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-indigo-500/10 rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100/50">
                    <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"></div>
                      Budget Utilization
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Sector-wise fund utilization status
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      {budgetAllocation.map((sector, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-800 text-lg">
                              {sector.name}
                            </span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                              {85 + index * 2}% utilized
                            </span>
                          </div>
                          <div className="relative">
                            <Progress
                              value={85 + index * 2}
                              className="h-4 bg-gray-100 rounded-full shadow-inner"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsDashboard;
