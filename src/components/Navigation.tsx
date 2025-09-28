import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Search,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Home,
  Building,
  MapPin,
  IndianRupee,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GoogleTranslate from "./GoogleTranslate";
import { financialYears } from "@/lib/constants";

const getRandomStatus = () =>
  ["Excellent", "Average", "Poor"][Math.floor(Math.random() * 3)];
const getUtilization = () => `${(Math.random() * 100).toFixed(2)}%`;

export const searchData = [
  {
    category: "Districts",
    icon: MapPin,
    items: [
      { name: "Pune", code: 446 },
      { name: "Ahmednagar", code: 424 },
      { name: "Akola", code: 425 },
      { name: "Amravati", code: 426 },
      { name: "Aurangabad", code: 427 },
      { name: "Beed", code: 428 },
      { name: "Bhandara", code: 429 },
      { name: "Buldhana", code: 430 },
      { name: "Chandrapur", code: 431 },
      { name: "Dhule", code: 432 },
      { name: "Gadchiroli", code: 433 },
      { name: "Gondia", code: 434 },
      { name: "Hingoli", code: 435 },
      { name: "Jalgaon", code: 436 },
      { name: "Jalna", code: 437 },
      { name: "Kolhapur", code: 438 },
      { name: "Latur", code: 439 },
      { name: "Nagpur", code: 440 },
      { name: "Nanded", code: 441 },
      { name: "Nandurbar", code: 442 },
      { name: "Nashik", code: 443 },
      { name: "Osmanabad", code: 444 },
      { name: "Parbhani", code: 445 },
      { name: "Raigad", code: 447 },
      { name: "Ratnagiri", code: 448 },
      { name: "Sangli", code: 449 },
      { name: "Satara", code: 450 },
      { name: "Sindhudurg", code: 451 },
      { name: "Solapur", code: 452 },
      { name: "Thane", code: 453 },
      { name: "Wardha", code: 454 },
      { name: "Washim", code: 455 },
      { name: "Yavatmal", code: 456 },
      { name: "Palghar", code: 457 },
    ].map((d) => ({
      ...d,
      status: getRandomStatus(),
      utilization: getUtilization(),
    })),
  },
  {
    category: "Block",
    icon: LayoutGrid,
    items: [
      "Maval",
      "Mulshi",
      "Bhor",
      "Haveli",
      "Junnar",
      "Ambegaon",
      "Baramati",
      "Indapur",
      "Purandar",
      "Shirur",
      "Khed",
      "Daund",
      "Velhe",
    ].map((name) => ({
      name,
      status: getRandomStatus(),
      utilization: getUtilization(),
    })),
  },
  {
    category: "Village",
    icon: Home,
    items: [
      "Adhe",
      "Talegaon",
      "Dhoksanghavi",
      "Dhamari",
      "Kamshet",
      "Shirgaon",
      "Pali",
      "Bhaje",
      "Vadgaon",
      "Tikona",
      "Kanhe",
      "Uksan",
      "Shilatane",
      "Ambavne",
      "Kusgaon",
    ].map((name) => ({
      name,
      status: getRandomStatus(),
      utilization: getUtilization(),
    })),
  },
  {
    category: "Fund Types",
    icon: IndianRupee,
    items: [
      { name: "Fund Utilization", status: "active", utilization: "82%" },
      { name: "Unspent Balance", status: "warning", utilization: "18%" },
      { name: "Allocated Funds", status: "active", utilization: "100%" },
      { name: "Pending Funds", status: "warning", utilization: "12%" },
    ],
  },
];

const Navigation = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("mr");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [commandOpen, setCommandOpen] = useState(false);
  const navigate = useNavigate();

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    setShowLanguageDropdown(false);

    const googleTranslateCombo = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;
    if (googleTranslateCombo) {
      googleTranslateCombo.value = langCode;
      googleTranslateCombo.dispatchEvent(new Event("change"));
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    setCommandOpen(false);
  };

  const handleCommandSelect = (groupName, value) => {
    handleSearch(value);
    navigate(`/${groupName.toLowerCase()}/${value}`);
  };

  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
    { code: "mr", name: "Marathi", nativeName: "मराठी" },
  ];

  const navItems = [
    { name: "Dashboard", href: "/" },
    { name: "Reports", href: "/reports" },
    { name: "eGramGPT", href: "/egramgpt" },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-3 w-3 text-yellow-500" />;
      default:
        return <TrendingUp className="h-3 w-3 text-blue-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50";
      case "warning":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-blue-600 bg-blue-50";
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-xl shadow-blue-500/10 sticky top-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          <div
            onClick={() => navigate("/")}
            className="flex cursor-pointer items-center space-x-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src="/state_logo_1.png" alt="logo" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  Smart Financial Reporting
                </h1>
                <p className="text-xs text-gray-600">Maharashtra Government</p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="max-w-fit">
              <Select defaultValue="2024-25">
                <SelectTrigger className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500 rounded-2xl focus:ring-2 focus:ring-purple-500/20 transform hover:-translate-y-1 hover:scale-105 min-w-40">
                  <div className="flex items-center gap-3">
                    <div className="p-1 bg-gradient-to-br from-purple-100 to-pink-200 rounded-lg shadow-lg">
                      <TrendingUp className="h-4 w-4 text-purple-700" />
                    </div>
                    <SelectValue
                      placeholder="Financial Year"
                      className="font-medium text-gray-700"
                    />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl overflow-hidden">
                  {financialYears.map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-xl m-1 transition-all duration-300 font-medium"
                    >
                      FY {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/50 backdrop-blur-sm"
              >
                {item.name}
              </a>
            ))}

            <Button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r  border border-1 font-semibold from-blue-200 to-purple-200 hover:from-blue-100 hover:to-purple-200 text-blue-700 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 rounded-xl"
            >
              Login
            </Button>

            <div className="relative">
              {/* <Button
                variant="outline"
                className="text-sm font-medium rounded-xl border border-gray-200"
                onClick={() => setShowLanguageDropdown((prev) => !prev)}
              >
                {languages.find((l) => l.code === selectedLanguage)?.nativeName || "Language"}
              </Button> */}
              <div className=" pt-1">
                <GoogleTranslate />
              </div>
            </div>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg rounded-xl"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-white/95 backdrop-blur-lg border-l border-white/20">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="mb-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg rounded-xl"
                    onClick={() => {
                      setCommandOpen(true);
                      setIsOpen(false);
                    }}
                  >
                    <Search className="mr-2 h-4 w-4 text-blue-500" />
                    <span className="text-gray-600">Search...</span>
                  </Button>
                </div>

                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-blue-50/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}

                {/* <Button
                variant="outline"
                className="text-sm font-medium rounded-xl border border-gray-200"
                onClick={() => setShowLanguageDropdown((prev) => !prev)}
              >
                {languages.find((l) => l.code === selectedLanguage)?.nativeName || "Language"}
              </Button> */}
                <div className="relative">
                  {/* Google Translate already rendered in desktop view - avoid duplicate */}
                  <div className="text-sm text-gray-600 px-3 py-2 bg-gray-50 rounded-lg">
                    Language selection available in desktop view
                  </div>
                </div>

                <Button className="bg-gradient-to-r from-blue-200 to-purple-200 hover:from-blue-200 hover:to-purple-200 text-blue-600 font-semibold border border-1 shadow-xl shadow-blue-500/25 rounded-xl">
                  Login
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
