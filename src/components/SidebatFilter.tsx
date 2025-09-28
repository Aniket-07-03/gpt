
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Filter, X, Calendar, MapPin, Building2, Home, DollarSign, CheckCircle } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface FilterGroup {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  type: 'select' | 'multiselect' | 'range';
  options?: FilterOption[];
  value?: string | string[] | { min: number; max: number };
  placeholder?: string;
  disabled?: boolean;
}

interface SidebarFilterProps {
  filterGroups: FilterGroup[];
  onFilterChange: (groupId: string, value: any) => void;
  onClearAll: () => void;
  appliedFilters: Record<string, any>;
  className?: string;
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({
  filterGroups,
  onFilterChange,
  onClearAll,
  appliedFilters,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getAppliedFiltersCount = () => {
    return Object.keys(appliedFilters).filter(key => 
      appliedFilters[key] && 
      (Array.isArray(appliedFilters[key]) ? appliedFilters[key].length > 0 : appliedFilters[key] !== '')
    ).length;
  };

  const renderFilterContent = () => (
    <div className="space-y-6">
      {/* Filter Groups */}
      {filterGroups.map((group) => {
        const IconComponent = group.icon;
        return (
          <Card key={group.id} className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
            <CardHeader className="pb-3 sticky top-0 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100/50 z-10">
              <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <IconComponent className="h-4 w-4 text-blue-600" />
                {group.title}
                {group.disabled && (
                  <Badge variant="outline" className="text-xs text-gray-500">
                    Disabled
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {group.type === 'select' && (
                <Select
                  value={appliedFilters[group.id] || ''}
                  onValueChange={(value) => onFilterChange(group.id, value)}
                  disabled={group.disabled}
                >
                  <SelectTrigger className={`bg-white/80 backdrop-blur-lg border border-white/20 shadow-sm ${group.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <SelectValue placeholder={group.placeholder || 'Select...'} />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-lg border border-white/20 shadow-xl max-h-60 overflow-y-auto">
                    {group.options?.map((option) => (
                      <SelectItem key={option.id} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {group.type === 'multiselect' && (
                <div className="space-y-2">
                  {group.options?.map((option) => {
                    const isSelected = (appliedFilters[group.id] || []).includes(option.value);
                    return (
                      <div
                        key={option.id}
                        className={`p-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                          isSelected 
                            ? 'bg-blue-50 border-blue-200 text-blue-800' 
                            : 'bg-white/50 border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => {
                          const current = appliedFilters[group.id] || [];
                          const updated = isSelected
                            ? current.filter((v: string) => v !== option.value)
                            : [...current, option.value];
                          onFilterChange(group.id, updated);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{option.label}</span>
                          {isSelected && <CheckCircle className="h-4 w-4 text-blue-600" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Applied Filters at bottom */}
      {getAppliedFiltersCount() > 0 && (
        <div className="space-y-3 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-800">Applied Filters</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(appliedFilters).map(([key, value]) => {
              if (!value || (Array.isArray(value) && value.length === 0)) return null;
              const group = filterGroups.find(g => g.id === key);
              return (
                <Badge
                  key={key}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer"
                  onClick={() => onFilterChange(key, group?.type === 'multiselect' ? [] : '')}
                >
                  {group?.title}: {Array.isArray(value) ? value.join(', ') : value}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:block w-80 ${className}`}>
        <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl shadow-blue-500/10 rounded-3xl sticky top-24 max-h-full overflow-y-auto">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100/50 rounded-t-3xl sticky top-0 z-20">
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg">
                <Filter className="h-5 w-5 text-white" />
              </div>
              Filters
              {getAppliedFiltersCount() > 0 && (
                <Badge className="bg-blue-100 text-blue-800 text-xs">
                  {getAppliedFiltersCount()}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {renderFilterContent()}
          </CardContent>
        </Card>
      </div>

      {/* Mobile Filter Drawer */}
      <div className="lg:hidden">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {getAppliedFiltersCount() > 0 && (
                <Badge className="bg-blue-100 text-blue-800 text-xs ml-2">
                  {getAppliedFiltersCount()}
                </Badge>
              )}
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-white/95 backdrop-blur-lg border border-white/20 max-h-[80vh]">
            <DrawerHeader className="sticky top-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 z-20">
              <DrawerTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <Filter className="h-5 w-5 text-blue-600" />
                Filters
              </DrawerTitle>
            </DrawerHeader>
            <div className="p-4 overflow-y-auto">
              {renderFilterContent()}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default SidebarFilter;
