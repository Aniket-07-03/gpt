
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Filter } from 'lucide-react';

import { usePDF } from 'react-to-pdf';
// Sample data structure for scheme data
const schemeData = [
  {
    district: "Ahilyanagar",
    zillaData: { rv: 0, pv: 55, cv: 0, jv: 1, receipts: 65368854, payments: 10356498 },
    blockData: { rv: 11, pv: 72, cv: 1, jv: 1, receipts: 48486433.91, payments: 6260304 },
    villageData: { rv: 350, pv: 4447, cv: 87, jv: 2, receipts: 1462909057.82, payments: 386899382.78 }
  },
  {
    district: "Akola",
    zillaData: { rv: 0, pv: 18, cv: 0, jv: 0, receipts: 1717828102, payments: 2442469.5 },
    blockData: { rv: 6, pv: 116, cv: 2, jv: 50, receipts: 86770062, payments: 23084584 },
    villageData: { rv: 326, pv: 2535, cv: 47, jv: 15, receipts: 841727285.49, payments: 208304804.6 }
  },
  {
    district: "Amravati",
    zillaData: { rv: 0, pv: 0, cv: 0, jv: 0, receipts: 0, payments: 0 },
    blockData: { rv: 0, pv: 7, cv: 0, jv: 1, receipts: 5285041, payments: 440792 },
    villageData: { rv: 142, pv: 2393, cv: 1, jv: 1, receipts: 601737004.15, payments: 197383376.8 }
  },
  {
    district: "Beed",
    zillaData: { rv: 0, pv: 0, cv: 0, jv: 0, receipts: 0, payments: 0 },
    blockData: { rv: 1, pv: 9, cv: 0, jv: 0, receipts: 8859159.76, payments: 1748788 },
    villageData: { rv: 290, pv: 2830, cv: 88, jv: 0, receipts: 1055423552.68, payments: 275354578.36 }
  },
  {
    district: "Bhandara",
    zillaData: { rv: 6, pv: 118, cv: 0, jv: 0, receipts: 234368878, payments: 43292412 },
    blockData: { rv: 1, pv: 55, cv: 0, jv: 20, receipts: 34792412, payments: 14861912 },
    villageData: { rv: 219, pv: 2032, cv: 2, jv: 6, receipts: 473021863.4, payments: 148409248.2 }
  },
  {
    district: "Buldhana",
    zillaData: { rv: 0, pv: 0, cv: 0, jv: 0, receipts: 0, payments: 0 },
    blockData: { rv: 0, pv: 7, cv: 0, jv: 1, receipts: 5786687, payments: 1310034 },
    villageData: { rv: 322, pv: 3130, cv: 147, jv: 15, receipts: 1180462516.83, payments: 315453488.6 }
  },
  {
    district: "Chandrapur",
    zillaData: { rv: 0, pv: 7, cv: 0, jv: 0, receipts: 374931443, payments: 1965672 },
    blockData: { rv: 1, pv: 7, cv: 0, jv: 1, receipts: 11550476, payments: 2579125 },
    villageData: { rv: 397, pv: 4252, cv: 24, jv: 1, receipts: 941823140.72, payments: 189191473.5 }
  },
  {
    district: "Chhatrapati Sambhajinagar",
    zillaData: { rv: 0, pv: 15, cv: 0, jv: 0, receipts: 66167373, payments: 7232006 },
    blockData: { rv: 0, pv: 8, cv: 0, jv: 0, receipts: 9993927.56, payments: 1054277 },
    villageData: { rv: 170, pv: 3596, cv: 10, jv: 13, receipts: 1165803140.51, payments: 273560542.19 }
  },
  {
    district: "Dharashiv",
    zillaData: { rv: 12, pv: 30, cv: 0, jv: 0, receipts: 629764474, payments: 10799821 },
    blockData: { rv: 0, pv: 10, cv: 0, jv: 10, receipts: 14803340.5, payments: 2321309 },
    villageData: { rv: 215, pv: 2391, cv: 15, jv: 2, receipts: 1096153014.31, payments: 213307975 }
  },
  {
    district: "Dhule",
    zillaData: { rv: 6, pv: 119, cv: 0, jv: 18, receipts: 158905438, payments: 47147308 },
    blockData: { rv: 1, pv: 77, cv: 0, jv: 43, receipts: 133902788.3, payments: 26139395 },
    villageData: { rv: 209, pv: 2299, cv: 6, jv: 8, receipts: 727744250.37, payments: 219714776.5 }
  },
  {
    district: "Gadchiroli",
    zillaData: { rv: 0, pv: 0, cv: 0, jv: 0, receipts: 0, payments: 0 },
    blockData: { rv: 1, pv: 9, cv: 0, jv: 0, receipts: 11363480.24, payments: 797942 },
    villageData: { rv: 205, pv: 1786, cv: 1, jv: 0, receipts: 307947079.92, payments: 74112971.25 }
  },
  {
    district: "Gondia",
    zillaData: { rv: 3, pv: 142, cv: 0, jv: 0, receipts: 1558499622, payments: 51622504 },
    blockData: { rv: 5, pv: 99, cv: 0, jv: 68, receipts: 92527676.4, payments: 16845228 },
    villageData: { rv: 329, pv: 3056, cv: 13, jv: 3, receipts: 570942199.69, payments: 135860284.08 }
  },
  {
    district: "Hingoli",
    zillaData: { rv: 0, pv: 13, cv: 0, jv: 0, receipts: 468491565, payments: 6840293 },
    blockData: { rv: 0, pv: 0, cv: 0, jv: 0, receipts: 0, payments: 0 },
    villageData: { rv: 401, pv: 1883, cv: 3, jv: 0, receipts: 589369968.26, payments: 172650184.4 }
  },
  {
    district: "Jalgaon",
    zillaData: { rv: 0, pv: 7, cv: 0, jv: 0, receipts: 211937690, payments: 1476584 },
    blockData: { rv: 0, pv: 9, cv: 0, jv: 0, receipts: 14685386.05, payments: 572779 },
    villageData: { rv: 820, pv: 6767, cv: 246, jv: 2, receipts: 1852128103.13, payments: 535330704.15 }
  },
  {
    district: "Jalna",
    zillaData: { rv: 0, pv: 0, cv: 0, jv: 0, receipts: 0, payments: 0 },
    blockData: { rv: 0, pv: 1, cv: 0, jv: 0, receipts: 10988892, payments: 2424 },
    villageData: { rv: 494, pv: 2979, cv: 150, jv: 0, receipts: 1346470396.8, payments: 214791871.81 }
  },
  {
    district: "Kolhapur",
    zillaData: { rv: 1, pv: 6, cv: 0, jv: 0, receipts: 131815110, payments: 3682014 },
    blockData: { rv: 0, pv: 9, cv: 0, jv: 0, receipts: 42781691, payments: 736942 },
    villageData: { rv: 439, pv: 5152, cv: 4, jv: 0, receipts: 1700655852.94, payments: 362760517.02 }
  },
  {
    district: "Latur",
    zillaData: { rv: 2, pv: 8, cv: 0, jv: 0, receipts: 40713431, payments: 4250712 },
    blockData: { rv: 0, pv: 1, cv: 0, jv: 0, receipts: 2212464, payments: 280284 },
    villageData: { rv: 284, pv: 3617, cv: 11, jv: 1, receipts: 1155268552.28, payments: 294120836.1 }
  },
  {
    district: "Nagpur",
    zillaData: { rv: 0, pv: 23, cv: 0, jv: 8, receipts: 144510844.07, payments: 10179399 },
    blockData: { rv: 4, pv: 29, cv: 0, jv: 17, receipts: 79158206.6, payments: 4219656 },
    villageData: { rv: 197, pv: 2635, cv: 0, jv: 6, receipts: 539484437.21, payments: 114728585.69 }
  },
  {
    district: "Nanded",
    zillaData: { rv: 0, pv: 28, cv: 0, jv: 0, receipts: 324104179, payments: 11924556 },
    blockData: { rv: 0, pv: 4, cv: 0, jv: 0, receipts: 7115879, payments: 691426 },
    villageData: { rv: 283, pv: 3588, cv: 47, jv: 1, receipts: 1593935882.06, payments: 335116997.6 }
  },
  {
    district: "Nandurbar",
    zillaData: { rv: 0, pv: 23, cv: 0, jv: 0, receipts: 98328932, payments: 7500543 },
    blockData: { rv: 1, pv: 47, cv: 15, jv: 0, receipts: 35123178.5, payments: 15561542 },
    villageData: { rv: 497, pv: 2059, cv: 139, jv: 0, receipts: 613517622.32, payments: 228699982.9 }
  },
  {
    district: "Nashik",
    zillaData: { rv: 0, pv: 0, cv: 0, jv: 0, receipts: 134350443, payments: 0 },
    blockData: { rv: 11, pv: 48, cv: 0, jv: 0, receipts: 51109080.98, payments: 4601275 },
    villageData: { rv: 438, pv: 5614, cv: 1, jv: 1, receipts: 1272276500.43, payments: 349876048.4 }
  },
  {
    district: "Palghar",
    zillaData: { rv: 3, pv: 145, cv: 0, jv: 1, receipts: 684899261.5, payments: 42383285 },
    blockData: { rv: 11, pv: 168, cv: 0, jv: 0, receipts: 178191177.8, payments: 34390975.4 },
    villageData: { rv: 149, pv: 2122, cv: 69, jv: 0, receipts: 981735373.24, payments: 225846722 }
  },
  {
    district: "Parbhani",
    zillaData: { rv: 0, pv: 5, cv: 0, jv: 0, receipts: 912387923, payments: 945718 },
    blockData: { rv: 0, pv: 12, cv: 0, jv: 0, receipts: 9645526.35, payments: 1382533 },
    villageData: { rv: 145, pv: 3187, cv: 13, jv: 0, receipts: 953249837.25, payments: 195282024.84 }
  },
  {
    district: "Pune",
    zillaData: { rv: 0, pv: 4, cv: 0, jv: 0, receipts: 125769527, payments: 824320 },
    blockData: { rv: 0, pv: 11, cv: 0, jv: 0, receipts: 14610266, payments: 2917538 },
    villageData: { rv: 542, pv: 6889, cv: 56, jv: 8, receipts: 2639060159.86, payments: 459008460.59 }
  },
  {
    district: "Raigad",
    zillaData: { rv: 0, pv: 3, cv: 0, jv: 0, receipts: 90453462, payments: 778020 },
    blockData: { rv: 5, pv: 48, cv: 1, jv: 6, receipts: 27279216.23, payments: 5788427 },
    villageData: { rv: 243, pv: 2491, cv: 5, jv: 1, receipts: 837888859.07, payments: 161840090.55 }
  },
  {
    district: "Ratnagiri",
    zillaData: { rv: 8, pv: 14, cv: 0, jv: 0, receipts: 80382844, payments: 3641119 },
    blockData: { rv: 1, pv: 48, cv: 0, jv: 0, receipts: 55094373.93, payments: 2926167 },
    villageData: { rv: 288, pv: 4077, cv: 15, jv: 0, receipts: 1219907803.81, payments: 193775386.4 }
  },
  {
    district: "Sangli",
    zillaData: { rv: 0, pv: 0, cv: 0, jv: 0, receipts: 0, payments: 0 },
    blockData: { rv: 0, pv: 5, cv: 0, jv: 0, receipts: 21684056, payments: 2178680 },
    villageData: { rv: 258, pv: 2412, cv: 8, jv: 7, receipts: 1123336824.7, payments: 234099775.93 }
  },
  {
    district: "Satara",
    zillaData: { rv: 1, pv: 2, cv: 0, jv: 0, receipts: 30621585.5, payments: 493412 },
    blockData: { rv: 3, pv: 32, cv: 0, jv: 0, receipts: 66701984.4, payments: 3257637 },
    villageData: { rv: 164, pv: 3978, cv: 1, jv: 0, receipts: 1438908233.02, payments: 293633183.38 }
  },
  {
    district: "Sindhudurg",
    zillaData: { rv: 0, pv: 8, cv: 0, jv: 0, receipts: 88688054, payments: 1032507 },
    blockData: { rv: 1, pv: 31, cv: 0, jv: 2, receipts: 32975454.27, payments: 2148278 },
    villageData: { rv: 177, pv: 2070, cv: 3, jv: 0, receipts: 722625048.55, payments: 86371838.87 }
  },
  {
    district: "Solapur",
    zillaData: { rv: 0, pv: 7, cv: 0, jv: 1, receipts: 86218758, payments: 2352517 },
    blockData: { rv: 1, pv: 23, cv: 0, jv: 3, receipts: 65757250.5, payments: 2914924 },
    villageData: { rv: 279, pv: 3758, cv: 13, jv: 0, receipts: 2387594408.4, payments: 350351996.28 }
  },
  {
    district: "Thane",
    zillaData: { rv: 3, pv: 13, cv: 0, jv: 0, receipts: 23625692.64, payments: 2785808 },
    blockData: { rv: 0, pv: 0, cv: 0, jv: 0, receipts: 0, payments: 0 },
    villageData: { rv: 189, pv: 1890, cv: 3, jv: 1, receipts: 517983800.54, payments: 156593498.73 }
  },
  {
    district: "Wardha",
    zillaData: { rv: 0, pv: 14, cv: 0, jv: 0, receipts: 603607887, payments: 2484541 },
    blockData: { rv: 1, pv: 5, cv: 0, jv: 0, receipts: 7127905, payments: 781338 },
    villageData: { rv: 89, pv: 1217, cv: 3, jv: 0, receipts: 238804439.6, payments: 58158999.47 }
  },
  {
    district: "Washim",
    zillaData: { rv: 32, pv: 214, cv: 0, jv: 46, receipts: 648103660, payments: 39571167 },
    blockData: { rv: 7, pv: 138, cv: 3, jv: 80, receipts: 99116014.2, payments: 20335071 },
    villageData: { rv: 242, pv: 3188, cv: 10, jv: 6, receipts: 681102575.86, payments: 149442465.29 }
  },
  {
    district: "Yavatmal",
    zillaData: { rv: 4, pv: 69, cv: 0, jv: 0, receipts: 133481535, payments: 27985757 },
    blockData: { rv: 3, pv: 92, cv: 0, jv: 0, receipts: 25068967.93, payments: 6839735 },
    villageData: { rv: 554, pv: 4751, cv: 65, jv: 0, receipts: 1103246425.74, payments: 315552393.1 }
  }
];

