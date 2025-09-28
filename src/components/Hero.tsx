import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  Building2,
  FileText,
  Award,
  Shield,
  Home,
  Earth,
  House,
  BuildingIcon,
  Brain,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Globalfilter from "./globalFilter";

const Hero = () => {
  const router = useNavigate();
  const stats = [
    {
      icon: Earth,
      label: "Total District",
      value: "34",
      change: "+10.3%",
      link: "/districts",
    },
    {
      icon: BuildingIcon,
      label: "Total Blocks",
      value: "351",
      change: "+10.3%",
      link: "/blocks",
    },
    {
      icon: Building2,
      label: "Total Panchayats",
      value: "27,955",
      change: "+2.5%",
      link: "/villages",
    },
  ];

  return (
    <div className="min-h-screen ">
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative">
              
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4 leading-tight ">
                Smart Financial Reporting
              </h1>
              <p className="text-sm flex flex-row justify-center mb-6 items-center gap-3 text-gray-600">
                <div className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent italic">
                  Powered by
                </div>
                <div className=" rounded-xl ">
                  <img
                    src="/ICICI_Bank_Logo.png"
                    className="overflow-hidden"
                    alt="logo_icici"
                    width={120}
                    height={40}
                  />
                </div>
              </p>
              <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                Empowering Maharashtra's Panchayati Raj Institutions with AI-enabled e-Governance for transparent planning, real-time progress tracking, and smart work-based accounting.
              </p>
            </div>
          </div>
          <Globalfilter/>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <Card
                key={index}
                onClick={() => router(stat.link)}
                className="group bg-white/80 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer rounded-3xl overflow-hidden transform hover:-translate-y-2 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {stat.label}
                      </p>
                      <p className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-3">
                        {stat.value}
                      </p>
                      {/* <div className="flex items-center">
                        <div className="p-1 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg mr-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          {stat.change}
                        </span>
                      </div> */}
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/25 group-hover:shadow-2xl group-hover:shadow-orange-500/40 transition-shadow duration-300">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card 
              onClick={() => router("/accounting")} 
              className="group bg-white/80 backdrop-blur-lg border-0 shadow-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer rounded-3xl overflow-hidden transform hover:-translate-y-2 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-10 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-green-500/25">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors duration-300">
                  Fund Utilization Report
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Districts, Blocks, village,
                </p>
              </CardContent>
            </Card>
            <Card 
              onClick={() => router("/data-visualization")} 
              className="group bg-white/80 backdrop-blur-lg border-0 shadow-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer rounded-3xl overflow-hidden transform hover:-translate-y-2 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-10 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-yellow-500/25">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-yellow-600 transition-colors duration-300">
                  Data Visualization
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Districts, Blocks, village,
                </p>
              </CardContent>
            </Card>
            <Card onClick={() => router("/aiinsights")}  className="group bg-white/80 backdrop-blur-lg border-0 shadow-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer rounded-3xl overflow-hidden transform hover:-translate-y-2 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-10 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-orange-500/25">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                  AI Insights
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Districts, Blocks, village,
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
