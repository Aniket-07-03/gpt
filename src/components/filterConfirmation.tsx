import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, MapPin, Building2, Home, Check, ChevronDown, Search } from "lucide-react";
import { blocks, districts, villages } from "@/lib/aiSightsFIlterTab";
import { useNavigate } from "react-router-dom";

// Mock data - replace with your actual data source


interface FilterConfirmationDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: (district: string, block: string, village?: string) => void;
  isVillage: boolean;
}

const CustomSelect = ({ 
  value, 
  onValueChange, 
  placeholder, 
  disabled, 
  options, 
  icon: Icon,
  iconColor 
}: {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  options: { value: string; label: string }[];
  icon: any;
  iconColor: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find(option => option.value === value);

  // Calculate dropdown height based on filtered options
  const dropdownHeight = Math.min(filteredOptions.length * 32 + 60, 200); // 32px per item + 60px for search

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full h-11 px-4 py-3 bg-white border-2 rounded-lg text-sm text-left flex items-center justify-between
          transition-all duration-200 group
          ${disabled 
            ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed' 
            : isOpen
              ? 'border-blue-500 ring-4 ring-blue-100 shadow-lg'
              : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
          }
        `}
      >
        <div className="flex items-center gap-3">
          <Icon className={`h-4 w-4 ${iconColor}`} />
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && !disabled && (
        <>
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setIsOpen(false)}
          />
          <div 
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-2xl z-40 overflow-hidden"
            style={{ maxHeight: `${dropdownHeight}px` }}
          >
            {/* Search Input */}
            <div className="p-3 border-b border-gray-100 bg-gray-50/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {/* Options List */}
            <div className="overflow-y-auto" style={{ maxHeight: `${dropdownHeight - 60}px` }}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onValueChange(option.value);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                    className={`
                      w-full px-4 py-3 text-left text-sm hover:bg-blue-50 transition-colors duration-150
                      flex items-center justify-between group border-b border-gray-50 last:border-b-0
                      ${value === option.value ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:text-gray-900'}
                    `}
                  >
                    <span className="truncate">{option.label}</span>
                    {value === option.value && (
                      <Check className="h-4 w-4 text-blue-600 flex-shrink-0 ml-2" />
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-gray-500 text-sm">
                  No options found
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const FilterConfirmationDialog = ({ open, onOpenChange, onConfirm, isVillage }: FilterConfirmationDialogProps) => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
const navigate = useNavigate();
  const availableBlocks = selectedDistrict ? blocks[selectedDistrict] || [] : [];
  const availableVillages = (selectedDistrict && selectedBlock) ? villages[selectedBlock] || [] : [];

   const handleConfirm = () => {
    if (selectedDistrict && selectedBlock) {
      onConfirm?.(selectedDistrict, selectedBlock);
      onOpenChange?.(false);
    }
    if(isVillage){
    navigate(`/block/${selectedBlock}/village/${selectedVillage}`);

    }else{

        navigate(`/block/${selectedBlock}`);
    }
  };

  const handleBack = () => {
    onOpenChange?.(false);
    navigate("/");
    // Mock navigation - replace with your actual navigation logic
    console.log("Navigate to: /");
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setSelectedBlock("");
    setSelectedVillage("");
  };

  const handleBlockChange = (value: string) => {
    setSelectedBlock(value);
    setSelectedVillage("");
  };

  const isFormValid = isVillage 
    ? selectedDistrict && selectedBlock && selectedVillage
    : selectedDistrict && selectedBlock;

  return (
    <Dialog open={open} onOpenChange={() => { navigate("/") }}>
      <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl rounded-2xl z-50 p-0 overflow-visible max-h-[90vh]">
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-visible">
          {/* Decorative Top Border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600"></div>
          
          {/* Header */}
          <DialogHeader className="px-6 py-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-lg opacity-20 scale-110"></div>
                <div className="relative p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                  <Filter className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <DialogTitle className="text-xl font-bold text-gray-900 mb-2">
              Location Filter
            </DialogTitle>
            <p className="text-gray-600 text-sm">
              Select your location to access the dashboard
            </p>
          </DialogHeader>

          {/* Content */}
          <div className="px-6 pb-6 space-y-4 overflow-visible">
            {/* District Selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                District
                <span className="text-red-500 text-base">*</span>
              </label>
              <CustomSelect
                value={selectedDistrict}
                onValueChange={handleDistrictChange}
                placeholder="Select district"
                options={districts}
                icon={MapPin}
                iconColor="text-orange-500"
              />
            </div>

            {/* Block Selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                Block
                <span className="text-red-500 text-base">*</span>
              </label>
              <CustomSelect
                value={selectedBlock}
                onValueChange={handleBlockChange}
                placeholder={selectedDistrict ? "Select block" : "Select district first"}
                disabled={!selectedDistrict}
                options={availableBlocks}
                icon={Building2}
                iconColor="text-green-500"
              />
            </div>

            {/* Village Selection */}
            {isVillage && (
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  Village
                  <span className="text-red-500 text-base">*</span>
                </label>
                <CustomSelect
                  value={selectedVillage}
                  onValueChange={setSelectedVillage}
                  placeholder={
                    !selectedDistrict ? "Select district first" :
                    !selectedBlock ? "Select block first" : 
                    "Select village"
                  }
                  disabled={!selectedDistrict || !selectedBlock}
                  options={availableVillages}
                  icon={Home}
                  iconColor="text-purple-500"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-10 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-medium text-sm rounded-lg transition-all duration-200"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={!isFormValid}
                className={`
                  flex-1 h-10 font-medium text-sm rounded-lg transition-all duration-200
                  ${isFormValid 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                Open Dashboard
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterConfirmationDialog;