import { AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

export interface DistrictData {
  id: number;
  name: string;
  code: number;
  schemename: string;
  scheme_uid: number;
  schemecomponentname: string;
  obAmount: number;
  receiptAmountDirect: number;
  receiptAmountAuto: number;
  paymentAmount: number;
  unspentAmount: number;
  dateOfEntry: string;
}

export interface ProcessedDistrictData extends DistrictData {
  utilizationPercentage: number;
  totalAvailable: number;
  unspentPercentage: number;
}


export const formatCurrencyFull = (amount?: number): string => {
  return `₹${amount?.toLocaleString('en-IN')}`;
};
export const calculateUtilizationPercentage = (obAmount: number, paymentAmount: number): number => {
  if (obAmount === 0) return 0;
  return (paymentAmount / obAmount) * 100;
};

export const formatCurrency = (amount: number): string => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`;
  } else {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
};

export const getPerformanceStatus = (utilizationPercentage: number): string => {
  if (utilizationPercentage >= 5) return "Good";
  if (utilizationPercentage >= 1) return "Average";
  if (utilizationPercentage >= 0.1) return "Low";
  return "Very Low";
};

export const generateAIInsights = (data: ProcessedDistrictData[]) => {
  const highPerformers = data.filter(d => d.utilizationPercentage >= 1).length;
  const lowPerformers = data.filter(d => d.utilizationPercentage < 0.1).length;
  const totalUnspent = data.reduce((sum, d) => sum + d.unspentAmount, 0);
  const avgUtilization = data.reduce((sum, d) => sum + d.utilizationPercentage, 0) / data.length;

  return [
    {
      type: "success" as const,
      icon: CheckCircle,
      title: "Active Utilization",
      description: `${highPerformers} out of ${data.length} districts (${((highPerformers/data.length)*100).toFixed(0)}%) are actively utilizing funds with >1% utilization rate`,
      action: "Share best practices from high-performing districts with underperforming ones"
    },
    {
      type: "warning" as const,
      icon: AlertTriangle,
      title: "Critical Underutilization",
      description: `${lowPerformers} districts have extremely low utilization (<0.1%) with total unspent amount of ${formatCurrency(totalUnspent)}`,
      action: "Immediate intervention required to accelerate fund disbursement and project implementation"
    },
    {
      type: "trend" as const,
      icon: TrendingUp,
      title: "Overall Performance",
      description: `State average utilization is ${avgUtilization.toFixed(2)}% with significant room for improvement across all districts`,
      action: "Implement capacity building programs and streamline approval processes"
    }
  ];
};

export const getPerformanceDistribution = (data: ProcessedDistrictData[]) => {
  const excellent = data.filter(d => d.utilizationPercentage >= 5).length;
  const good = data.filter(d => d.utilizationPercentage >= 1 && d.utilizationPercentage < 5).length;
  const average = data.filter(d => d.utilizationPercentage >= 0.1 && d.utilizationPercentage < 1).length;
  const poor = data.filter(d => d.utilizationPercentage < 0.1).length;

  return [
    { name: "Excellent (5%+)", count: excellent, color: "#10b981" },
    { name: "Good (1-5%)", count: good, color: "#3b82f6" },
    { name: "Average (0.1-1%)", count: average, color: "#f59e0b" },
    { name: "Poor (<0.1%)", count: poor, color: "#ef4444" },
  ];
};

export const getTopBottomPerformers = (data: ProcessedDistrictData[]) => {
  const sorted = [...data].sort((a, b) => b.utilizationPercentage - a.utilizationPercentage);
  
  return {
    topPerformers: sorted.slice(0, 5),
    bottomPerformers: sorted.slice(-5).reverse()
  };
};