const schemes = [
  { category: "Other Resources", schemes: [
    { value: "2813", label: "Fourteen Finance Commission-FFC" },
    { value: "0", label: "Own Resources-OWN" }
  ]},
  { category: "Central Schemes", schemes: [
    { value: "126", label: "Calamity Relief Fund-CRF" },
    { value: "20", label: "Indira Awas Yojana-IAY" },
    { value: "71", label: "Integrated Child Development Services-ICDS" },
    { value: "25", label: "Integrated Watershed Development Programme-IWDP" },
    { value: "118", label: "Khelo India Erstwhile Rajiv Gandhi Khel Abhiyan-PYKKA" },
    { value: "34", label: "Member of Parliament Local Area Development Scheme-MPLADS" },
    { value: "3", label: "MG National Rural Employment Guarantee Act-MGNREGA" },
    { value: "70", label: "Mid Day Meal Scheme-MDMS" },
    { value: "115", label: "National Disability Pension Scheme-NDPS" },
    { value: "116", label: "National Family Benefit Scheme-NFBS" },
    { value: "113", label: "National Old Age Pension Scheme-NOAPS" },
    { value: "13", label: "National Rural Drinking Water Supply Programme-NRDWSP" },
    { value: "15", label: "National Rural Health Mission-NRHM" },
    { value: "2042", label: "National Rural Livelihood Mission-NRLM" },
    { value: "114", label: "National Widow Pension Scheme-NWPS" },
    { value: "3222", label: "Pradhan Mantri Adarsh Gram Yojana-PMAGYS" },
    { value: "18", label: "Pradhan Mantri Gram Sadak Yojana-PMGSY" },
    { value: "2706", label: "Prime Minister Gramin Awaas Yojana-PMGAY" },
    { value: "3302", label: "Rashtriya Gram Swaraj Abhiyan-RGSA" },
    { value: "486", label: "Revised Long Term Action Plan-RLTAP" },
    { value: "2899", label: "Sansad Adarsh Gram Yojana-SAGY" },
    { value: "24", label: "Swachh Bharat Mission-SBM" },
    { value: "3287", label: "XV Finance Commission-XVFC" }
  ]}
];

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

