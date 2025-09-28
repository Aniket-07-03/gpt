import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, X, Check, Upload } from 'lucide-react';
import { summaryData } from '@/lib/districtData';

// Mock data for demonstration


const districts = [
  { label: "All Districts", value: "" },
  { label: "Pune", value: "Pune" },
  { label: "Mumbai", value: "Mumbai" },
  { label: "Nashik", value: "Nashik" },
  { label: "Aurangabad", value: "Aurangabad" }
];

const blocks = {
  pune: [
    { label: "All Blocks", value: "" },
    { label: "Haveli", value: "Haveli" },
    { label: "Maval", value: "Maval" },
    { label: "Mulshi", value: "Mulshi" }
  ],
  mumbai: [
    { label: "All Blocks", value: "" },
    { label: "Andheri", value: "Andheri" },
    { label: "Borivali", value: "Borivali" }
  ],
  nashik: [
    { label: "All Blocks", value: "" },
    { label: "Igatpuri", value: "Igatpuri" },
    { label: "Sinnar", value: "Sinnar" }
  ],
  aurangabad: [
    { label: "All Blocks", value: "" },
    { label: "Sillod", value: "Sillod" },
    { label: "Khultabad", value: "Khultabad" }
  ]
};

const villages = {
  haveli: [
    { label: "All Villages", value: "" },
    { label: "Jejuri", value: "Jejuri" },
    { label: "Saswad", value: "Saswad" }
  ],
  maval: [
    { label: "All Villages", value: "" },
    { label: "Lonavala", value: "Lonavala" },
    { label: "Khandala", value: "Khandala" }
  ],
  andheri: [
    { label: "All Villages", value: "" },
    { label: "Versova", value: "Versova" },
    { label: "Juhu", value: "Juhu" }
  ],
  igatpuri: [
    { label: "All Villages", value: "" },
    { label: "Ghoti", value: "Ghoti" },
    { label: "Nashik", value: "Nashik" }
  ],
  sillod: [
    { label: "All Villages", value: "" },
    { label: "Pachod", value: "Pachod" },
    { label: "Soygaon", value: "Soygaon" }
  ]
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Button = ({ children, onClick, className = "", ...props }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${className}`}>
    {children}
  </span>
);

const Progress = ({ value, className = "" }) => (
  <div className={`w-full bg-gray-200 rounded-full ${className}`}>
    <div
      className="bg-blue-600 h-full rounded-full transition-all duration-300"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

const Table = ({ children, className = "" }) => (
  <table className={`w-full ${className}`}>{children}</table>
);

const TableHeader = ({ children }) => <thead>{children}</thead>;
const TableBody = ({ children }) => <tbody>{children}</tbody>;
const TableRow = ({ children, className = "" }) => (
  <tr className={className}>{children}</tr>
);
const TableHead = ({ children, className = "" }) => (
  <th className={`px-4 py-3 text-left ${className}`}>{children}</th>
);
const TableCell = ({ children, className = "" }) => (
  <td className={`px-4 py-3 ${className}`}>{children}</td>
);

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

// Filter Button Component
const FilterButton = ({ label, value, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl border-2 transition-all duration-200 font-medium ${
      isActive
        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg'
        : 'bg-white/90 border-gray-200 hover:border-blue-300 text-gray-700 hover:bg-blue-50'
    }`}
  >
    <Filter className="h-4 w-4 inline mr-2" />
    {label}: {value || 'All'}
  </button>
);

