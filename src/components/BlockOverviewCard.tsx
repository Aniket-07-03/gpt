import React, { useState } from "react";
import { Button } from "./ui/button";
import { Download, Eye, EyeOff, IndianRupee, KeyRound, Shield, Unlock, Upload, User, Users } from "lucide-react";
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
import { formatCurrency, formatCurrencyFull } from "@/lib/dataUtils";

const BlockOverviewCard = ({ villageData, villageId }) => {
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
    setShowBankTransactions(true)
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
          className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-xl font-bold shadow-md`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(Number(value))}</p>
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

  const ProgressBar = ({ percentage, color }) => (
    <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
      <div
        className={`h-3 rounded-full ${color} transition-all duration-1000 ease-out shadow-sm`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );


  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Card */}
      

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <InfoCard
          icon={<Download/>}
          title="Total Funds Received"
          value={villageData.totalFunds}
          color="bg-gradient-to-r from-indigo-200 to-indigo-300 text-blue-800"
          bgColor="bg-gradient-to-br from-indigo-50 to-indigo-100"
        />
        <InfoCard
          icon={<Upload className="h-6 w-6 " />}
          title="Spent Funds"
          value={villageData.spentFunds}
          color="bg-gradient-to-r from-green-200 to-green-300 text-green-700"
          bgColor="bg-gradient-to-br from-green-50 to-green-100"
        />
        <InfoCard
          icon={<IndianRupee className="h-6 w-6 " />}
          title="Unspent Balance"
          value={villageData.unspentBalance}
          color="bg-gradient-to-r from-orange-200 text-orange-600 to-orange-300"
          bgColor="bg-gradient-to-br from-orange-50 to-orange-100"
        />
       {!isUnlocked && <div
          className={` rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
        >
          <div className="flex items-center gap-4">
            {!isUnlocked && (
              <div className=" bg-white/30 backdrop-blur-md flex items-center justify-center rounded-3xl">
                <Button
                  onClick={handleUnlockClick}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  Unlock Balance
                </Button>
              </div>
            )}
          </div>
        </div>}
        {isUnlocked && <InfoCard
          icon={<IndianRupee className="h-6 w-6" />}
          title="Current Balance"
          value={currentBalance ||0}
          color="bg-gradient-to-r from-green-200 to-green-300 text-green-700"
          bgColor="bg-gradient-to-br from-green-50 to-green-100"
          showIcon={true}
        />}
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
              {formatCurrencyFull(Number(villageData.spentFunds))}
            </div>
            <div className="text-sm text-gray-600 mt-1">Amount Utilized</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
            <div className="text-2xl font-bold text-black">
              {formatCurrencyFull(Number(villageData.unspentBalance))}
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
              className="flex-1 h-12 border-2 border-gray-300 hover:border-gray-400 transition-colors duration-200 rounded-xl bg-transparent"
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

      <Dialog
        open={showBankTransactions}
        onOpenChange={setShowBankTransactions}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {/* <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Bank Transactions - {villageData.name}
            </DialogTitle>
            <DialogDescription>Detailed view of all bank transactions for this village</DialogDescription>
          </DialogHeader> */}
          <div className="mt-4">
            <BankTransactionsCard
              isUnlocked={isUnlocked}
              handleUnlockClick={handleUnlockClick}
              villageName={villageId}
              setCurrentBalance={setCurrentBalance}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlockOverviewCard;