const SchemeDataList = () => {
  const [selectedScheme, setSelectedScheme] = useState<string>('all');
  const { toPDF, targetRef } = usePDF({filename: 'Scheme-wise Panchayat.pdf'});
  const filteredData = selectedScheme!=="3287" 
    ? schemeData.filter(item => item.district === selectedScheme)
    : schemeData;
    console.log(schemeData,selectedScheme,"filteredData")

  const exportToCSV = () => {
    const headers = [
      'Scheme Name', 'Category',
      'ZP RV', 'ZP PV', 'ZP CV', 'ZP JV', 'ZP Receipts', 'ZP Payments',
      'BP RV', 'BP PV', 'BP CV', 'BP JV', 'BP Receipts', 'BP Payments',
      'VP RV', 'VP PV', 'VP CV', 'VP JV', 'VP Receipts', 'VP Payments'
    ];
    
    const csvData = filteredData.map(item => [
      item.district,
      item.zillaData.rv,
      item.zillaData.pv,
      item.zillaData.cv,
      item.zillaData.jv,
      item.zillaData.receipts,
      item.zillaData.payments,
      item.blockData.rv,
      item.blockData.pv,
      item.blockData.cv,
      item.blockData.jv,
      item.blockData.receipts,
      item.blockData.payments,
      item.villageData.rv,
      item.villageData.pv,
      item.villageData.cv,
      item.villageData.jv,
      item.villageData.receipts,
      item.villageData.payments
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scheme-data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
            Scheme-wise Panchayat
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive data for Zilla Panchayat, Block Panchayat & Village Panchayat
          </p>
        </div>

        <Card  className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              Scheme Data Overview
            </CardTitle>
            <div className="flex gap-4">
              <Select value={selectedScheme} onValueChange={setSelectedScheme}>
                <SelectTrigger className="w-[300px] bg-white/90 border-2 border-gray-200 hover:border-blue-300 rounded-xl shadow-sm">
                  <SelectValue placeholder="Select Scheme" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-lg border-0 shadow-2xl rounded-xl max-h-80">
                  <SelectItem value="all">All Schemes</SelectItem>
                  {schemes.map((group) => (
                    <SelectGroup key={group.category}>
                      <SelectLabel className="font-semibold text-gray-700 px-2 py-1">
                        {group.category}
                      </SelectLabel>
                      {group.schemes.map((scheme) => (
                        <SelectItem 
                          key={scheme.value} 
                          value={scheme.value}
                          className="hover:bg-blue-50 rounded-lg ml-2"
                        >
                          {scheme.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={()=>toPDF()}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl gap-2"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          
          <CardContent ref={targetRef}>
            <div className="overflow-x-auto rounded-2xl shadow-lg">
              <Table className="bg-white/90">
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50">
                    <TableHead rowSpan={2} className="font-bold text-gray-700 border-r border-gray-200 align-middle text-center">
                      District Name
                    </TableHead>
                    {/* <TableHead rowSpan={2} className="font-bold text-gray-700 border-r border-gray-200 align-middle text-center">
                      Category
                    </TableHead> */}
                    <TableHead colSpan={6} className="font-bold text-gray-700 border-r border-gray-200 text-center bg-blue-100">
                      Zilla Panchayat
                    </TableHead>
                    <TableHead colSpan={6} className="font-bold text-gray-700 border-r border-gray-200 text-center bg-green-100">
                      Block Panchayat & Equivalent
                    </TableHead>
                    <TableHead colSpan={6} className="font-bold text-gray-700 text-center bg-purple-100">
                      Village Panchayat & Equivalent
                    </TableHead>
                  </TableRow>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50">
                    {/* Zilla Panchayat Headers */}
                    <TableHead className="font-semibold text-xs text-gray-600 bg-blue-50">RV</TableHead>
                    <TableHead className="font-semibold text-xs text-gray-600 bg-blue-50">PV</TableHead>
                    <TableHead className="font-semibold text-xs text-gray-600 bg-blue-50">CV</TableHead>
                    <TableHead className="font-semibold text-xs text-gray-600 bg-blue-50">JV</TableHead>
                    <TableHead className="font-semibold text-xs text-gray-600 bg-blue-50">Receipts (₹)</TableHead>
                    <TableHead className="font-semibold text-xs text-gray-600 bg-blue-50 border-r border-gray-200">Payments (₹)</TableHead>
                    
                    {/* Block Panchayat Headers */}
                    <TableHead className="font-semibold text-xs text-gray-600 bg-green-50">RV</TableHead>
                    <TableHead className="font-semibold text-xs text-gray-600 bg-green-50">PV</TableHead>
                    <TableHead className="font-semibold text-xs text-gray-600 bg-green-50">CV</TableHead>
                    <TableHead className="font-semibold text-xs text-gray-600 bg-green-50">JV</TableHead>
                    <TableHead className="font-semibold text-xs text-gray-600 bg-green-50">Receipts (₹)</TableHead>
                    <TableHead className="font-semibold text-xs text-gray-600 bg-green-50 border-r border-gray-200">Payments (₹)</TableHead>
                    
                    {/* Village Panchayat Headers */}
                    <TableHead className="font-semibold text-xs text-gray-600 bg-purple-50">RV</TableHead>
                    <TableHead className="font-semibold text-xs text-gray-600 bg-purple-50">PV</TableHead>
                    <TableHead className="font-semibold text-xs text-gray-600 bg-purple-50">CV</TableHead>
                    <TableHead className="font-semibold text-xs text-gray-600 bg-purple-50">JV</TableHead>
                    <TableHead className="font-semibold text-xs text-gray-600 bg-purple-50">Receipts (₹)</TableHead>
                    <TableHead className="font-semibold text-xs text-gray-600 bg-purple-50">Payments (₹)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item, index) => (
                    <TableRow key={index} className="hover:bg-blue-50/50 transition-colors duration-200">
                      <TableCell className="font-medium max-w-xs">
                        <div>
                          <div className="font-semibold text-sm text-gray-800">{item.district}</div>
                        </div>
                      </TableCell>
                      {/* <TableCell>
                        <Badge className={item.category === 'Central Schemes' 
                          ? 'bg-blue-100 text-blue-800 border-blue-200' 
                          : 'bg-green-100 text-green-800 border-green-200'
                        }>
                          {item.category}
                        </Badge>
                      </TableCell> */}
                      
                      {/* Zilla Panchayat Data */}
                      <TableCell className="font-mono text-sm bg-blue-50/30">{item.zillaData.rv.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-sm bg-blue-50/30">{item.zillaData.pv.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-sm bg-blue-50/30">{item.zillaData.cv.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-sm bg-blue-50/30">{item.zillaData.jv.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-sm font-semibold text-green-600 bg-blue-50/30">{formatCurrency(item.zillaData.receipts)}</TableCell>
                      <TableCell className="font-mono text-sm font-semibold text-red-600 bg-blue-50/30 border-r border-gray-200">{formatCurrency(item.zillaData.payments)}</TableCell>
                      
                      {/* Block Panchayat Data */}
                      <TableCell className="font-mono text-sm bg-green-50/30">{item.blockData.rv.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-sm bg-green-50/30">{item.blockData.pv.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-sm bg-green-50/30">{item.blockData.cv.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-sm bg-green-50/30">{item.blockData.jv.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-sm font-semibold text-green-600 bg-green-50/30">{formatCurrency(item.blockData.receipts)}</TableCell>
                      <TableCell className="font-mono text-sm font-semibold text-red-600 bg-green-50/30 border-r border-gray-200">{formatCurrency(item.blockData.payments)}</TableCell>
                      
                      {/* Village Panchayat Data */}
                      <TableCell className="font-mono text-sm bg-purple-50/30">{item.villageData.rv.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-sm bg-purple-50/30">{item.villageData.pv.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-sm bg-purple-50/30">{item.villageData.cv.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-sm bg-purple-50/30">{item.villageData.jv.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-sm font-semibold text-green-600 bg-purple-50/30">{formatCurrency(item.villageData.receipts)}</TableCell>
                      <TableCell className="font-mono text-sm font-semibold text-red-600 bg-purple-50/30">{formatCurrency(item.villageData.payments)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No data available for the selected scheme.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
};

export default SchemeDataList;
