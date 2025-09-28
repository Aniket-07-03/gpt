import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Building2, FileText, BarChart3, Brain, MapPin, Globe, Shield, Award } from "lucide-react";
import AIInsights from "@/components/AIInsights";

import Hero from "./Hero";
import AnalyticsDashboard from "./AnalyticsDashboard";
import Footer from "./Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-blue-50 to-slate-50  overflow-hidden">
      <Hero />
      <AnalyticsDashboard />
      {/* <AIInsights /> */}
      <Footer />
    </div>
  );
};

export default Index;
