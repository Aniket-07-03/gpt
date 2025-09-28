import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// Using custom table components instead of shadcn table
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Filter } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const BalanceSheetWithFilters = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [filterLevel, setFilterLevel] = useState('district');

  // Mock data structure
  const mockData = {
    districts: [
      { id: 'dist1', name: 'Pune' },
      { id: 'dist2', name: 'Mumbai' },
      { id: 'dist3', name: 'Nashik' }
    ],
    blocks: {
      dist1: [
        { id: 'block1', name: 'Haveli' },
        { id: 'block2', name: 'Mulshi' }
      ],
      dist2: [
        { id: 'block3', name: 'Andheri' },
        { id: 'block4', name: 'Bandra' }
      ],
      dist3: [
        { id: 'block5', name: 'Nashik Rural' },
        { id: 'block6', name: 'Sinnar' }
      ]
    },
    villages: {
      block1: [
        { id: 'vil1', name: 'Khadakwasla GP' },
        { id: 'vil2', name: 'Baner GP' }
      ],
      block2: [
        { id: 'vil3', name: 'Mulshi GP' },
        { id: 'vil4', name: 'Panshet GP' }
      ],
      block3: [
        { id: 'vil5', name: 'Andheri East GP' },
        { id: 'vil6', name: 'Andheri West GP' }
      ]
    },
    balanceSheetData: {
      // District level data
      district: {
        dist1: [
          {
            gp: 'Pune District',
            ob: '₹45,00,000',
            receipts: '₹1,25,00,000',
            expenditure: '₹95,00,000',
            cb: '₹75,00,000',
            updated: '2024-03-15',
            receiptsNum: 12500000,
            expenditureNum: 9500000
          }
        ],
        dist2: [
          {
            gp: 'Mumbai District',
            ob: '₹65,00,000',
            receipts: '₹2,15,00,000',
            expenditure: '₹1,85,00,000',
            cb: '₹95,00,000',
            updated: '2024-03-14',
            receiptsNum: 21500000,
            expenditureNum: 18500000
          }
        ]
      },
      // Block level data
      block: {
        block1: [
          {
            gp: 'Haveli Block',
            ob: '₹25,00,000',
            receipts: '₹75,00,000',
            expenditure: '₹55,00,000',
            cb: '₹45,00,000',
            updated: '2024-03-15',
            receiptsNum: 7500000,
            expenditureNum: 5500000
          }
        ],
        block2: [
          {
            gp: 'Mulshi Block Total',
            ob: '₹20,00,000',
            receipts: '₹50,00,000',
            expenditure: '₹40,00,000',
            cb: '₹30,00,000',
            updated: '2024-03-15',
            receiptsNum: 5000000,
            expenditureNum: 4000000
          }
        ]
      },
      // Village level data
      village: {
        vil1: [
          {
            gp: 'Khadakwasla GP',
            ob: '₹5,50,000',
            receipts: '₹18,75,000',
            expenditure: '₹14,25,000',
            cb: '₹10,00,000',
            updated: '2024-03-15',
            receiptsNum: 1875000,
            expenditureNum: 1425000
          }
        ],
        vil2: [
          {
            gp: 'Baner GP',
            ob: '₹8,20,000',
            receipts: '₹25,50,000',
            expenditure: '₹22,10,000',
            cb: '₹11,60,000',
            updated: '2024-03-14',
            receiptsNum: 2550000,
            expenditureNum: 2210000
          }
        ]
      }
    }
  };

  // Get available blocks based on selected district
  const availableBlocks = useMemo(() => {
    if (!selectedDistrict) return [];
    return mockData.blocks[selectedDistrict] || [];
  }, [selectedDistrict]);

  // Get available villages based on selected block
  const availableVillages = useMemo(() => {
    if (!selectedBlock) return [];
    return mockData.villages[selectedBlock] || [];
  }, [selectedBlock]);

  // Get balance sheet data based on current selection
  const balanceSheetData = useMemo(() => {
    if (filterLevel === 'village' && selectedVillage) {
      return mockData.balanceSheetData.village[selectedVillage] || [];
    } else if (filterLevel === 'block' && selectedBlock) {
      return mockData.balanceSheetData.block[selectedBlock] || [];
    } else if (filterLevel === 'district' && selectedDistrict) {
      return mockData.balanceSheetData.district[selectedDistrict] || [];
    }
    return [];
  }, [filterLevel, selectedDistrict, selectedBlock, selectedVillage]);

  // Reset dependent selections when parent changes
  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setSelectedBlock('');
    setSelectedVillage('');
  };

  const handleBlockChange = (value) => {
    setSelectedBlock(value);
    setSelectedVillage('');
  };

  const handleFilterLevelChange = (value) => {
    setFilterLevel(value);
    setSelectedDistrict('');
    setSelectedBlock('');
    setSelectedVillage('');
  };

  // Check if we can show the balance sheet
  const canShowBalanceSheet = () => {
    if (filterLevel === 'district') return selectedDistrict;
    if (filterLevel === 'block') return selectedDistrict && selectedBlock;
    if (filterLevel === 'village') return selectedDistrict && selectedBlock && selectedVillage;
    return false;
  };

  const getFilterInstructions = () => {
    if (filterLevel === 'district') {
      return 'Please select a district to view the balance sheet.';
    } else if (filterLevel === 'block') {
      if (!selectedDistrict) return 'Please select a district first, then select a block.';
      if (!selectedBlock) return 'Please select a block to view the balance sheet.';
    } else if (filterLevel === 'village') {
      if (!selectedDistrict) return 'Please select a district first.';
      if (!selectedBlock) return 'Please select a block next.';
      if (!selectedVillage) return 'Please select a village to view the balance sheet.';
    }
    return '';
  };

  return (
    <div className=" bg-gradient-to-br from-slate-50 to-green-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Filter Selection Card */}
        <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-gray-900 to-green-900 bg-clip-text text-transparent">
              <Filter className="h-5 w-5 text-green-600" />
              Balance Sheet Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Filter Level Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">View Level</label>
                <Select value={filterLevel} onValueChange={handleFilterLevelChange}>
                  <SelectTrigger className="h-11 bg-white border-2 border-gray-200 hover:border-green-300 transition-colors">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="district">District Level</SelectItem>
                    <SelectItem value="block">Block Level</SelectItem>
                    <SelectItem value="village">Village Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* District Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  District <span className="text-red-500">*</span>
                </label>
                <Select value={selectedDistrict} onValueChange={handleDistrictChange}>
                  <SelectTrigger className="h-11 bg-white border-2 border-gray-200 hover:border-green-300 transition-colors">
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockData.districts.map((district) => (
                      <SelectItem key={district.id} value={district.id}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Block Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Block {(filterLevel === 'block' || filterLevel === 'village') && <span className="text-red-500">*</span>}
                </label>
                <Select 
                  value={selectedBlock} 
                  onValueChange={handleBlockChange}
                  disabled={!selectedDistrict || filterLevel === 'district'}
                >
                  <SelectTrigger className={`h-11 transition-colors ${
                    !selectedDistrict || filterLevel === 'district'
                      ? 'bg-gray-100 border-gray-200 text-gray-400'
                      : 'bg-white border-2 border-gray-200 hover:border-green-300'
                  }`}>
                    <SelectValue placeholder="Select block" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableBlocks.map((block) => (
                      <SelectItem key={block.id} value={block.id}>
                        {block.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Village Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Village {filterLevel === 'village' && <span className="text-red-500">*</span>}
                </label>
                <Select 
                  value={selectedVillage} 
                  onValueChange={setSelectedVillage}
                  disabled={!selectedBlock || filterLevel !== 'village'}
                >
                  <SelectTrigger className={`h-11 transition-colors ${
                    !selectedBlock || filterLevel !== 'village'
                      ? 'bg-gray-100 border-gray-200 text-gray-400'
                      : 'bg-white border-2 border-gray-200 hover:border-green-300'
                  }`}>
                    <SelectValue placeholder="Select village" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVillages.map((village) => (
                      <SelectItem key={village.id} value={village.id}>
                        {village.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filter Instructions */}
            {!canShowBalanceSheet() && (
              <Alert className="mt-4 border-amber-200 bg-amber-50">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  {getFilterInstructions()}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Balance Sheet Card - Only show when filters are properly selected */}
        {canShowBalanceSheet() && (
          <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-400/5"></div>
            <CardHeader className="relative">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-green-900 bg-clip-text text-transparent">
                Balance Sheet Overview
                <span className="text-sm text-slate-500 ml-2 font-normal">
                  ({filterLevel.charAt(0).toUpperCase() + filterLevel.slice(1)} Level)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="overflow-x-auto rounded-2xl shadow-lg">
                <table className="w-full bg-white/90 rounded-2xl">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-green-50">
                      <th className="px-4 py-3 text-left font-bold text-gray-700 border-b border-gray-200">
                        {filterLevel === 'village' ? 'Gram Panchayat' : 
                         filterLevel === 'block' ? 'Block' : 'District'}
                      </th>
                      <th className="px-4 py-3 text-left font-bold text-gray-700 border-b border-gray-200">
                        Opening Balance
                      </th>
                      <th className="px-4 py-3 text-left font-bold text-gray-700 border-b border-gray-200">
                        Total Receipts
                      </th>
                      <th className="px-4 py-3 text-left font-bold text-gray-700 border-b border-gray-200">
                        Total Expenditure
                      </th>
                      <th className="px-4 py-3 text-left font-bold text-gray-700 border-b border-gray-200">
                        Closing Balance
                      </th>
                      <th className="px-4 py-3 text-left font-bold text-gray-700 border-b border-gray-200">
                        Last Updated
                      </th>
                      <th className="px-4 py-3 text-left font-bold text-gray-700 border-b border-gray-200">
                        Utilization Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {balanceSheetData.map((row, i) => {
                      const utilizationRate =
                        (row.expenditureNum / row.receiptsNum) * 100;
                      return (
                        <tr
                          key={i}
                          className="hover:bg-green-50/50 transition-colors duration-200 border-b border-gray-100"
                        >
                          <td className="px-4 py-3 font-medium">
                            {row.gp}
                          </td>
                          <td className="px-4 py-3 font-mono font-semibold">
                            {row.ob}
                          </td>
                          <td className="px-4 py-3 font-mono font-semibold text-green-600">
                            {row.receipts}
                          </td>
                          <td className="px-4 py-3 font-mono font-semibold text-red-600">
                            {row.expenditure}
                          </td>
                          <td className="px-4 py-3 font-mono font-bold text-blue-600">
                            {row.cb}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600">
                            {row.updated}
                          </td>
                          <td className="px-4 py-3">
                            <div className="space-y-2">
                              <Progress
                                value={utilizationRate}
                                className="h-3 bg-gray-200 rounded-full"
                              />
                              <span className="text-sm font-semibold text-slate-700">
                                {utilizationRate.toFixed(1)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BalanceSheetWithFilters;