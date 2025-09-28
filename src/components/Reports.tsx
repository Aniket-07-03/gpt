import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Calendar, TrendingUp } from "lucide-react";

import { FundUtilizationFilterDialog } from "./FundUtilizationFilterDialog";
import { CustomCard } from "./common/commonCard";
import FilterConfirmationDialog from "./filterConfirmation";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleGenerateFundUtilizationReport = (filters: {
    district: string;
    block: string;
    village: string;
    financialYear: string;
  }) => {
    console.log("Generating report with filters:", filters);
    // TODO: Implement actual report generation
    // This would typically dispatch an action to generate the report
    openPdf()
  };

  const reports = [
    {
      id: 1,
      title: "GP Wise Financial Report",
      description: "Comprehensive monthly performance and statistics",
      date: "2024-06-30",
      status: "Ready",
      type: "Financial",
      size: "2.4 MB",
    },
    {
      id: 2,
      title: "Village Development Progress",
      description: "Rural development initiatives and outcomes",
      date: "2024-06-25",
      status: "Processing",
      type: "Development",
      size: "1.8 MB",
    },
    {
      id: 3,
      title: "Budget Utilization Analysis",
      description: "Financial allocation and expenditure analysis",
      date: "2024-06-20",
      status: "Processing",
      type: "Financial",
      size: "3.2 MB",
    },
    {
      id: 4,
      title: "Citizen Satisfaction Survey",
      description: "Public feedback and satisfaction metrics",
      date: "2024-06-15",
      status: "Processing",
      type: "Survey",
      size: "1.5 MB",
    },
    {
      id: 5,
      title: "Resource Allocation Report",
      description: "Infrastructure and resource distribution",
      date: "2024-06-10",
      status: "Processing",
      type: "Resource",
      size: "2.1 MB",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return "bg-green-100 text-green-800 border-green-200";
      case "Processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Administrative":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Development":
        return "bg-green-100 text-green-800 border-green-200";
      case "Financial":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Survey":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Resource":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
const openPdf = () => {
  window.open('/Gram Panchayat Financial Balance Sheet.pdf', '_blank');
};
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="space-y-6 max-w-7xl mx-auto">
          <div className="border-b border-white/20 pb-6 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Reports & Documentation
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Generate and access administrative reports
              </p>
            </div>
            <Button
              onClick={() => navigate("/data-visualization")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Data Visualization 
            </Button>
          </div>

          <FundUtilizationFilterDialog
            open={filterDialogOpen}
            onOpenChange={setFilterDialogOpen}
            onSubmit={handleGenerateFundUtilizationReport}
          />
          {/* <FilterConfirmationDialog
            open={filterDialogOpen}
            onOpenChange={() => setFilterDialogOpen(false)}
            onConfirm={() => handleGenerateFundUtilizationReport}
            isVillage={true}
          /> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <CustomCard>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Total Reports
                    </p>
                    <p className="text-3xl font-bold text-blue-600 mt-1">24</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </CustomCard>

            <CustomCard>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Ready to Download
                    </p>
                    <p className="text-3xl font-bold text-green-600 mt-1">18</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg">
                    <Download className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </CustomCard>

            <CustomCard>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      This Month
                    </p>
                    <p className="text-3xl font-bold text-orange-600 mt-1">8</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </CustomCard>

            <CustomCard>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Trending
                    </p>
                    <p className="text-3xl font-bold text-purple-600 mt-1">
                      ↑15%
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </CustomCard>
          </div> */}

          <Card>
           
            <CardContent>
              <div className="space-y-04">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-6 border border-white/20 rounded-2xl hover:bg-white/40 transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-bold text-gray-900 text-lg">
                          {report.title}
                        </h3>
                        <Badge
                          className={`${getTypeColor(
                            report.type
                          )} border font-medium px-3 py-1 rounded-full`}
                        >
                          {report.type}
                        </Badge>
                        {/* <Badge
                          className={`${getStatusColor(
                            report.status
                          )} border font-medium px-3 py-1 rounded-full`}
                        >
                          {report.status}
                        </Badge> */}
                      </div>
                      <p className="text-gray-600 mb-3 font-medium">
                        {report.description}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Generated: {report.date}
                        </span>
                        <span className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Size: {report.size}
                        </span>
                      </div>
                    </div>
                    <div className="ml-6">
                      <Button
                        variant={
                          report.status === "Ready" ? "default" : "outline"
                        }
                        size="sm"
                        disabled={report.status !== "Ready"}
                        onClick={() => setFilterDialogOpen(true)}
                        className={
                          report.status === "Ready"
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            : "border-gray-300 text-gray-500 px-4 py-2 rounded-xl"
                        }
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Reports;
