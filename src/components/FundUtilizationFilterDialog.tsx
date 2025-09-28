import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, Home, Calendar, FileText, Filter } from "lucide-react";
import { blocks, districts, financialYears, villages } from '@/lib/aiSightsFIlterTab';

interface FundUtilizationFilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (filters: {
    district: string;
    block: string;
    village: string;
    financialYear: string;
  }) => void;
}

export function FundUtilizationFilterDialog({
  open,
  onOpenChange,
  onSubmit
}: FundUtilizationFilterDialogProps) {
  const [filters, setFilters] = useState({
    district: '',
    block: '',
    village: '',
    financialYear: '2024-25'
  });

  const handleSubmit = () => {
    onSubmit(filters);
    onOpenChange(false);
  };

  console.log(filters.district,"filters.district",blocks[filters.district])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-w-[95vw] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <Filter className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Fund Utilization Filters
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-1">
                Select criteria to generate your report
              </p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="px-6 pb-6">
          <div className="space-y-5">
            {/* District Selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MapPin className="h-4 w-4 text-orange-500" />
                District
                <span className="text-red-500">*</span>
              </label>
              <Select 
                value={filters.district}
                onValueChange={(value) => setFilters({...filters, district: value, block: '', village: ''})}
              >
                <SelectTrigger className="w-full h-11 bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg text-sm">
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg">
                  {districts.map((district) => (
                    <SelectItem 
                      key={district.id} 
                      value={district.value}
                      className="text-sm py-2.5 px-9 hover:bg-gray-50 cursor-pointer"
                    >
                      {district.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Block Selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Building2 className="h-4 w-4 text-green-500" />
                Block
                <span className="text-red-500">*</span>
              </label>
              <Select 
                value={filters.block}
                onValueChange={(value) => setFilters({...filters, block: value, village: ''})}
                disabled={!filters.district}
              >
                <SelectTrigger className="w-full h-11 bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                  <SelectValue placeholder={filters.district ? "Select block" : "Select district first"} />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg">
                  {blocks?.[filters.district]?.map((block) => (
                    <SelectItem 
                      key={block.label} 
                      value={block.label}
                      className="text-sm py-2.5 px-9 hover:bg-gray-50 cursor-pointer"
                    >
                      {block.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Village Selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Home className="h-4 w-4 text-blue-500" />
                Village
                <span className="text-xs text-gray-500">(optional)</span>
              </label>
              <Select 
                value={filters.village}
                onValueChange={(value) => setFilters({...filters, village: value})}
                disabled={!filters.block}
              >
                <SelectTrigger className="w-full h-11 bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                  <SelectValue placeholder={filters.block ? "Select village (optional)" : "Select block first"} />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg">
                  {villages?.[filters.block.toLowerCase()]?.map((village) => (
                    <SelectItem 
                      key={village.value} 
                      value={village.value}
                      className="text-sm py-2.5 px-9 hover:bg-gray-50 cursor-pointer"
                    >
                      {village.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Financial Year Selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Calendar className="h-4 w-4 text-purple-500" />
                Financial Year
                <span className="text-red-500">*</span>
              </label>
              <Select 
                value={filters.financialYear}
                onValueChange={(value) => setFilters({...filters, financialYear: value})}
              >
                <SelectTrigger className="w-full h-11 bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg text-sm">
                  <SelectValue placeholder="Select financial year" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg">
                  {financialYears.map((year) => (
                    <SelectItem 
                      key={year.value} 
                      value={year.label}
                      className="text-sm py-2.5 px-9 hover:bg-gray-50 cursor-pointer"
                    >
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-100 mt-6">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-10 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-sm rounded-lg transition-colors"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!filters.district || !filters.block}
              className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Generate Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}