const FundUtilizationSummary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    zp: '',
    block: '',
    gp: '',
    scheme: '',
    fundType: '',
    year: ''
  });
  const [activeModal, setActiveModal] = useState(null);

  const getUtilizationColor = (utilized) => {
    if (utilized >= 80) return 'text-green-600';
    if (utilized >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getUtilizationBadge = (utilized) => {
    if (utilized >= 80) {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
          Excellent
        </Badge>
      );
    }
    if (utilized >= 60) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
          Good
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
        Poor
      </Badge>
    );
  };

  const unique = (data, field) => {
    return [...new Set(data.map(item => item[field]))].filter(Boolean);
  };

  const filteredData = useMemo(() => {
    return summaryData.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.zp.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.block.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.gp.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilters = 
        (filters.zp === '' || item.zp === filters.zp) &&
        (filters.block === '' || item.block === filters.block) &&
        (filters.gp === '' || item.gp === filters.gp) &&
        (filters.scheme === '' || item.scheme === filters.scheme) &&
        (filters.fundType === '' || item.fundType === filters.fundType);

      return matchesSearch && matchesFilters;
    });
  }, [searchQuery, filters]);

  const handleFilterSelect = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
      // Reset dependent filters
      ...(filterType === 'zp' && { block: '', gp: '' }),
      ...(filterType === 'block' && { gp: '' })
    }));
    setActiveModal(null);
  };

  const exportToCSV = () => {
    // CSV export logic would go here
    console.log('Exporting to CSV...');
  };

  const renderFilterModal = () => {
    const modalContent = {
      district: {
        title: 'Select District',
        options: districts,
        onSelect: (value) => handleFilterSelect('zp', value)
      },
      block: {
        title: 'Select Block',
        options: blocks[filters.zp?.toLowerCase()] || [],
        onSelect: (value) => handleFilterSelect('block', value)
      },
      village: {
        title: 'Select Village',
        options: villages[filters.block?.toLowerCase()] || [],
        onSelect: (value) => handleFilterSelect('gp', value)
      },
      scheme: {
        title: 'Select Scheme',
        options: unique(summaryData, 'scheme').map(s => ({ label: s, value: s })),
        onSelect: (value) => handleFilterSelect('scheme', value)
      },
      fundType: {
        title: 'Select Fund Type',
        options: unique(summaryData, 'fundType').map(f => ({ label: f, value: f })),
        onSelect: (value) => handleFilterSelect('fundType', value)
      }
    };

    const current = modalContent[activeModal];
    if (!current) return null;

    return (
      <Modal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        title={current.title}
      >
        <div className="space-y-2">
          <button
            onClick={() => current.onSelect('')}
            className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center justify-between"
          >
            <span>All</span>
            {filters[activeModal === 'district' ? 'zp' : activeModal === 'village' ? 'gp' : activeModal] === '' && (
              <Check className="h-4 w-4 text-green-600" />
            )}
          </button>
          {current.options.filter(opt => opt.value).map((option) => (
            <button
              key={option.value}
              onClick={() => current.onSelect(option.value)}
              className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center justify-between"
            >
              <span>{option.label}</span>
              {filters[activeModal === 'district' ? 'zp' : activeModal === 'village' ? 'gp' : activeModal] === option.value && (
                <Check className="h-4 w-4 text-green-600" />
              )}
            </button>
          ))}
        </div>
      </Modal>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Card className="relative bg-white/80 backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-400/5"></div>
        
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative">
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            Fund Utilization Summary
          </CardTitle>
          <Button
            onClick={exportToCSV}
            className="bg-gradient-to-r flex justify-center items-center from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl gap-2"
          >
            <Upload className="h-4 w-4" />
            <div>Export CSV</div>
          </Button>
        </CardHeader>

        <CardContent className="relative">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by district, block, or village..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-1 w-full bg-white/90 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-400 rounded-xl shadow-sm transition-all duration-200 text-md"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <FilterButton
              label="District"
              value={filters.zp}
              onClick={() => setActiveModal('district')}
              isActive={filters.zp}
            />
            <FilterButton
              label="Block"
              value={filters.block}
              onClick={() => setActiveModal('block')}
              isActive={filters.block}
            />
            <FilterButton
              label="Village"
              value={filters.gp}
              onClick={() => setActiveModal('village')}
              isActive={filters.gp}
            />
            <FilterButton
              label="Fund Type"
              value={filters.fundType}
              onClick={() => setActiveModal('fundType')}
              isActive={filters.fundType}
            />
            
            {/* Clear Filters Button */}
            {(filters.zp || filters.block || filters.gp || filters.scheme || filters.fundType) && (
              <Button
                onClick={() => setFilters({ zp: '', block: '', gp: '', scheme: '', fundType: '', year: '' })}
                className="px-4 py-2 bg-red-100 text-red-700 border-2 border-red-200 hover:bg-red-200 rounded-xl transition-all duration-200"
              >
                <X className="h-4 w-4 inline mr-2" />
                Clear All
              </Button>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-gray-600 text-sm">
              Showing {filteredData.length} of {summaryData.length} records
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl shadow-lg">
            <Table className="bg-white/90">
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50 hover:bg-gradient-to-r hover:from-gray-100 hover:to-blue-100">
                  <TableHead className="font-bold text-gray-700">ZP Name</TableHead>
                  <TableHead className="font-bold text-gray-700">Block Name</TableHead>
                  <TableHead className="font-bold text-gray-700">Gram Panchayat</TableHead>
                  <TableHead className="font-bold text-gray-700">Fund Type</TableHead>
                  <TableHead className="font-bold text-gray-700">Received Amount</TableHead>
                  <TableHead className="font-bold text-gray-700">Spent Amount</TableHead>
                  <TableHead className="font-bold text-gray-700">Unspent Amount</TableHead>
                  <TableHead className="font-bold text-gray-700">Utilization</TableHead>
                  <TableHead className="font-bold text-gray-700">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row, i) => (
                  <TableRow
                    key={i}
                    className="hover:bg-blue-50/50 transition-colors duration-200"
                  >
                    <TableCell className="font-medium">{row.zp}</TableCell>
                    <TableCell>{row.block}</TableCell>
                    <TableCell>{row.gp}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          row.fundType === "Tied"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
                            : "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200"
                        }
                      >
                        {row.fundType}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono font-semibold">{row.received}</TableCell>
                    <TableCell className="font-mono font-semibold text-green-600">{row.spent}</TableCell>
                    <TableCell className="font-mono font-semibold text-orange-600">{row.unspent}</TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className={`font-bold text-lg ${getUtilizationColor(row.utilized)}`}>
                          {row.utilized}%
                        </div>
                        <Progress value={row.utilized} className="h-3 bg-gray-200 rounded-full overflow-hidden" />
                      </div>
                    </TableCell>
                    <TableCell>{getUtilizationBadge(row.utilized)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* No Results Message */}
          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No records found</div>
              <p className="text-gray-500 text-sm">
                Try adjusting your search query or filters
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filter Modal */}
      {renderFilterModal()}
    </div>
  );
};

export default FundUtilizationSummary;