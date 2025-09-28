import React, { useState } from "react";
import { Button } from "./ui/button";
import { Eye, EyeOff, KeyRound, Shield, Unlock, User } from "lucide-react";
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
import BankTransactionsCard from "./BankTransactionCard";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

 export const ProgressBar = ({ percentage, color }) => (
    <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
      <div
        className={`h-3 rounded-full ${color} transition-all duration-1000 ease-out shadow-sm`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
const StateCard = ({ villageData, villageId }) => {
  // Sample data - replace with your actual villageData and villageId
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [showBankTransactions, setShowBankTransactions] = useState(false);
  const [currentBalance, setCurrentBalance] = useState("");
  const handleBankTransactionsClick = () => {
    setShowBankTransactions(true);
  };

  const isFormValid = loginData.username && loginData.password;

  const handleInputChange = (field: string, value: string) => {
    setLoginData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
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
  const InfoCard = ({ icon, title, value, color, bgColor,showIcon=false }:any) => (
    <div
      className={`${bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
      {showIcon && (
  <div
    onClick={() => setShowBankTransactions(true)}
    className="absolute top-1 right-1"
  >
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Eye className="text-green-500 cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Show transaction list</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
)}
    </div>
  );

 

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Card */}
      

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <InfoCard
          icon="👥"
          title="Population"
          value={villageData.population.toLocaleString()}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          bgColor="bg-gradient-to-br from-blue-50 to-blue-100"
        />
        <InfoCard
          icon="💰"
          title="Total Funds"
          value={villageData.totalFunds}
          color="bg-gradient-to-r from-indigo-200 to-indigo-300 text-blue-800"
          bgColor="bg-gradient-to-br from-indigo-50 to-indigo-100"
        />
        <InfoCard
          icon="✅"
          title="Spent Funds"
          value={villageData.spentFunds}
          color="bg-gradient-to-r from-green-200 to-green-300 text-green-700"
          bgColor="bg-gradient-to-br from-green-50 to-green-100"
        />
        <InfoCard
          icon="💼"
          title="Unspent Balance"
          value={villageData.unspentBalance}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
          bgColor="bg-gradient-to-br from-orange-50 to-orange-100"
        />
      
      </div>

      {/* Utilization Card */}
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Fund Utilization
          </h2>
          <p className="text-gray-600">
            Current utilization rate of allocated funds
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-700">
              Progress
            </span>
            <span className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              {villageData.utilization}%
            </span>
          </div>
          <ProgressBar
            percentage={villageData.utilization}
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
              {villageData.spentFunds}
            </div>
            <div className="text-sm text-gray-600 mt-1">Amount Utilized</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
            <div className="text-2xl font-bold text-black">
              {villageData.unspentBalance}
            </div>
            <div className="text-sm text-gray-600 mt-1">Remaining Balance</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="text-2xl font-bold text-black">
              {100 - villageData.utilization}%
            </div>
            <div className="text-sm text-gray-600 mt-1">Available for Use</div>
          </div>
        </div>
      </div>
      {/* Enhanced Interactive Login Dialog */}
   

      
    </div>
  );
};

export default StateCard;
